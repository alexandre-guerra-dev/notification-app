import type { SendNotificationRequestDto } from "../dtos/notifications/SendNotificationRequestDto";
import { apiService } from "./apiService";

class NotificationService {
    constructor() { }

    async getAllMy() {
        return await apiService.fetch<Notification[]>("GET", "notifications/my");
    }

    async send(userId: string, request: SendNotificationRequestDto) {
        await apiService.fetch<Notification>("POST", `notifications/send/${userId}`, request);
    }
}

export const notificationService = new NotificationService();