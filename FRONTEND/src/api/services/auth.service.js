import apiClient from "@/lib/axios";
import { API } from "@/constants/api";

class AuthService {
    login(credentials) {
        return apiClient.post(`${API.AUTH}/login`, credentials);
    }

    register(data) {
        return apiClient.post(`${API.AUTH}/register`, data);
    }

    refresh(refreshToken) {
        return apiClient.post(`${API.AUTH}/refresh`, {
            refreshToken,
        });
    }

    logout() {
        return apiClient.post(`${API.AUTH}/logout`);
    }

    me() {
        return apiClient.get(`${API.AUTH}/me`);
    }
}

export default new AuthService();