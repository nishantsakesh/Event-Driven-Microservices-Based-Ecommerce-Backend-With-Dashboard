## 2026-07-26T06:46:52Z
You are teamwork_preview_worker, a frontend software engineering worker.
Your assigned working directory is: c:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/.agents/teamwork_preview_worker_m3_1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Objective: Execute Milestone 3 (Frontend Restoration & Dynamic Integration) and Milestone 4 (Toast Notifications, Polish, and Cleanup) for `frontend/src`.

Specific Tasks:
1. `frontend/src/constants/api.js`:
   - Add `CART: "/api/cart"` to exported `API` object.

2. Routing & Navigation Sync:
   - `constants/routes.js`: Sync `ROUTES.ORDERS = "/my-orders"` and `ROUTES.PROFILE = "/admin/profile"`.
   - `constants/navigation.js` & `AppRouter.jsx`: Ensure navigation links (`/products`, `/categories`, `/about`, `/cart`, `/my-orders`) align with registered routes in `AppRouter.jsx`.
   - `components/layout/FooterLinks.jsx`: Replace `<a href="#">` tags with React Router `<Link>` components.

3. Interactivity & Dead Buttons:
   - `UserMenu.jsx`: Wrap `ShoppingCart` in `<Link to="/cart">` with a badge showing total cart item count (`cartItems.reduce((acc, item) => acc + item.quantity, 0)`). Wrap `User` icon with navigation/login link.
   - `SearchButton.jsx`: Wire search button to navigate to `/products?search=` or trigger search input state.
   - `MobileNav.jsx`: Wire hamburger icon to toggle mobile drawer state.
   - `HeroContent.jsx`, `Categories.jsx`, `CTA.jsx`, `Newsletter.jsx`: Connect all action buttons ("Shop Now", "Browse Products", category cards, "Start Shopping", Newsletter submit) to router links or handlers.
   - `pages/Products/Products.jsx` & `pages/Categories/Categories.jsx`: Connect Add, Edit, Delete buttons to dialog modals and mutation hooks (`useCreateProduct`, `useUpdateProduct`, `useDeleteProduct`).

4. Product Rendering & API Resilience:
   - `components/home/FeaturedProducts.jsx`: Fetch dynamic products using `useProducts({ limit: 4 })` with fallback to static products if backend is offline.
   - `pages/ProductListing.jsx`: Safely normalize API product lists:
     `const productList = Array.isArray(products) ? products : (products?.content || []);`
   - Compare category IDs as strings: `String(product.categoryId) === String(selectedCategory)`.
   - Replace unsafe `parseFloat(x).toFixed(2)` with a safe price formatting helper function (`formatPrice`).
   - `pages/ProductDetail.jsx`: Fix stock selector fallback: `Math.min(product.stock ?? 10, quantity + 1)` and verify `product.stock > 0`.

5. Checkout Workflow & Login Redirect:
   - `pages/Cart.jsx`: Implement a checkout form modal allowing users to enter shipping address, city, phone, postal code, and select payment method before placing an order (replacing hardcoded address `'123 Main St'`).
   - `pages/Cart.jsx`: Remove duplicate toast call in `onSuccess` (toast is handled by `useOrderMutations`).
   - `pages/Login.jsx`: Read `useSearchParams()` for `redirect` parameter (`const redirect = searchParams.get('redirect') || '/';`) and navigate back to `redirect` after login.

6. File Tree Cleanup:
   - Delete the 13 empty 0-byte placeholder files:
     `src/api/services/productService.js`, `inventoryService.js`, `notificationService.js`, `orderService.js`, `paymentService.js`, `authService.js`, `pages/NotFound/NotFound.jsx`, `pages/NotFound/index.js`, `hooks/mutations/useAuth.js`, `useCartMutations.js`, `useNotificationMutations.js`, `usePaymentMutations.js`, `useProfileMutations.js`.
   - Remove unused `src/business/` directory and dead layout files `AdminLayout.jsx`, `MainLayout/`.

7. Verification:
   - Run `npm run build` in `frontend/`. Ensure the Vite build passes cleanly with zero syntax or bundling errors (`✓ built in X.XXs`).
   - Document build results and changes in `c:/Users/nisha/Downloads/Event-Driven-Microservices-Based-Ecommerce-Backend-With-Dashboard-main/.agents/teamwork_preview_worker_m3_1/handoff.md`.
   - Send a message to parent upon completion.
