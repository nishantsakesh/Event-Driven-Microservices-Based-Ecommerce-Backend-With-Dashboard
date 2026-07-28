# Handoff Report — Milestone 2 Backend Review

## 1. Observation

### Build Verification Results
- `backend/common-events`: Executed `mvn clean install -DskipTests` in `c:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/backend/common-events`. Output: `BUILD SUCCESS` (Compiling 13 source files to target/classes, installed `common-events-0.0.1-SNAPSHOT.jar` to local `.m2` repository).
- `backend/auth-service`: Executed `mvn clean compile` in `c:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/backend/auth-service`. Output: `BUILD SUCCESS` (Compiling 18 source files).
- `backend/product-service`: Executed `mvn clean compile` in `c:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/backend/product-service`. Output: `BUILD SUCCESS` (Compiling 13 source files).
- `backend/payment-service`: Executed `mvn clean compile` in `c:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/backend/payment-service`. Output: `BUILD SUCCESS` (Compiling 13 source files).

### Code Observations

#### Auth Service (`backend/auth-service`)
1. **`SecurityConfig.java` (lines 31-40)**:
   ```java
   .requestMatchers(
           "/api/auth/register",
           "/api/auth/login",
           "/api/auth/validate",
           "/api/auth/refresh",
           "/api/auth/logout",
           "/api/auth/users",
           "/api/auth/users/**",
           "/api/auth/me"
   ).permitAll()
   ```
2. **`AuthController.java` (lines 45-53)**:
   ```java
   @GetMapping("/users")
   public List<User> getAllUsers() {
       return authService.getAllUsers();
   }

   @GetMapping("/users/{id}")
   public User getUserById(@PathVariable Long id) {
       return authService.getUserById(id);
   }
   ```
3. **`User.java` (lines 8-32)**:
   ```java
   public class User {
       private Long id;
       private String name;
       private String email;
       private String password;
       private Role role;
       private LocalDateTime createdAt;
   }
   ```
   The `password` field in `User.java` has no `@JsonIgnore` or DTO mapping, exposing BCrypt hashed passwords in JSON serialization.
4. **`AuthController.java` (lines 40-43)**:
   ```java
   @GetMapping("/me")
   public ProfileResponse me(Principal principal) {
       return profile(principal);
   }
   ```
   If unauthenticated calls hit `/api/auth/me`, `principal` is `null`, leading to `principal.getName()` throwing `NullPointerException` (500 Server Error) because `/api/auth/me` is configured as `.permitAll()`.
5. **`AuthService.java` (lines 94-100)**:
   ```java
   public Map<String, String> refreshToken() {
       return Map.of("message", "Token refreshed successfully");
   }

   public Map<String, String> logout() {
       return Map.of("message", "Logged out successfully");
   }
   ```
   Facade implementation returning static success messages without implementing token refresh or logout handling.

#### Product Service (`backend/product-service`)
1. **`ProductService.java` (lines 52-74)**:
   - `getAllProducts(search, category)` implements stream filtering.
   - Null-safety checks:
     - `search == null || search.trim().isEmpty()` handled safely.
     - `product.getName()` and `product.getDescription()` null-checks present before calling `.toLowerCase()`.
     - `category == null || category.trim().isEmpty()` handled safely.
     - `product.getCategory()` null-check present (`if (product.getCategory() == null) return false;`).
2. **`CategoryController.java` (lines 17-24)**:
   - `getCategories()` uses `Arrays.stream(ProductCategory.values()).map(Enum::name).collect(Collectors.toList())` to return enum names as a `List<String>`.

#### Payment Service (`backend/payment-service`)
1. **`RabbitMQConfig.java` (lines 46-55)**:
   - `inventoryFailedBinding` correctly binds `paymentQueue` (`payment.queue`) to `exchange` (`ecommerce.exchange`) with routing key `RabbitMQConstants.INVENTORY_FAILED` (`inventory.failed`).
