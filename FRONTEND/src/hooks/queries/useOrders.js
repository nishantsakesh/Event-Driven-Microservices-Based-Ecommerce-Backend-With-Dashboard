import { useQuery } from "@tanstack/react-query";

import orderService from "@/api/services/order.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useOrders(params = {}) {
    return useQuery({
        queryKey: [...QUERY_KEYS.ORDERS, params],

        queryFn: async () => {
            const { data } = await orderService.getAll(params);
            return data;
        },
    });
}