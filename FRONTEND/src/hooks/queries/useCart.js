import { useQuery } from "@tanstack/react-query";

import cartService from "@/api/services/cart.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useCart() {
    return useQuery({
        queryKey: QUERY_KEYS.CART,

        queryFn: async () => {
            const { data } = await cartService.getAll();
            return data;
        },
    });
}