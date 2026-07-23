import { useQuery } from "@tanstack/react-query";

import productService from "@/api/services/product.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useProducts(params = {}) {
    return useQuery({
        queryKey: [...QUERY_KEYS.PRODUCTS, params],

        queryFn: async () => {
            const { data } = await productService.getAll(params);
            return data;
        },
    });
}

export function useProduct(id) {
    return useQuery({
        queryKey: [...QUERY_KEYS.PRODUCT, id],

        queryFn: async () => {
            const { data } = await productService.getById(id);
            return data;
        },

        enabled: !!id,
    });
}