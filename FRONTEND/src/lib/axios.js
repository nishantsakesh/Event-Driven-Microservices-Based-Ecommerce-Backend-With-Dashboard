import axios from "axios";

import appConfig from "@/config/app.config";

import {
    requestInterceptor,
    requestErrorInterceptor,
} from "@/api/interceptors/requestInterceptor";

import {
    responseInterceptor,
    responseErrorInterceptor,
} from "@/api/interceptors/responseInterceptor";

const apiClient = axios.create({
    baseURL: appConfig.api.baseURL,
    timeout: appConfig.api.timeout,

    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    requestInterceptor,
    requestErrorInterceptor
);

apiClient.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor
);

export default apiClient;