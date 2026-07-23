import BaseService from "./base.service";
import { API } from "@/constants/api";

class ProductService extends BaseService {
    constructor() {
        super(API.PRODUCTS);
    }

    search(keyword) {
        return this.getAll({
            search: keyword,
        });
    }

    getByCategory(categoryId) {
        return this.getAll({
            categoryId,
        });
    }
}

export default new ProductService();