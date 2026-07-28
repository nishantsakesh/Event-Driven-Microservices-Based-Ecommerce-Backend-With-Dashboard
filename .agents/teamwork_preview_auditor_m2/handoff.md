# Forensic Audit Report & Handoff

## Forensic Audit Summary

**Work Product**: Milestone 2 Backend Repairs (`auth-service`, `product-service`, `payment-service`, `api-gateway`)  
**Profile**: General Project  
**Verdict**: INTEGRITY VIOLATION  

### Phase Results
- **Endpoint Hardcoding Check**: PASS — Controllers interact with underlying services and JPA Repositories (`UserRepository`, `ProductRepository`, `PaymentRepository`) or dynamic domain enums (`ProductCategory`).
- **Security Configuration Check**: FAIL — Unsafe security configuration in `auth-service/SecurityConfig.java` permits unauthenticated access to `/api/auth/users` and `/api/auth/users/**`, exposing all user accounts and raw BCrypt password hashes. Also `/api/auth/me` is permitted without authentication, causing `NullPointerException` (HTTP 500) when invoked unauthenticated.
- **Event Listener Implementation Check**: PASS — `PaymentListener` delegates to `PaymentService`, which genuine event handling logic (creating DB records, simulating failure rules, publishing success/failure events, handling inventory failures).
- **Build Configuration & Dependency Check**: FAIL — `api-gateway/pom.xml` omitted `spring-boot-starter-test`, causing `mvn clean test` to fail with compilation errors (`package org.junit.jupiter.api does not exist`, `package org.springframework.boot.test.context does not exist`).

---

## 1. Observation

1. **`auth-service/SecurityConfig.java` (lines 30-49)**:
   ```java
   .authorizeHttpRequests(auth -> auth
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
           .anyRequest().authenticated()
   )
   ```
2. **`auth-service/entity/User.java` (lines 15-32)**:
   ```java
   public class User {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;
       private String name;
       @Column(unique = true, nullable = false)
       private String email;
       private String password;
       @Enumerated(EnumType.STRING)
       private Role role;
       private LocalDateTime createdAt;
   }
   ```
   No `@JsonIgnore` or DTO mapping is applied to `password` when `getAllUsers()` returns `List<User>`.

3. **`auth-service/controller/AuthController.java` (lines 40-48)**:
   ```java
   @GetMapping("/me")
   public ProfileResponse me(Principal principal) {
       return profile(principal);
   }
   @GetMapping("/users")
   public List<User> getAllUsers() {
       return authService.getAllUsers();
   }
   ```

4. **`api-gateway/pom.xml` (lines 33-53)**:
   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-security</artifactId>
       </dependency>
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-gateway-server-webmvc</artifactId>
       </dependency>
       <dependency>
           <groupId>org.projectlombok</groupId>
           <artifactId>lombok</artifactId>
           <optional>true</optional>
       </dependency>
       <dependency>
           <groupId>org.springframework.security</groupId>
           <artifactId>spring-security-test</artifactId>
           <scope>test</scope>
       </dependency>
   </dependencies>
   ```
   `spring-boot-starter-test` dependency is missing from `pom.xml`.

5. **`api-gateway` Maven Build Output**:
   Command: `mvn clean test` in `backend/api-gateway`
   Result:
   ```
   [ERROR] /C:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/backend/api-gateway/src/test/java/com/ecommerce/api_gateway/ApiGatewayApplicationTests.java:[3,29] package org.junit.jupiter.api does not exist
   [ERROR] /C:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/backend/api-gateway/src/test/java/com/ecommerce/api_gateway/ApiGatewayApplicationTests.java:[4,45] package org.springframework.boot.test.context does not exist
   [ERROR] BUILD FAILURE
   ```

6. **`auth-service`, `product-service`, `payment-service` Maven Test Execution**:
   - `auth-service`: `mvn clean test` -> `BUILD SUCCESS` (1 test passed)
   - `product-service`: `mvn clean test` -> `BUILD SUCCESS` (1 test passed)
   - `payment-service`: `mvn clean test` -> `BUILD SUCCESS` (1 test passed)

---

## 2. Logic Chain

1. **Security Bypass Reasoning**:
   - Observation #1 shows `/api/auth/users`, `/api/auth/users/**`, and `/api/auth/me` configured with `.permitAll()` in `auth-service/SecurityConfig.java`.
   - Observation #2 & #3 show `getAllUsers()` returns raw `User` entity instances without password exclusion.
   - Connecting Observation #1, #2, and #3: Any unauthenticated client can issue `GET /api/auth/users` and obtain all registered user credentials including BCrypt password hashes. Furthermore, an unauthenticated request to `/api/auth/me` triggers a `NullPointerException` (HTTP 500) rather than an HTTP 401 response due to missing authentication enforcement. This is an unsafe security bypass.

2. **Build Configuration Failure Reasoning**:
   - Observation #4 shows `spring-boot-starter-test` was omitted from `api-gateway/pom.xml`.
   - Observation #5 shows that executing `mvn clean test` fails during compilation of `ApiGatewayApplicationTests.java` because JUnit Jupiter and Spring Boot Test context classes are missing from test classpath.
   - Connecting Observation #4 and #5: The build file is broken/tampered such that automated test suits fail to compile.

3. **Conclusion derivation**:
   - Integrity Forensics rules state: "If ANY check fails, your verdict is INTEGRITY VIOLATION and you MUST reject the work product."
   - Since both the Security Configuration check and Build Configuration check failed, the final audit verdict is **INTEGRITY VIOLATION**.

---

## 3. Caveats

- `auth-service`, `product-service`, and `payment-service` compile and pass their basic Spring Boot application context tests successfully.
- No malicious external dependencies or hardcoded dummy JSON payloads replacing database services were identified in `ProductController` or `PaymentListener`.

---

## 4. Conclusion

**Final Verdict**: INTEGRITY VIOLATION

The Milestone 2 backend repairs fail forensic audit due to:
1. **Unsafe Security Bypass**: `auth-service` exposes sensitive endpoints (`/api/auth/users`, `/api/auth/users/**`) under `.permitAll()`, leaking database user records and BCrypt password hashes to unauthenticated users.
2. **Broken Test Build**: `api-gateway/pom.xml` lacks `spring-boot-starter-test`, rendering the test suite uncompilable.

---

## 5. Verification Method

To independently verify these findings:

1. **Verify `api-gateway` build failure**:
   ```bash
   cd backend/api-gateway
   mvn clean test
   ```
   *Expected result*: Build failure due to missing JUnit / Spring Boot test annotations.

2. **Verify Security Bypass in `auth-service`**:
   Inspect `backend/auth-service/src/main/java/com/ecommerce/auth_service/config/SecurityConfig.java` lines 37-40 to confirm `/api/auth/users` and `/api/auth/me` are listed under `.permitAll()`.

3. **Verify Password Leakage**:
   Inspect `backend/auth-service/src/main/java/com/ecommerce/auth_service/entity/User.java` to confirm `private String password;` lacks `@JsonIgnore`.
