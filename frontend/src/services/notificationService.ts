import type { SendNotificationRequestDto } from "../dtos/notifications/SendNotificationRequestDto";
import { apiService } from "./apiService";

class NotificationService {
    constructor() { }

    async getAllMy() {
        return await apiService.fetch<Notification[]>("GET", "notifications/my");
    }

    async send(request: SendNotificationRequestDto) {
        await apiService.fetch<Notification>("POST", "notifications/send", request);
    }
}

export const notificationService = new NotificationService();