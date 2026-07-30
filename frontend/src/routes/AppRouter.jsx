import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import { useAuthStore } from '@/stores/authStore';

// Lazy load pages for better performance
// Storefront pages
const Home = lazy(() => import('@/pages/storefront/Home'));
const Products = lazy(() => import('@/pages/storefront/Products'));
const ProductDetail = lazy(() => import('@/pages/storefront/ProductDetail'));
const Cart = lazy(() => import('@/pages/storefront/Cart'));
const MyOrders = lazy(() => import('@/pages/storefront/MyOrders'));
const AboutUs = lazy(() => import('@/pages/storefront/AboutUs'));
const ContactUs = lazy(() => import('@/pages/storefront/ContactUs'));
const TermsOfService = lazy(() => import('@/pages/storefront/TermsOfService'));
const PrivacyPolicy = lazy(() => import('@/pages/storefront/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('@/pages/storefront/RefundPolicy'));
const ShippingInfo = lazy(() => import('@/pages/storefront/ShippingInfo'));

// Auth pages
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));

// Admin pages
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('@/pages/admin/Products'));
const AdminOrders = lazy(() => import('@/pages/admin/Orders'));
const AdminPayments = lazy(() => import('@/pages/admin/Payments'));
const AdminInventory = lazy(() => import('@/pages/admin/Inventory'));
const AdminNotifications = lazy(() => import('@/pages/admin/Notifications'));
const AdminUsers = lazy(() => import('@/pages/admin/Users'));
const AdminAnalytics = lazy(() => import('@/pages/admin/Analytics'));
const AdminHealth = lazy(() => import('@/pages/admin/ServiceHealth'));
const AdminSettings = lazy(() => import('@/pages/admin/Settings'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

// Protected Route Component for Customer/User
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes with Navbar & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/shipping" element={<ShippingInfo />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Customer Routes */}
          <Route 
            path="/my-orders" 
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Admin Routes with Sidebar */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="health" element={<AdminHealth />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
