export function responseInterceptor(response) {
    return response;
}

export function responseErrorInterceptor(error) {
    if (error.response?.status === 401) {
        console.warn("Unauthorized. Redirecting to login...");
    }

    return Promise.reject(error);
}