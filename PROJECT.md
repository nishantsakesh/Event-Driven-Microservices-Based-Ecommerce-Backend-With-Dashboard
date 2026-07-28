# Project: Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard

## Architecture
- Frontend: Vite-based web application (React 19, React Router 7, TanStack Query, TailwindCSS).
- Backend: Event-driven microservices (Spring Boot 3.5.4 Java 21, API Gateway on 8080, Auth on 8081, Product on 8082, Inventory on 8083, Order on 8084, Payment on 8085, Notification on 8087, RabbitMQ, PostgreSQL).

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Diagnosis | Full audit of frontend, backend, and build scripts | none | DONE |
| 2 | Backend Repair & Dynamic APIs | Fix POM versions, missing routes (/api/auth/users, /api/auth/me, /api/categories, search params), payment compensation for INVENTORY_FAILED, password write-only protection | M1 | DONE |
| 3 | Frontend Responsiveness & Cart (R1) | Fix 375px mobile viewport layout overflows, product routing navigation, and cart state persistence across pages | M1, M2 | IN_PROGRESS |
| 4 | Checkout Microservice Integration (R2) | Build out frontend checkout UI integrated with order-service and payment-service, handling asynchronous PENDING and PLACED states | M2, M3 | IN_PROGRESS |
| 5 | E2E Verification & Forensic Integrity Audit | Full Vite build validation, E2E workflow check, Reviewer & Forensic Auditor approval | M3, M4 | PLANNED |

## Interface Contracts
### Frontend ↔ Backend API Gateway (Port 8080)
- GET `/api/products`: returns list or page of dynamic product objects JSON `[{ id, name, price, description, imageUrl, categoryId, stock }]` (supports query params `?search=` and `?category=`)
- GET `/api/categories`: returns list of product category strings `["HEADPHONE", "EARPHONE", "EARBUDS", "SPEAKER", "SOUNDBAR", "HEADSET"]`
- GET `/api/auth/users`: returns list of registered users `[{ id, email, role, name }]` (password write-only protected)
- GET `/api/auth/me`: returns current authenticated user profile (HTTP 401 if unauthenticated)
- POST `/api/orders`: accepts checkout payload JSON `{ items: [...], shippingAddress: string, paymentMethod: string, totalAmount: number }` and returns order confirmation JSON

## Code Layout
- `.agents/`: Agent coordination metadata ONLY
- `frontend/`: Vite React 19 web application
- `backend/`: 8 Spring Boot Java microservices (`common-events`, `api-gateway`, `auth-service`, `product-service`, `inventory-service`, `order-service`, `payment-service`, `notification-service`)
- `docker-compose.yml`: Local multi-container database and message broker orchestration
