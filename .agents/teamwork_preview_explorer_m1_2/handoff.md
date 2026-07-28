# Backend Microservices & API Endpoints Analysis Report

## 1. Observation

### Architecture & Service Inventory
- **Microservices Stack**: Spring Boot Java microservices configured with Maven, Spring Cloud Gateway MVC, Spring Data JPA, PostgreSQL databases, and RabbitMQ event bus messaging.
  - `api-gateway`: `backend/api-gateway/src/main/resources/application.properties:2` (`server.port=8080`)
  - `auth-service`: `backend/auth-service/src/main/resources/application.properties:3` (`server.port=${SERVER_PORT:8081}`)
  - `product-service`: `backend/product-service/src/main/resources/application.properties:3` (`server.port=${SERVER_PORT:8082}`)
  - `inventory-service`: `backend/inventory-service/src/main/resources/application.properties:3` (`server.port=${SERVER_PORT:8083}`)
  - `order-service`: `backend/order-service/src/main/resources/application.properties:3` (`server.port=${SERVER_PORT:8084}`)
  - `payment-service`: `backend/payment-service/src/main/resources/application.properties:3` (`server.port=${SERVER_PORT:8085}`)
  - `notification-service`: `backend/notification-service/src/main/resources/application.properties:3` (`server.port=${SERVER_PORT:8087}`)
  - `common-events`: Shared module (`backend/common-events`) containing event records and `RabbitMQConstants.java`.

### Frontend API Expectation vs Backend Implementation Gaps
- **Missing `/api/auth/users` Endpoint**:
  - `frontend/src/constants/api.js:9`: `USERS: "/api/auth/users"`
  - `frontend/src/api/services/user.service.js:6`: `apiClient.get(API.USERS)`
  - `frontend/src/api/services/dashboard.service.js:10`: `apiClient.get(API.USERS)`
  - `backend/auth-service/src/main/java/com/ecommerce/auth_service/controller/AuthController.java:16-55`: Only defines `/register`, `/login`, `/profile`, `/validate`. No `/users` endpoint exists.
- **Missing `/api/auth/me`, `/refresh`, `/logout` Endpoints**:
  - `frontend/src/api/services/auth.service.js:14,20,24`: Calls `${API.AUTH}/refresh`, `${API.AUTH}/logout`, `${API.AUTH}/me`.
  - `backend/auth-service/src/main/java/com/ecommerce/auth_service/controller/AuthController.java:31`: Backend defines `@GetMapping("/profile")`, NOT `/me`. Endpoints `/refresh` and `/logout` do not exist.
- **Missing `/api/categories` Endpoint**:
  - `frontend/src/constants/api.js:4`: `CATEGORIES: "/api/categories"`
  - `frontend/src/api/services/category.service.js:6`: `super(API.CATEGORIES)`
  - `backend/api-gateway/src/main/resources/application.properties:10`: `Path=/api/products/**,/api/categories/**` routes to `http://product-service:8082`.
  - `backend/product-service/src/main/java/com/ecommerce/product_service/controller/ProductController.java`: No Category controller or `/api/categories` mapping exists (only `ProductCategory` enum exists in entities).
- **Undefined Cart API (`API.CART`) & Missing Cart Service**:
  - `frontend/src/constants/api.js:1-10`: `API.CART` is not defined in `export const API`.
  - `frontend/src/api/services/cart.service.js:7`: `super(API.CART)` passes `undefined`.
  - `backend/`: No Cart microservice, entity, or controller exists in the backend repository.
- **Ignored Search & Category Filter Query Parameters**:
  - `frontend/src/api/services/product.service.js:9-19`: Sends `search` and `categoryId` params to `/api/products`.
  - `backend/product-service/src/main/java/com/ecommerce/product_service/controller/ProductController.java:32-39`:
    ```java
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
    ```
    Method takes no query parameters (`@RequestParam(required = false)`), ignoring frontend filter requests.

