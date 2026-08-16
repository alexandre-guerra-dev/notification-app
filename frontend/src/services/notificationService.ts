import type { SendNotificationRequestDto } from "../dtos/notifications/SendNotificationRequestDto";
import type { ViewNotificationsRequestDto } from "../dtos/notifications/ViewNotificationsRequestDto";
import type { Notification } from "../models/Notification";
import { apiService } from "./apiService";

class NotificationService {

    constructor() { }

    async getAllMy() {
        return await apiService.fetch<Notification[]>("GET", "notifications/my");
    }

    async send(userId: string, request: SendNotificationRequestDto) {
        await apiService.fetch<Notification>("POST", `notifications/send/${userId}`, request);
    }

    async view(request: ViewNotificationsRequestDto) {
        return await apiService.fetch<Notification[]>("PUT", "notifications/view/bulk", request);
    }

    async delete(notificationId: string) {
        await apiService.fetch<undefined>("DELETE", `notifications/${notificationId}`);
    }
}

export const notificationService = new NotificationService();