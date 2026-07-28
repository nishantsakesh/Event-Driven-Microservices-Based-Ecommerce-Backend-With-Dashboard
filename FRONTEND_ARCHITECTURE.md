# Frontend Architecture Documentation

> **NOTE:** Files such as `ProductDetail.jsx`, `Products.jsx`, `admin/Products.jsx`, `index.css`, and `ProductService.java` are under active modification by other agent teams. This documentation reflects their state at the time of writing.

## 1. Overview
The frontend is a React application built with Vite, styled with Tailwind CSS, and uses Framer Motion / GSAP for animations. State management is handled by Zustand (with persistence) for global state and React Query (`@tanstack/react-query`) for server-state and API caching. Three.js is utilized for 3D elements via `@react-three/fiber` and `@react-three/drei`.

---

## 2. Master Table of Routes

| Path | Component | Layout | Protected | Role Required |
|------|-----------|--------|-----------|---------------|
| `/` | `Home` | `PublicLayout` | No | - |
| `/products` | `Products` | `PublicLayout` | No | - |
| `/products/:id` | `ProductDetail` | `PublicLayout`| No | - |
| `/cart` | `Cart` | `PublicLayout` | No | - |
| `/login` | `Login` | `PublicLayout` | No | - |
| `/register` | `Register` | `PublicLayout` | No | - |
| `/my-orders` | `MyOrders` | `PublicLayout` | Yes | Customer |
| `/admin/*` | `Admin*` (Dashboard, etc.) | `AdminLayout`| Yes | Admin |

---

## 3. Master Table of API Endpoints

| Endpoint | Method | Purpose | Service / Constant |
|----------|--------|---------|---------------------|
| `/api/auth/login` | POST | User login | `API.AUTH` |
| `/api/auth/register` | POST | User registration | `API.AUTH` |
| `/api/auth/me` | GET | Get current user | `API.AUTH` |
| `/api/auth/validate` | GET | Validate token | `API.AUTH` |
| `/api/auth/users` | GET | Get all users | `API.USERS` |
| `/api/auth/users/:id` | GET | Get specific user | `API.USERS` |
| `/api/products` | GET | Get all products | `API.PRODUCTS` |
| `/api/products` | POST | Create a product | `API.PRODUCTS` |
| `/api/products/:id` | GET | Get product by ID | `API.PRODUCTS` |
| `/api/products/:id` | PUT | Update product | `API.PRODUCTS` |
| `/api/products/:id` | DELETE | Delete product | `API.PRODUCTS` |
| `/api/categories` | GET | Get categories | `API.CATEGORIES` |
| `/api/orders` | GET | Get all orders | `API.ORDERS` |
| `/api/orders` | POST | Create an order | `API.ORDERS` |
| `/api/orders/:id` | GET | Get order by ID | `API.ORDERS` |
| `/api/orders/:id` | DELETE | Cancel order | `API.ORDERS` |
| `/api/orders/user/:userId` | GET | Get user's orders | `API.ORDERS` |
| `/api/payments` | GET | Get all payments | `API.PAYMENTS` |
| `/api/payments/:id` | GET | Get payment by ID | `API.PAYMENTS` |
| `/api/payments/order/:orderId`| GET | Get payment by order| `API.PAYMENTS` |
| `/api/payments/user/:userId` | GET | Get payments by user| `API.PAYMENTS` |
| `/api/inventory` | GET | Get inventory records| `API.INVENTORY` |
| `/api/inventory/:id` | GET | Get inventory by ID | `API.INVENTORY` |
| `/api/notifications` | GET | Get notifications | `API.NOTIFICATIONS` |

---

## 4. Directory & Module Analysis

### 4.1 `src/api/axios.js`
1. **Purpose**: Configures the base Axios client with interceptors for attaching the auth token and handling 401 unauthorized errors.
2. **Exports**: `apiClient` (default).
3. **Dependencies**: `axios`, `useAuthStore` (zustand).
4. **Data Flow**: `Request -> Interceptor (adds Bearer token) -> Network -> Response -> Interceptor (catches 401 and logs out) -> App`.
5. **API Contracts**: Base URL is `http://localhost:8888`.
6. **State Management**: Accesses `useAuthStore` dynamically via `.getState()`.
7. **Component Props**: N/A
8. **Known Issues / TODOs**: Base URL is hardcoded instead of using an environment variable.

