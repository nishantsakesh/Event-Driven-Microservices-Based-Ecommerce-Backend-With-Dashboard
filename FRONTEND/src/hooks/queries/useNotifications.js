import { useQuery } from "@tanstack/react-query";

import notificationService from "@/api/services/notification.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useNotifications() {
    return useQuery({
        queryKey: QUERY_KEYS.NOTIFICATIONS,

        queryFn: async () => {
            const { data } = await notificationService.getAll();
            return data;
        },
    });
}