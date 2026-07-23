import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,

            refetchOnWindowFocus: false,

            refetchOnReconnect: true,

            staleTime: 1000 * 60 * 5,

            gcTime: 1000 * 60 * 10,
        },

        mutations: {
            retry: 0,
        },
    },
});

export default queryClient;