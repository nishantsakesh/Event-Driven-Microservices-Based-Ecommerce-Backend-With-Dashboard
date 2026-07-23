import BaseService from "./base.service";
import { API } from "@/constants/api";

class OrderService extends BaseService {
    constructor() {
        super(API.ORDERS);
    }

    placeOrder(data) {
        return this.create(data);
    }
}

export default new OrderService();