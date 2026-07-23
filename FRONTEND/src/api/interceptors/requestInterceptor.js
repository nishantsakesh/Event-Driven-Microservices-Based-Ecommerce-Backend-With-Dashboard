import { STORAGE } from "@/constants/storage";

export function requestInterceptor(config) {
    const token = localStorage.getItem(STORAGE.ACCESS_TOKEN);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}

export function requestErrorInterceptor(error) {
    return Promise.reject(error);
}