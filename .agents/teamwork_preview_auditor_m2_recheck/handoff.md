# Forensic Audit Report — Milestone 2 Backend Remediation Re-check

**Work Product**: `backend/auth-service` and `backend/api-gateway`
**Profile**: General Project
**Verdict**: CLEAN

---

## 1. Observation

Direct observations made during forensic audit:

1. **`backend/auth-service/src/main/java/com/ecommerce/auth_service/entity/User.java`**:
   - Line 3: `import com.fasterxml.jackson.annotation.JsonProperty;`
   - Lines 27-28:
     ```java
     @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
     private String password;
     ```
   - Confirms password field is annotated with `WRITE_ONLY` access to prevent serialization in responses.

2. **`backend/auth-service/src/main/java/com/ecommerce/auth_service/controller/AuthController.java`**:
   - Lines 42-47:
     ```java
     @GetMapping("/me")
     public ResponseEntity<?> me(Principal principal) {
         if (principal == null) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
         }
         return ResponseEntity.ok(authService.getProfile(principal.getName()));
     }
     ```
   - Confirms `/api/auth/me` explicitly checks `if (principal == null)` and returns HTTP 401 Unauthorized (`HttpStatus.UNAUTHORIZED`).

3. **`backend/auth-service/src/main/java/com/ecommerce/auth_service/config/SecurityConfig.java`**:
   - Lines 30-39:
     ```java
     .authorizeHttpRequests(auth -> auth
             .requestMatchers(
                     "/api/auth/register",
                     "/api/auth/login",
                     "/api/auth/validate",
                     "/api/auth/refresh",
                     "/api/auth/logout"
             ).permitAll()
             .anyRequest().authenticated()
     )
     ```
   - Confirms `/api/auth/users` and `/api/auth/me` are NOT present in `permitAll()`. All non-permitted endpoints default to `.anyRequest().authenticated()`.

4. **`backend/api-gateway/pom.xml`**:
   - Lines 49-52:
     ```xml
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-test</artifactId>
         <scope>test</scope>
     </dependency>
     ```
   - Confirms `spring-boot-starter-test` dependency is present.

5. **Behavioral Build and Test Execution**:
   - `mvn clean test` in `backend/api-gateway`:
     ```
     [INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
     [INFO] ------------------------------------------------------------------------
     [INFO] BUILD SUCCESS
     [INFO] ------------------------------------------------------------------------
     [INFO] Total time: 20.903 s
     ```
   - `mvn clean test` in `backend/auth-service`:
     ```
     [INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
     [INFO] ------------------------------------------------------------------------
     [INFO] BUILD SUCCESS
     [INFO] ------------------------------------------------------------------------
     [INFO] Total time: 31.405 s
     ```

---

## 2. Logic Chain

- Step 1: `User.java` contains `@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)` directly above `password`, satisfying the requirement to prevent sensitive credential exposure during JSON serialization.
- Step 2: `AuthController.java` checks `if (principal == null)` within the `/api/auth/me` handler and returns HTTP 401 (`ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()`), ensuring unauthenticated access attempts receive HTTP 401 instead of null pointer exceptions or 500 errors.
- Step 3: `SecurityConfig.java` lists only registration, login, validation, refresh, and logout endpoints under `permitAll()`. Neither `/api/auth/users` nor `/api/auth/me` is exposed publicly.
- Step 4: `api-gateway/pom.xml` includes `spring-boot-starter-test`, resolving previous missing test framework dependency issues.
- Step 5: Independent clean builds and test suite runs (`mvn clean test`) in both `backend/api-gateway` and `backend/auth-service` compiled successfully and passed without errors or test failures.

---

## 3. Caveats

No caveats. All target requirements were verified empirically against source code and execution logs.

---

## 4. Conclusion

Final Verdict: **CLEAN**

All 6 audit requirements have been completely verified and satisfied. The backend remediation for Milestone 2 is free of integrity violations and passes all behavioral build and test checks.

---

## 5. Verification Method

To independently re-verify this assessment:

1. Source inspection:
   - Inspect line 27 of `backend/auth-service/src/main/java/com/ecommerce/auth_service/entity/User.java` for `@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)`.
   - Inspect lines 43-45 of `backend/auth-service/src/main/java/com/ecommerce/auth_service/controller/AuthController.java` for `if (principal == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();`.
   - Inspect lines 31-39 of `backend/auth-service/src/main/java/com/ecommerce/auth_service/config/SecurityConfig.java` to verify `/api/auth/users` and `/api/auth/me` are omitted from `permitAll()`.
   - Inspect lines 49-52 of `backend/api-gateway/pom.xml` for `spring-boot-starter-test`.
2. Command execution:
   - Run `mvn clean test` in `backend/api-gateway` (expect `BUILD SUCCESS`).
   - Run `mvn clean test` in `backend/auth-service` (expect `BUILD SUCCESS`).
