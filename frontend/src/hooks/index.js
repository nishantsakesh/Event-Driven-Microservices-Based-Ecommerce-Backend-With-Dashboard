import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  productService,
  categoryService,
  orderService,
  paymentService,
  inventoryService,
  notificationService,
  newsletterService,
  userService,
  dashboardService,
} from "@/api/services";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { toast } from "sonner";

export function useProducts(params) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCTS, params],
    queryFn: async () => {
      try {
        const { data } = await productService.getAll(params);
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: [...QUERY_KEYS.PRODUCT, id],
    queryFn: async () => {
      try {
        const { data } = await productService.getById(id);
        return data || null;
      } catch (err) {
        return null;
      }
    },
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: async () => {
      try {
        const { data } = await categoryService.getAll();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS,
    queryFn: async () => {
      try {
        const { data } = await orderService.getAll();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ORDER, id],
    queryFn: async () => {
      try {
        const { data } = await orderService.getById(id);
        return data || null;
      } catch (err) {
        return null;
      }
    },
    enabled: !!id,
  });
}

export function useUserOrders(userId) {
  return useQuery({
    queryKey: [...QUERY_KEYS.USER_ORDERS, userId],
    queryFn: async () => {
      try {
        const { data } = await orderService.getByUser(userId);
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
    enabled: !!userId,
  });
}

export function usePayments() {
  return useQuery({
    queryKey: QUERY_KEYS.PAYMENTS,
    queryFn: async () => {
      try {
        const { data } = await paymentService.getAll();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
  });
}

export function useInventory() {
  return useQuery({
    queryKey: QUERY_KEYS.INVENTORY,
    queryFn: async () => {
      try {
        const { data } = await inventoryService.getAll();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.NOTIFICATIONS,
    queryFn: async () => {
      try {
        const { data } = await notificationService.getAll();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
  });
}

export function useNewsletterSubscribers() {
  return useQuery({
    queryKey: QUERY_KEYS.SUBSCRIBERS,
    queryFn: async () => {
      try {
        const { data } = await newsletterService.getSubscribers();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
  });
}

export function useSubscribeNewsletter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email) => newsletterService.subscribe(email),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUBSCRIBERS });
      toast.success(response?.data?.message || "Subscribed to newsletter successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to subscribe to newsletter.");
    },
  });
}

export function useDeleteSubscriber() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => newsletterService.deleteSubscriber(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUBSCRIBERS });
      toast.success("Subscriber removed successfully.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove subscriber.");
    },
  });
}

export function useUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: async () => {
      try {
        const { data } = await userService.getAll();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        return [];
      }
    },
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: async () => {
      try {
        return await dashboardService.getStats();
      } catch (err) {
        return null;
      }
    },
    staleTime: 1000 * 30, // 30s stale time
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => productService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
      toast.success("Product created successfully!");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to create product"),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, ...rest }) => productService.update(id, data || rest),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
      toast.success("Product updated successfully!");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to update product"),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => productService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
      toast.success("Product deleted successfully!");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to delete product"),
  });
}

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => orderService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.USER_ORDERS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
      toast.success("Order placed successfully!");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to place order"),
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => orderService.cancel(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.USER_ORDERS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
      toast.success("Order cancelled");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to cancel order"),
  });
}

export function useMarkCodPaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => orderService.markCodAsPaid(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.USER_ORDERS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
      toast.success("Order marked as PAID");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to mark order as paid"),
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => orderService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.USER_ORDERS });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
      toast.success("Order status updated!");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to update status"),
  });
}
