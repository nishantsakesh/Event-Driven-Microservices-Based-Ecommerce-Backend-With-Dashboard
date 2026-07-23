import BaseService from "./base.service";
import { API } from "@/constants/api";

class DashboardService extends BaseService {
    constructor() {
        super(API.DASHBOARD);
    }
}

export default new DashboardService();