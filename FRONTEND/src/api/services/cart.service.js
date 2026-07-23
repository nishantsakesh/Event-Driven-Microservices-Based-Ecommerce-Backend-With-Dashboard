import apiClient from "@/lib/axios";
import BaseService from "./base.service";
import { API } from "@/constants/api";

class CartService extends BaseService {
    constructor() {
        super(API.CART);
    }

    addItem(data) {
        return this.create(data);
    }

    removeItem(id) {
        return this.delete(id);
    }

    clearCart() {
        return apiClient.delete(`${this.resource}/clear`);
    }
}

export default new CartService();