2. **`PaymentListener.java` (lines 31-41)**:
   - `@RabbitHandler` method `consumeInventoryFailedEvent(InventoryFailedEvent event)` is wired to handle `InventoryFailedEvent`.
3. **`PaymentService.java` (lines 133-149)**:
   - `handleInventoryFailed(InventoryFailedEvent event)` fetches `Payment` via `paymentRepository.findByOrderId(event.getOrderId())`.
   - If found, sets status to `com.ecommerce.payment_service.entity.PaymentStatus.REFUNDED`, sets `updatedAt`, and saves to database.

---

## 2. Logic Chain

1. **Build Verification**:
   - Compiling `common-events` first ensures shared event DTOs and constants are installed in the local Maven cache (`~/.m2`).
   - Subsequent compilation of `auth-service`, `product-service`, and `payment-service` succeeded without any missing symbols or syntax errors.

2. **Security & Correctness Assessment**:
   - `SecurityConfig` permits `/api/auth/users` and `/api/auth/users/**` without authentication. `getAllUsers()` returns `List<User>` where `User` entity includes `password`. Therefore, any unauthenticated client can retrieve sensitive password hashes for all registered users. This is a critical security vulnerability and data leakage issue.
   - `SecurityConfig` permits `/api/auth/me` without authentication. But `me(Principal principal)` expects a non-null `Principal`. Unauthenticated requests cause `principal.getName()` to throw `NullPointerException`, resulting in HTTP 500 instead of HTTP 401. `/api/auth/me` should be restricted to authenticated requests (`anyRequest().authenticated()`).
   - `refreshToken()` and `logout()` are mock/facade methods that do not provide real JWT refresh or revocation capabilities.

3. **Product Service Stream Filtering & Category Enum Listing**:
   - Stream filtering correctly accounts for `null` parameters, null product properties, and case-insensitivity.
   - `CategoryController` cleanly exposes `ProductCategory` enum values without hardcoding.

4. **Payment Service RabbitMQ & Event Handling**:
   - `inventoryFailedBinding` correctly wires `inventory.failed` routing key to `payment.queue`.
   - `PaymentListener` correctly consumes `InventoryFailedEvent`.
   - `PaymentService.handleInventoryFailed` updates payment status to `REFUNDED` and persists changes.

---

## 3. Caveats

- **Runtime Integration**: Verification was conducted via static analysis and Maven compilation (`mvn clean install` / `mvn clean compile`). Live RabbitMQ message broker delivery and running database instances were not tested in runtime container environments.
- **Test Execution**: Unit tests were skipped during `common-events` build as instructed (`-DskipTests`).

---

## 4. Conclusion

### Review Summary
**Verdict**: **REQUEST_CHANGES**

### Findings

#### [Critical] Finding 1: Unauthenticated Data Exposure of Passwords & User Records
- **Where**: `backend/auth-service/src/main/java/com/ecommerce/auth_service/config/SecurityConfig.java:37-38`, `AuthController.java:45-53`, `User.java:26`
- **Why**: `/api/auth/users` and `/api/auth/users/**` are configured as `permitAll()`. `getAllUsers()` and `getUserById()` expose raw `User` JPA entities containing the `password` hash field. Unauthenticated users can harvest user data and password hashes.
- **Suggestion**: Remove `/api/auth/users` and `/api/auth/users/**` from `permitAll()` (or restrict to ADMIN role), add `@JsonIgnore` to `User.java` `password` field, and return `ProfileResponse` or `UserDto` instead of raw JPA entities.

#### [Major] Finding 2: `NullPointerException` on Unauthenticated `/api/auth/me` Endpoint
- **Where**: `backend/auth-service/src/main/java/com/ecommerce/auth_service/config/SecurityConfig.java:39`, `AuthController.java:41-43`
- **Why**: `/api/auth/me` is listed in `requestMatchers(...).permitAll()`. When called without a token, `principal` is `null`, causing `principal.getName()` to throw `NullPointerException` (HTTP 500 error).
- **Suggestion**: Remove `/api/auth/me` from `permitAll()` list in `SecurityConfig.java` so Spring Security enforces authentication and returns HTTP 401 when unauthenticated.

