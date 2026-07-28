# Review Handoff Report — Milestone 2 Independent Code Review

## Review Summary

**Verdict**: REQUEST_CHANGES

The Milestone 2 implementations for configuration defaults (`application.properties`), `remove_comments.js` syntax fix, category listing (`/api/categories`), and product search filtering (`/api/products?search=&category=`) are verified to be correct and fully compliant. However, request for changes is issued due to two security and robustness findings in `auth-service` (`/api/auth/users` exposing user password hashes and `/api/auth/me` throwing NullPointerException for unauthenticated requests).

---

## 1. Observation

1. **`remove_comments.js` Syntax**:
   - `node --check remove_comments.js` executed cleanly with exit status `0`.
   - String literal on line 34 was fixed to `if (code.includes('//') || code.includes('/*')) {`.

2. **Inter-Service Property Fallbacks**:
   - `backend/order-service/src/main/resources/application.properties` line 18 contains `product.service.url=${PRODUCT_SERVICE_URL:http://localhost:8082}`.
   - `backend/inventory-service/src/main/resources/application.properties` line 18 contains `product.service.url=${PRODUCT_SERVICE_URL:http://localhost:8082}`.
   - `backend/api-gateway/src/main/resources/application.properties` line 9 contains `spring.cloud.gateway.mvc.routes[1].uri=${PRODUCT_SERVICE_URL:http://localhost:8082}`.

3. **API Endpoint `/api/categories`**:
   - `CategoryController.java` maps `@GetMapping("/api/categories")` returning `List<String>` of enum names from `ProductCategory.values()` (`["HEADPHONE", "EARPHONE", "EARBUDS", "SPEAKER", "SOUNDBAR", "HEADSET"]`).
   - `api-gateway` routes `/api/categories/**` to `product-service`.

4. **API Endpoint `/api/products?search=&category=`**:
   - `ProductController.java` and `ProductService.java` handle optional query params `search` and `category`.
   - `ProductService.getAllProducts(search, category)` filters products by substring match on name/description (case-insensitive) and category enum equality (case-insensitive).
   - Empty strings (`search=` and `category=`) are properly handled by returning all products.

5. **API Endpoint `/api/auth/users`**:
   - `AuthController.java` exposes `@GetMapping("/users")` calling `authService.getAllUsers()`, which returns `userRepository.findAll()` (`List<User>`).
   - `User.java` contains `private String password;` without `@JsonIgnore`.
   - `SecurityConfig.java` permits `/api/auth/users` via `.requestMatchers("/api/auth/users", "/api/auth/users/**").permitAll()`.
   - **Observation**: Requesting `/api/auth/users` serializes raw `User` JPA entities including hashed password strings in the HTTP JSON response to unauthenticated or authenticated users.

6. **API Endpoint `/api/auth/me`**:
   - `AuthController.java` exposes `@GetMapping("/me")` delegating to `profile(principal)`, which calls `authService.getProfile(principal.getName())`.
   - `SecurityConfig.java` permits `/api/auth/me` via `.requestMatchers(..., "/api/auth/me").permitAll()`.
   - **Observation**: When an unauthenticated request hits `/api/auth/me`, `principal` is `null`. Calling `principal.getName()` throws a `NullPointerException` (HTTP 500) instead of returning HTTP 401 Unauthorized.

7. **Compilation & Build**:
   - `backend/common-events`: `mvn clean install -DskipTests` -> `BUILD SUCCESS`
   - `backend/auth-service`: `mvn clean compile` -> `BUILD SUCCESS`
   - `backend/product-service`: `mvn clean compile` -> `BUILD SUCCESS`

---

## 2. Logic Chain

1. **Observation 1 & 2** -> `remove_comments.js` passes `node --check` syntax validation, and property fallbacks matching `${PRODUCT_SERVICE_URL:http://localhost:8082}` exist across all targeted microservices.
2. **Observation 3 & 4** -> `/api/categories` and `/api/products?search=&category=` conform to `PROJECT.md` interface specifications and execute valid stream filtering without throwing exceptions on empty query parameters.
3. **Observation 5** -> `/api/auth/users` directly returns entity model `User`. Because `password` has no `@JsonIgnore` and the endpoint is marked `permitAll()`, sensitive BCrypt password hashes are exposed over HTTP. In `PROJECT.md`, contract specifies returning `[{ id, email, role, name }]`.
4. **Observation 6** -> `/api/auth/me` is listed under `permitAll()` in `SecurityConfig.java`. If a request is unauthenticated, Spring Security lets it through with `principal = null`, causing `principal.getName()` to throw `NullPointerException` (HTTP 500) rather than a controlled HTTP 401 response.