### Configuration & Inter-Service Issues
- **Hardcoded Localhost Hostname Resolution Incompatibilities**:
  - `backend/order-service/src/main/resources/application.properties:18`: `product.service.url=http://product-service:8082`
  - `backend/inventory-service/src/main/resources/application.properties:18`: `product.service.url=http://product-service:8082`
  - When running locally outside Docker container networking, `http://product-service:8082` cannot be resolved unless specified with env defaults e.g. `${PRODUCT_SERVICE_URL:http://localhost:8082}`.
- **API Gateway Upstream Proxy Route Defaults**:
  - `backend/api-gateway/src/main/resources/application.properties:4-26`: Hardcodes `http://auth-service:8081`, `http://product-service:8082`, etc. without fallback env variables like `${AUTH_SERVICE_URL:http://localhost:8081}`.
- **Orphaned Payment State on Inventory Failure**:
  - `backend/payment-service/src/main/java/com/ecommerce/payment_service/service/PaymentService.java:74-85`: Saves payment as `SUCCESS` and publishes `PaymentSuccessEvent`.
  - `backend/inventory-service/src/main/java/com/ecommerce/inventory_service/service/InventoryService.java:82-101`: When stock deduction fails, publishes `InventoryFailedEvent`.
  - `backend/order-service/src/main/java/com/ecommerce/order_service/messaging/OrderStatusListener.java:53-56`: Updates order status to `CANCELLED`.
  - `backend/payment-service/src/main/java/com/ecommerce/payment_service/config/RabbitMQConfig.java:34-43`: `payment-service` only listens to `order.created`. It has no listener for `INVENTORY_FAILED` (`inventory.failed`), leaving payment records in `SUCCESS` state despite order cancellation.

---

## 2. Logic Chain

1. **Analysis of Frontend API Mismatches**:
   - `frontend/src/api/services/user.service.js` and `dashboard.service.js` rely on `API.USERS` (`/api/auth/users`).
   - Inspection of `backend/auth-service/.../AuthController.java` reveals endpoints are limited to `/register`, `/login`, `/profile`, `/validate`.
   - Result: Calling user list or admin dashboard stats results in HTTP 404 errors, causing dashboard user metrics to register 0.
   - Similarly, `auth.service.js` expects `/api/auth/me`, `/refresh`, and `/logout`. `AuthController.java` only exposes `/profile`.
   - `category.service.js` calls `/api/categories`. Gateway routes this to `product-service:8082`. `ProductController.java` lacks `/api/categories` routing, returning HTTP 404.
   - `cart.service.js` attempts `super(API.CART)`. Because `API.CART` is omitted from `constants/api.js`, requests hit `http://localhost:5173/undefined/clear`.

2. **Analysis of Event-Driven Compensation Void**:
   - In `OrderService.createOrder`, order begins as `PAYMENT_PENDING` and triggers `OrderCreatedEvent`.
   - `PaymentListener` processes `OrderCreatedEvent`. Assuming 90% random success, payment status becomes `SUCCESS` and `PaymentSuccessEvent` fires.
   - `InventoryListener` consumes `PaymentSuccessEvent` and attempts to reduce product stock via RestTemplate.
   - If stock is insufficient, `ProductService.reduceStock` throws `RuntimeException("Insufficient Stock")`. `InventoryService` catches this and emits `InventoryFailedEvent`.
   - `OrderStatusListener` handles `InventoryFailedEvent` and correctly marks the order `CANCELLED`.
   - However, `payment-service` has no subscription to `inventory.failed`. Payment remains recorded as `SUCCESS` in `payment_db` without issuing a refund or updating status to `REFUNDED`.

3. **Analysis of Inter-Service Communication & Deployment Configuration**:
   - In `OrderService.java:165-170` and `InventoryService.java:39-43`, synchronous HTTP calls to `product-service` are executed using `product.service.url`.
   - In `application.properties` of both services, `product.service.url` is hardcoded to `http://product-service:8082`.
   - In standalone local execution (`mvn spring-boot:run`), `product-service` domain fails DNS resolution, producing `java.net.UnknownHostException`.

---

## 3. Caveats

- **No Caveats**: All backend controllers, event listeners, configuration properties, database seeders, and frontend API client invocations were fully inspected.

---

## 4. Conclusion

