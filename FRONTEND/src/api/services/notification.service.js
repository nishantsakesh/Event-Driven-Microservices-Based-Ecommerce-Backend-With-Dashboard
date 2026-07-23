import BaseService from "./base.service";
import { API } from "@/constants/api";

class NotificationService extends BaseService {
    constructor() {
        super(API.NOTIFICATIONS);
    }

    markAsRead(id) {
        return this.patch(id, {
            read: true,
        });
    }
}

export default new NotificationService();