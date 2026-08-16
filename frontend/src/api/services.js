import apiClient from "@/api/axios";
import { API } from "@/constants/api";

export const authService = {
  login: (credentials) => apiClient.post(`${API.AUTH}/login`, credentials),
  register: (data) => apiClient.post(`${API.AUTH}/register`, data),
  me: () => apiClient.get(`${API.AUTH}/me`),
  validate: () => apiClient.get(`${API.AUTH}/validate`),
};

export const productService = {
  getAll: (params) => apiClient.get(API.PRODUCTS, { params }),
  getById: (id) => apiClient.get(`${API.PRODUCTS}/${id}`),
  create: (data) => apiClient.post(API.PRODUCTS, data),
  update: (id, data) => apiClient.put(`${API.PRODUCTS}/${id}`, data),
  delete: (id) => apiClient.delete(`${API.PRODUCTS}/${id}`),
};

export const categoryService = {
  getAll: () => apiClient.get(API.CATEGORIES),
};

export const orderService = {
  getAll: () => apiClient.get(API.ORDERS),
  getById: (id) => apiClient.get(`${API.ORDERS}/${id}`),
  getByUser: (userId) => apiClient.get(`${API.ORDERS}/user/${userId}`),
  create: (data) => apiClient.post(API.ORDERS, data),
  cancel: (id) => apiClient.delete(`${API.ORDERS}/${id}`),
  updateStatus: (id, status) => apiClient.patch(`${API.ORDERS}/${id}/status`, null, { params: { status } }),
  markCodAsPaid: (id) => apiClient.patch(`${API.ORDERS}/${id}/mark-cod-paid`),
};

export const paymentService = {
  getAll: () => apiClient.get(API.PAYMENTS),
  getById: (id) => apiClient.get(`${API.PAYMENTS}/${id}`),
  getByOrder: (orderId) => apiClient.get(`${API.PAYMENTS}/order/${orderId}`),
  getByUser: (userId) => apiClient.get(`${API.PAYMENTS}/user/${userId}`),
};

export const inventoryService = {
  getAll: () => apiClient.get(API.INVENTORY),
  getById: (id) => apiClient.get(`${API.INVENTORY}/${id}`),
  getByOrder: (orderId) => apiClient.get(`${API.INVENTORY}/order/${orderId}`),
  getByProduct: (productId) => apiClient.get(`${API.INVENTORY}/product/${productId}`),
};

export const notificationService = {
  getAll: () => apiClient.get(API.NOTIFICATIONS),
};

export const newsletterService = {
  subscribe: (email) => apiClient.post(`${API.NOTIFICATIONS}/newsletter/subscribe`, { email }),
  getSubscribers: () => apiClient.get(`${API.NOTIFICATIONS}/newsletter/subscribers`),
  deleteSubscriber: (id) => apiClient.delete(`${API.NOTIFICATIONS}/newsletter/subscribers/${id}`),
};

export const userService = {
  getAll: () => apiClient.get(API.USERS),
  getById: (id) => apiClient.get(`${API.USERS}/${id}`),
};

/**
 * PHASE 3.2 — Frontend Dashboard Service Refactor
 * Previously: downloaded all raw orders/products/users/payments and aggregated in the browser.
 * Now: calls a single backend endpoint (DashboardController in order-service) that returns
 *      all pre-computed stats in one response. Much faster and correct.
 */
export const dashboardService = {
  getStats: async () => {
    const { data } = await apiClient.get('/api/orders/dashboard/stats');
    return data;
  },
};


export const healthService = {
  checkService: async (name, url) => {
    const start = Date.now();
    try {
      await apiClient.get(url, { timeout: 5000 });
      return { name, status: "UP", responseTime: Date.now() - start };
    } catch {
      return { name, status: "DOWN", responseTime: Date.now() - start };
    }
  },
  checkAll: async () => {
    const services = [
      { name: "API Gateway", url: "/api/products" },
      { name: "Auth Service", url: "/api/auth/users" },
      { name: "Product Service", url: "/api/products" },
      { name: "Order Service", url: "/api/orders" },
      { name: "Payment Service", url: "/api/payments" },
      { name: "Inventory Service", url: "/api/inventory" },
      { name: "Notification Service", url: "/api/notifications" },
    ];
    return Promise.all(services.map((s) => healthService.checkService(s.name, s.url)));
  },
};
