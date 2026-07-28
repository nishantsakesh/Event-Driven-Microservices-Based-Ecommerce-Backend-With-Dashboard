import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  productService,
  categoryService,
  orderService,
  paymentService,
  inventoryService,
  notificationService,
  userService,
  dashboardService,
} from "@/api/services";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { toast } from "sonner";

// ─── Queries ─────────────────────────────────────────────

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
      const { data } = await categoryService.getAll();
      return data;
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS,
    queryFn: async () => {
      const { data } = await orderService.getAll();
      return data;
    },
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: [...QUERY_KEYS.ORDER, id],
    queryFn: async () => {
      const { data } = await orderService.getById(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useUserOrders(userId) {
  return useQuery({
    queryKey: [...QUERY_KEYS.USER_ORDERS, userId],
    queryFn: async () => {
      const { data } = await orderService.getByUser(userId);
      return data;
    },
    enabled: !!userId,
  });
}

export function usePayments() {
  return useQuery({
    queryKey: QUERY_KEYS.PAYMENTS,
    queryFn: async () => {
      const { data } = await paymentService.getAll();
      return data;
    },
  });
}

export function useInventory() {
  return useQuery({
    queryKey: QUERY_KEYS.INVENTORY,
    queryFn: async () => {
      const { data } = await inventoryService.getAll();
      return data;
    },
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.NOTIFICATIONS,
    queryFn: async () => {
      const { data } = await notificationService.getAll();
      return data;
    },
  });
}

export function useUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: async () => {
      const { data } = await userService.getAll();
      return data;
    },
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: () => dashboardService.getStats(),
    staleTime: 1000 * 60 * 2,
  });
}

// ─── Mutations ───────────────────────────────────────────

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => productService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      toast.success("Product created!");
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
      toast.success("Product updated!");
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
      toast.success("Product deleted");
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
      toast.success("Order cancelled");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to cancel order"),
  });
}