#### [Minor] Finding 3: Facade Implementation for Token Refresh and Logout
- **Where**: `backend/auth-service/src/main/java/com/ecommerce/auth_service/service/AuthService.java:94-100`
- **Why**: `refreshToken()` and `logout()` return static success maps without executing token validation, issuing new tokens, or handling token invalidation.
- **Suggestion**: Implement real JWT refresh token mechanism and token blacklist/logout handling.

### Verified Claims

- `common-events` compilation & installation → verified via `mvn clean install -DskipTests` → PASS
- `auth-service` compilation → verified via `mvn clean compile` → PASS
- `product-service` compilation → verified via `mvn clean compile` → PASS
- `payment-service` compilation → verified via `mvn clean compile` → PASS
- Product search stream filtering null-safety → verified via code inspection → PASS
- Category enum listing → verified via code inspection → PASS
- Payment `INVENTORY_FAILED` RabbitMQ binding & status update to `REFUNDED` → verified via code inspection → PASS

### Coverage Gaps
- Live message broker integration (RabbitMQ exchange/queue runtime delivery) — risk level: LOW — recommendation: accept risk for M2 unit/compilation scope.

---

## 5. Challenge Report (Adversarial Criticism)

### Overall Risk Assessment: HIGH

### Challenges

#### [Critical] Challenge 1: Public Password Dump Attack
- **Assumption challenged**: User management endpoints are administrative or safe.
- **Attack scenario**: An unauthenticated attacker sends `GET /api/auth/users`. `SecurityConfig` permits the request. `AuthController` calls `userRepository.findAll()` and serializes `User` objects to JSON. Because `password` lacks `@JsonIgnore`, all BCrypt password hashes are dumped.
- **Blast radius**: Complete system compromise; attacker receives credential hashes for all accounts.
- **Mitigation**: Restrict access in `SecurityConfig`, map entities to DTOs omitting password field, and add `@JsonIgnore` to `User.password`.

#### [High] Challenge 2: Unauthenticated `/api/auth/me` Endpoint Crash
- **Assumption challenged**: Controller handlers expecting `Principal` will receive authenticated contexts.
- **Attack scenario**: `GET /api/auth/me` is sent without Authorization header. `SecurityConfig` permits the request. `AuthController.me(null)` is called. `principal.getName()` throws NPE.
- **Blast radius**: Service returns 500 error and fills application logs with unhandled exceptions.
- **Mitigation**: Require authentication for `/api/auth/me` in `SecurityConfig.java`.

---

## 6. Verification Method

To independently verify these findings:

1. **Verify Maven Builds**:
   ```bash
   cd backend/common-events && mvn clean install -DskipTests
   cd ../auth-service && mvn clean compile
   cd ../product-service && mvn clean compile
   cd ../payment-service && mvn clean compile
   ```
2. **Inspect Auth Security Vulnerability**:
   - Open `backend/auth-service/src/main/java/com/ecommerce/auth_service/config/SecurityConfig.java` lines 37-39. Observe `/api/auth/users` and `/api/auth/me` under `permitAll()`.
   - Open `backend/auth-service/src/main/java/com/ecommerce/auth_service/entity/User.java` line 26. Observe `password` field missing `@JsonIgnore`.
3. **Inspect Product Stream Filtering & Category Listing**:
   - Open `backend/product-service/src/main/java/com/ecommerce/product_service/service/ProductService.java` lines 52-74.
   - Open `backend/product-service/src/main/java/com/ecommerce/product_service/controller/CategoryController.java` lines 18-23.
4. **Inspect Payment Service RabbitMQ & Status Update**:
   - Open `backend/payment-service/src/main/java/com/ecommerce/payment_service/config/RabbitMQConfig.java` lines 46-55.
   - Open `backend/payment-service/src/main/java/com/ecommerce/payment_service/service/PaymentService.java` lines 133-149.
