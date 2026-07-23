import apiClient from "@/lib/axios";

class BaseService {
    constructor(resource) {
        this.resource = resource;
    }

    getAll(params = {}) {
        return apiClient.get(this.resource, { params });
    }

    getById(id) {
        return apiClient.get(`${this.resource}/${id}`);
    }

    create(data) {
        return apiClient.post(this.resource, data);
    }

    update(id, data) {
        return apiClient.put(`${this.resource}/${id}`, data);
    }

    patch(id, data) {
        return apiClient.patch(`${this.resource}/${id}`, data);
    }

    delete(id) {
        return apiClient.delete(`${this.resource}/${id}`);
    }
}

export default BaseService;