### 4.2 `src/api/services.js`
1. **Purpose**: Encapsulates API requests into categorized service objects.
2. **Exports**: `authService`, `productService`, `categoryService`, `orderService`, `paymentService`, `inventoryService`, `notificationService`, `userService`, `dashboardService`, `healthService`.
3. **Dependencies**: `apiClient` (from `axios.js`), `API` (from `constants/api.js`).
4. **Data Flow**: `UI -> React Query hook -> Service function -> Axios Client`.
5. **API Contracts**: 
   - Login Payload: `{ email, password }`
   - Order Payload: `{ userId, items: [{ productId, quantity }], shippingAddress: {...}, paymentMethod }`
6. **State Management**: Pure functions, no internal state.
7. **Component Props**: N/A
8. **Known Issues / TODOs**: Dashboard aggregate stats fetch multiple heavy endpoints directly on frontend.

### 4.3 `src/stores/authStore.js`
1. **Purpose**: Manages authentication state and current user profile globally.
2. **Exports**: `useAuthStore`.
3. **Dependencies**: `zustand`, `zustand/middleware` (persist).
4. **Data Flow**: `Component -> action (login/logout) -> Zustand State -> LocalStorage`.
5. **API Contracts**: Saves `user: { id, name, email, role }` and `token`.
6. **State Management**: Zustand persisted to `localStorage` under key `audiohub-auth`.
7. **Component Props**: N/A
8. **Known Issues / TODOs**: No explicit token expiration handling on the client side aside from intercepting 401s.

### 4.4 `src/stores/cartStore.js`
1. **Purpose**: Manages the user's shopping cart state.
2. **Exports**: `useCartStore`.
3. **Dependencies**: `zustand`, `zustand/middleware` (persist).
4. **Data Flow**: `Product Card -> addItem() -> cartStore -> LocalStorage -> Cart UI`.
5. **API Contracts**: Stores cart items with shape `{ id, name, price, imageUrl, brand, category, quantity }`.
6. **State Management**: Zustand persisted to `localStorage` under key `audiohub-cart`.
7. **Component Props**: N/A
8. **Known Issues / TODOs**: Cart state is only local. Does not sync with backend database if user logs in from another device.

### 4.5 `src/hooks/index.js`
1. **Purpose**: Provides React Query hooks for fetching data and performing mutations.
2. **Exports**: `useProducts`, `useProduct`, `useCategories`, `useOrders`, `useOrder`, `useUserOrders`, `usePayments`, `useInventory`, `useNotifications`, `useUsers`, `useDashboard`, `useCreateProduct`, `useUpdateProduct`, `useDeleteProduct`, `useCreateOrder`, `useCancelOrder`.
3. **Dependencies**: `@tanstack/react-query`, `services.js`, `queryKeys.js`, `sonner` (toast).
4. **Data Flow**: `UI Component -> React Query Hook -> API Service -> Server -> React Query Cache -> UI`.
5. **API Contracts**: Matches return types from `services.js`.
6. **State Management**: Server-state management using React Query caching.
7. **Component Props**: N/A
8. **Known Issues / TODOs**: None identified.

### 4.6 `src/routes/AppRouter.jsx`
1. **Purpose**: Defines the main routing architecture of the application with lazy loading.
2. **Exports**: `AppRouter` (default).
3. **Dependencies**: `react-router-dom`, `layouts`, `pages`, `authStore`.
4. **Data Flow**: Matches URL paths to Route configurations.
5. **API Contracts**: N/A
6. **State Management**: Uses `useAuthStore` to guard protected routes.
7. **Component Props**: `ProtectedRoute` uses `{ children }`.
8. **Known Issues / TODOs**: Missing error boundary component for failed lazy loads.

### 4.7 `src/pages/storefront/Home.jsx` & `Products.jsx` & `ProductDetail.jsx`
1. **Purpose**: Storefront UI for browsing and interacting with products.
2. **Exports**: Default React Components.
3. **Dependencies**: `framer-motion`, `lucide-react`, React Query hooks, Zustand stores. `ProductDetail` also depends on `gsap`.
4. **Data Flow**:
   ```
   [Hooks] --> (products data) --> [Storefront Components]
   [User Click] --> [Cart Store]
   ```
5. **API Contracts**: Consumes product models and category constants.
6. **State Management**: 
   - Local state for filters, quantity inputs.
   - Global state via `useCartStore` and `useAuthStore`.
7. **Component Props**: Uses URL params/searchParams.
8. **Known Issues / TODOs**: Active modifications occurring on these pages by another team. GSAP animations in `ProductDetail` are heavily tied to DOM structure. Admin users are explicitly blocked from ordering (handled via client-side toasts).

