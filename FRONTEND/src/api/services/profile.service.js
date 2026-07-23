import BaseService from "./base.service";
import { API } from "@/constants/api";

class ProfileService extends BaseService {
    constructor() {
        super(API.USERS);
    }

    updateProfile(data) {
        return this.update("me", data);
    }
}

export default new ProfileService();