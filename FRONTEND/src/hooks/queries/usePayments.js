import { useQuery } from "@tanstack/react-query";

import paymentService from "@/api/services/payment.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function usePayments() {
    return useQuery({
        queryKey: QUERY_KEYS.PAYMENTS,

        queryFn: async () => {
            const { data } = await paymentService.getAll();
            return data;
        },
    });
}