### 4.8 `src/pages/storefront/Cart.jsx` & `MyOrders.jsx`
1. **Purpose**: Managing shopping cart checkout and viewing user order history.
2. **Exports**: Default React Components.
3. **Dependencies**: `cartStore`, `authStore`, `useCreateOrder`, `useUserOrders`.
4. **Data Flow**: `Cart UI -> Create Order Mutation -> Success -> Clear Cart -> Navigate My Orders`.
5. **API Contracts**: Order payload includes shipping address and payment method.
6. **State Management**: Derived state for totals (subtotal, tax, shipping).
7. **Component Props**: N/A
8. **Known Issues / TODOs**: Checkout form is very basic and doesn't integrate actual payment gateways (Stripe/PayPal) yet.

### 4.9 `src/pages/auth/Login.jsx` & `Register.jsx`
1. **Purpose**: User authentication interfaces.
2. **Exports**: Default React Components.
3. **Dependencies**: `authService`, `authStore`, `react-router-dom`.
4. **Data Flow**: `Form Data State -> authService.login() -> authStore.login() -> Redirect`.
5. **API Contracts**: Uses `{ email, password }` for login.
6. **State Management**: Controlled inputs using local `useState`.
7. **Component Props**: N/A
8. **Known Issues / TODOs**: No password strength indicator on registration.

### 4.10 `src/layouts/PublicLayout.jsx` & `AdminLayout.jsx`
1. **Purpose**: High-level layouts wrapping public and private app sections.
2. **Exports**: Default React Components.
3. **Dependencies**: `Navbar`, `Footer`, `AdminSidebar`, `react-router-dom`, `authStore`.
4. **Data Flow**: Renders `Outlet` with shared contextual UI.
5. **API Contracts**: N/A
6. **State Management**: `AdminLayout` performs hydration check and auth guard via `useAuthStore`.
7. **Component Props**: N/A
8. **Known Issues / TODOs**: N/A

### 4.11 `src/components/layout/Navbar.jsx` & `Footer.jsx` & `AdminSidebar.jsx`
1. **Purpose**: Global navigation components.
2. **Exports**: Default React Components.
3. **Dependencies**: `lucide-react`, `authStore`, `cartStore`, `framer-motion`.
4. **Data Flow**: Pulls `cartItems` count and `user` profile for UI updates.
5. **API Contracts**: N/A
6. **State Management**: Local state for mobile menu toggles (`isMobileMenuOpen`, `isProfileOpen`).
7. **Component Props**: N/A
8. **Known Issues / TODOs**: N/A

### 4.12 Shared & 3D Components (`EmptyState`, `LoadingSkeleton`, `Hero3DCanvas`, etc.)
1. **Purpose**: Reusable UI elements and 3D visual effects.
2. **Exports**: Named and default exports depending on file.
3. **Dependencies**: `@react-three/fiber`, `@react-three/drei`, `lucide-react`, `clsx`, `tailwind-merge`.
4. **Data Flow**: N/A
5. **API Contracts**: N/A
6. **State Management**: N/A
7. **Component Props**: 
   - `EmptyState`: `icon, title, description, actionLabel, actionHref, actionOnClick, className`.
   - `LoadingSkeleton`: `type, count, className`.
   - `StatusBadge`: `status, className`.
8. **Known Issues / TODOs**: 3D components might cause performance hits on low-end mobile devices; no fallback defined.

---

## 5. Dependency Graph

```text
App Entry (main.jsx -> App.jsx)
 │
 ├── Providers
 │   └── QueryClientProvider (React Query)
 │
 └── Routing (AppRouter.jsx)
      │
      ├── PublicLayout
      │    ├── Navbar (Uses CartStore & AuthStore)
      │    ├── Pages (Home, Products, ProductDetail, Cart, MyOrders)
      │    │    └── Queries & Mutations (hooks/index.js) -> API Services (api/services.js) -> Axios Client (api/axios.js)
      │    └── Footer
      │
      └── AdminLayout (Guarded by AuthStore)
           ├── AdminSidebar
           └── Pages (Dashboard, etc.)
```

## 6. ASCII Diagrams

### Data Flow Diagram: Placing an Order

```text
[User] -> (Clicks Checkout) -> [Cart Component]
                                      │
                                      ▼
                             (Triggers Mutation)
                                      │
                                      ▼
                              [useCreateOrder Hook]
                                      │
                                      ▼
                             [orderService.create()]
                                      │
                                      ▼
                            [apiClient (Axios)] -> HTTP POST /api/orders
                                      │
                   (On Success) <─────┘
                        │
                        ▼
    [Query Cache Invalidated (QUERY_KEYS.ORDERS)]
                        │
                        ▼
      [useCartStore.clearCart()]  ----> [UI Updates (Cart Empty)]
                        │
                        ▼
              [Navigate to /my-orders]
```
