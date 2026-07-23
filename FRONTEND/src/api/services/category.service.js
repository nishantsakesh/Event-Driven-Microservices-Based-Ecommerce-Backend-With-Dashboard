import BaseService from "./base.service";
import { API } from "@/constants/api";

class CategoryService extends BaseService {
    constructor() {
        super(API.CATEGORIES);
    }
}

export default new CategoryService();