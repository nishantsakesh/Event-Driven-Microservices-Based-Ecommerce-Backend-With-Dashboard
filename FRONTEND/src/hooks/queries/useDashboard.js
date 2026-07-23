import { useQuery } from "@tanstack/react-query";

import dashboardService from "@/api/services/dashboard.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useDashboard() {
    return useQuery({
        queryKey: QUERY_KEYS.DASHBOARD,

        queryFn: async () => {
            const { data } = await dashboardService.getAll();
            return data;
        },
    });
}