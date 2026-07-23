import BaseService from "./base.service";
import { API } from "@/constants/api";

class PaymentService extends BaseService {
    constructor() {
        super(API.PAYMENTS);
    }
}

export default new PaymentService();