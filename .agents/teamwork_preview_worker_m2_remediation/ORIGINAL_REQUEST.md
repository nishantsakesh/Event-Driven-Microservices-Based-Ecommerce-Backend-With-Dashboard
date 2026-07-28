## 2026-07-26T06:32:49Z
<USER_REQUEST>
You are teamwork_preview_worker, a software engineering worker.
Your assigned working directory is: c:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/.agents/teamwork_preview_worker_m2_remediation

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

FORENSIC AUDIT FAILURE REMEDIATION TASK:
Milestone 2 failed forensic audit due to INTEGRITY VIOLATION. You must fix all 4 issues identified by the Forensic Auditor and Reviewers.

Full Audit Evidence:
1. Security Data Leak in `auth-service`: `User.java` exposes `password` field in JSON because it lacks `@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)` or `@JsonIgnore`.
2. Unsafe `.permitAll()` in `auth-service/SecurityConfig.java`: `/api/auth/users`, `/api/auth/users/**`, and `/api/auth/me` were listed in `.permitAll()`. Unauthenticated users could dump all user password hashes via `/api/auth/users`. Also, `/api/auth/me` threw `NullPointerException` (HTTP 500) when called unauthenticated.
3. Unhandled null Principal in `AuthController.java`: `me(Principal principal)` called `principal.getName()` without checking if `principal` is null.
4. Missing test dependency in `api-gateway/pom.xml`: `spring-boot-starter-test` was omitted, causing `mvn clean test` to fail (`package org.junit.jupiter.api does not exist`).

Specific Remediation Steps Required:
1. `backend/auth-service/src/main/java/com/ecommerce/auth_service/entity/User.java`:
   - Add `@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)` (or `@JsonIgnore`) to `private String password;` so password hashes are NEVER exposed in API JSON outputs.
2. `backend/auth-service/src/main/java/com/ecommerce/auth_service/controller/AuthController.java`:
   - In `me(Principal principal)`: Add null check for `principal`. If null, return HTTP 401 Unauthorized (`ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()`).
3. `backend/auth-service/src/main/java/com/ecommerce/auth_service/config/SecurityConfig.java`:
   - Remove `/api/auth/users`, `/api/auth/users/**`, and `/api/auth/me` from `.permitAll()`. Require authentication for `/api/auth/me` and `/api/auth/users`.
4. `backend/api-gateway/pom.xml`:
   - Add `<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-test</artifactId><scope>test</scope></dependency>`.
5. Verification:
   - Run `mvn clean test` in `backend/api-gateway` (must be `BUILD SUCCESS`).
   - Run `mvn clean test` in `backend/auth-service` (must be `BUILD SUCCESS`).
   - Document results in `c:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/.agents/teamwork_preview_worker_m2_remediation/handoff.md`.
   - Send a message to parent upon completion.
</USER_REQUEST>
