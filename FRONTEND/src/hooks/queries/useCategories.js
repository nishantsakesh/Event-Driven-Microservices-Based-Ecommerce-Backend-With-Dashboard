import { useQuery } from "@tanstack/react-query";

import categoryService from "@/api/services/category.service";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useCategories() {
    return useQuery({
        queryKey: QUERY_KEYS.CATEGORIES,

        queryFn: async () => {
            const { data } = await categoryService.getAll();
            return data;
        },
    });
}