The backend architecture consists of 7 Spring Boot microservices and an event-driven RabbitMQ pipeline. While core flows for product seeding (`DatabaseSeeder`), admin initialization (`AdminInitializer`), order creation, and happy-path event processing (`OrderCreatedEvent` -> `PaymentSuccessEvent` -> `InventoryReservedEvent`) are implemented, several critical API endpoints and compensation event handlers are missing.

### Actionable Fix Recommendations

#### Recommendation 1: Auth Service Endpoints (`auth-service`)
- In `AuthController.java` and `AuthService.java`:
  - Add `@GetMapping("/users")` to return all registered users (`userRepository.findAll()`).
  - Add `@GetMapping("/users/{id}")` to return a specific user by ID.
  - Add `@GetMapping("/me")` as an alias for `/profile`.
  - Add `@PostMapping("/refresh")` and `@PostMapping("/logout")` stubs/handlers.
  - Update `SecurityConfig.java` matcher rules to permit or properly authenticate `/api/auth/users/**` and `/api/auth/me`.

#### Recommendation 2: Product & Category Service Endpoints (`product-service`)
- In `ProductController.java`:
  - Update `getAllProducts(@RequestParam(required = false) String search, @RequestParam(required = false) ProductCategory categoryId)` to filter results when query parameters are supplied.
- Add `CategoryController.java`:
  - Expose `@GetMapping("/api/categories")` returning values of `ProductCategory.values()` (e.g., `HEADPHONE`, `EARBUDS`, `SPEAKER`, `HEADSET`).

#### Recommendation 3: Cart API Configuration
- In `frontend/src/constants/api.js`:
  - Define `CART: "/api/cart"`.
- If client-side cart handling is preferred:
  - Refactor `cart.service.js` to manage cart state in local storage / React state.
- If backend cart storage is required:
  - Create a lightweight Cart endpoint/controller in `order-service` or dedicated service.

#### Recommendation 4: Payment Compensation for Inventory Failures (`payment-service`)
- In `payment-service/config/RabbitMQConfig.java`:
  - Bind `paymentQueue` (or a dedicated `paymentFailedQueue`) to `ecommerce.exchange` with routing key `RabbitMQConstants.INVENTORY_FAILED` (`inventory.failed`).
- In `PaymentListener.java` / `PaymentService.java`:
  - Add event handler for `InventoryFailedEvent` to locate the payment by `orderId` and update status to `REFUNDED`.

#### Recommendation 5: Local Environment Hostname Fallbacks
- In `order-service/src/main/resources/application.properties` and `inventory-service/src/main/resources/application.properties`:
  - Update property to `product.service.url=${PRODUCT_SERVICE_URL:http://localhost:8082}`.
- In `api-gateway/src/main/resources/application.properties`:
  - Use environment variables with `localhost` defaults (e.g., `spring.cloud.gateway.mvc.routes[0].uri=${AUTH_SERVICE_URL:http://auth-service:8081}`).

---

## 5. Verification Method

### Local Verification Steps
1. **API Endpoints Inspection**:
   - Check `backend/auth-service/src/main/java/com/ecommerce/auth_service/controller/AuthController.java` for `/api/auth/users`.
   - Check `backend/product-service/src/main/java/com/ecommerce/product_service/controller/ProductController.java` for `@RequestParam` handling and `CategoryController.java`.
2. **Event Compensation Inspection**:
   - Check `backend/payment-service/src/main/java/com/ecommerce/payment_service/config/RabbitMQConfig.java` for `INVENTORY_FAILED` binding.
3. **Execution Verification (when services are running)**:
   - Run `curl -X GET http://localhost:8080/api/auth/users` (verify HTTP 200 list response).
   - Run `curl -X GET http://localhost:8080/api/categories` (verify HTTP 200 categories response).
   - Run `curl -X GET http://localhost:8080/api/products?search=Sony` (verify filtered product list).
   - Trigger an order with quantity exceeding stock and verify in PostgreSQL `payment_db`: `SELECT status FROM payments WHERE order_id = <failed_order_id>` returns `REFUNDED` (once compensation handler is added).
