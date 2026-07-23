import { useQuery } from "@tanstack/react-query";

import profileService from "@/api/services/profile.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useProfile() {
    return useQuery({
        queryKey: QUERY_KEYS.USER,

        queryFn: async () => {
            const { data } = await profileService.getById("me");
            return data;
        },
    });
}