---

## 3. Findings

### [Major] Finding 1: Sensitive Data Exposure in `/api/auth/users`

- **What**: `/api/auth/users` returns `List<User>` where `User` entity serializes the hashed `password` field in JSON.
- **Where**: `backend/auth-service/src/main/java/com/ecommerce/auth_service/controller/AuthController.java` (line 46) & `User.java` (line 26).
- **Why**: Exposing password hashes violates security best practices and fails the `PROJECT.md` API specification (`[{ id, email, role, name }]`).
- **Suggestion**: Create a DTO (e.g., `UserResponse` or `ProfileResponse`) excluding the `password` field, or annotate `password` in `User.java` with `@JsonIgnore`.

### [Major] Finding 2: Unhandled NullPointerException (HTTP 500) on `/api/auth/me`

- **What**: Invoking `/api/auth/me` without authentication results in a `NullPointerException` (HTTP 500) when calling `principal.getName()`.
- **Where**: `backend/auth-service/src/main/java/com/ecommerce/auth_service/controller/AuthController.java` (lines 34, 41) & `SecurityConfig.java` (line 39).
- **Why**: `/api/auth/me` was included in `permitAll()` in `SecurityConfig.java`. When no JWT token is provided, `principal` is `null`.
- **Suggestion**: Remove `/api/auth/me` from `permitAll()` in `SecurityConfig.java` so Spring Security denies unauthenticated requests with HTTP 401, or add a null check in `AuthController`:
  ```java
  if (principal == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }
  ```

---

## 4. Verified Claims

- `node --check remove_comments.js` passes with exit code 0 → **PASS**
- Fallback localhost defaults `${PRODUCT_SERVICE_URL:http://localhost:8082}` present in `order-service`, `inventory-service`, and `api-gateway` `application.properties` → **PASS**
- GET `/api/categories` returns product categories array matching `ProductCategory` enums → **PASS**
- GET `/api/products?search=&category=` supports empty string parameters and case-insensitive search/category filtering → **PASS**
- Maven compilation for `common-events`, `auth-service`, and `product-service` → **PASS**

---

## 5. Coverage Gaps

- **Runtime HTTP Gateway Integration**: Live HTTP call testing with running Postgres database containers and Gateway runtime — risk level: **LOW** (static code, mappings, and unit compilation verified).

---

## 6. Unverified Items

- Live end-to-end JWT token refresh lifecycle with active RabbitMQ broker.

---

## 7. Caveats

- No caveats. Code was fully inspected and compiled without errors.

---

## 8. Conclusion

Milestone 2 deliverables for properties fallbacks, script syntax, category listing, and product search/filtering are correct and well-implemented. However, changes are requested for `auth-service` to fix password hash exposure in `/api/auth/users` and NullPointerException on unauthenticated `/api/auth/me`.

---

## 9. Verification Method

To verify the findings independently:

1. **Verify script syntax**:
   ```bash
   node --check remove_comments.js
   ```
2. **Verify property fallbacks**:
   ```bash
   grep "PRODUCT_SERVICE_URL" backend/order-service/src/main/resources/application.properties backend/inventory-service/src/main/resources/application.properties backend/api-gateway/src/main/resources/application.properties
   ```
3. **Verify compilation**:
   ```bash
   cd backend/common-events && mvn clean install -DskipTests
   cd backend/auth-service && mvn clean compile
   cd backend/product-service && mvn clean compile
   ```
4. **Inspect User serialization & SecurityConfig**:
   - Inspect `User.java` line 26 (missing `@JsonIgnore`).
   - Inspect `AuthController.java` line 46 (`getAllUsers()` returning `List<User>`).
   - Inspect `AuthController.java` line 41 (`me(Principal principal)` calling `principal.getName()`).
   - Inspect `SecurityConfig.java` line 39 (`/api/auth/me` in `permitAll()`).
