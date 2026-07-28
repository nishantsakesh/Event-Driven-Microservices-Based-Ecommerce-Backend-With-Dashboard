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

export const userService = {
  getAll: () => apiClient.get(API.USERS),
  getById: (id) => apiClient.get(`${API.USERS}/${id}`),
};

export const dashboardService = {
  getStats: async () => {
    const [orders, products, payments, users] = await Promise.allSettled([
      apiClient.get(API.ORDERS),
      apiClient.get(API.PRODUCTS),
      apiClient.get(API.PAYMENTS),
      apiClient.get(API.USERS),
    ]);
    const ordersList = orders.status === "fulfilled" ? (orders.value.data || []) : [];
    const productsList = products.status === "fulfilled" ? (products.value.data || []) : [];
    const paymentsList = payments.status === "fulfilled" ? (payments.value.data || []) : [];
    const usersList = users.status === "fulfilled" ? (users.value.data || []) : [];

    // Calculate revenue by date
    const revMap = {};
    ordersList.forEach(o => {
      if (o.status !== 'CANCELLED' && o.createdAt) {
        const dateStr = String(o.createdAt).split('T')[0];
        revMap[dateStr] = (revMap[dateStr] || 0) + (o.totalAmount || 0);
      }
    });
    const revenueByDate = Object.entries(revMap).map(([date, revenue]) => ({ date, revenue }));

    // Calculate order status distribution
    const statusMap = {};
    ordersList.forEach(o => {
      const st = o.status || 'CREATED';
      statusMap[st] = (statusMap[st] || 0) + 1;
    });
    const orderStatusDistribution = Object.entries(statusMap).map(([status, count]) => ({ status, count }));

    // Calculate payment method distribution
    const methodMap = {};
    paymentsList.forEach(p => {
      const method = p.paymentMethod ? p.paymentMethod.replace(/_/g, ' ') : 'Card';
      methodMap[method] = (methodMap[method] || 0) + 1;
    });
    const paymentMethodData = Object.entries(methodMap).map(([name, value]) => ({ name, value }));

    // Calculate top performing products
    const prodSalesMap = {};
    ordersList.forEach(o => {
      if (o.status !== 'CANCELLED' && Array.isArray(o.items)) {
        o.items.forEach(item => {
          const pName = item.productName || `Product #${item.productId}`;
          if (!prodSalesMap[pName]) {
            prodSalesMap[pName] = { id: item.productId, name: pName, sales: 0, revenue: 0 };
          }
          prodSalesMap[pName].sales += item.quantity || 0;
          prodSalesMap[pName].revenue += (item.unitPrice || item.price || 0) * (item.quantity || 0);
        });
      }
    });
    const topProducts = Object.values(prodSalesMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    return {
      totalOrders: ordersList.length,
      totalRevenue: ordersList.reduce((sum, o) => o.status !== 'CANCELLED' ? sum + (o.totalAmount || 0) : sum, 0),
      totalProducts: productsList.length,
      totalUsers: usersList.length,
      orders: ordersList,
      payments: paymentsList,
      products: productsList,
      users: usersList,
      revenueByDate,
      orderStatusDistribution,
      paymentMethodData,
      topProducts,
    };
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
