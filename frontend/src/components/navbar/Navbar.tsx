import { useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { Modal } from "../modal/Modal";
import classes from "./Navbar.module.css";
import { notificationService } from "../../services/notificationService";
import type { Notification } from "../../models/Notification";
import { NotificationsMenu } from "../notifications-menu/NotificationsMenu";
import { apiService } from "../../services/apiService";
import type { ViewNotificationsRequestDto } from "../../dtos/notifications/ViewNotificationsRequestDto";

export function Navbar() {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        let removeEventCallback: (() => void) | null = null;
        let unsubscribeAuthenticatedUserChangedCallback: (() => void) | null = null;
        
        const unsubCallback = unsubscribeAuthenticatedUserChangedCallback = authService.authenticatedUserChanged.subscribe(async (user) => {
            if (removeEventCallback)
                removeEventCallback();
            
            if (!user) {
                setIsAuthenticated(false);
                return;
            }

            setIsAuthenticated(true);

            try {
                const result = await notificationService.getAllMy();
                
                setNotifications(result ?? []);

            } catch (error) {

            }

            const sseConsumer = await apiService.sse("notifications/my/sync");
            const onMessage = (n: Notification) => setNotifications(prev => [...prev, n]);

            sseConsumer.addEventListener<Notification>("NotificationReceived", onMessage);
            removeEventCallback =
                () => sseConsumer.removeEventListener("NotificationReceived", onMessage);
        });

        return () => {
            unsubCallback();

            if (unsubscribeAuthenticatedUserChangedCallback)
                unsubscribeAuthenticatedUserChangedCallback();

            if (removeEventCallback)
                removeEventCallback();
        };
    }, []);

    async function handleOpenNotificationsMenu() {

        const unviewedNotifications = notifications.filter(n => !n.viewed);

        if (unviewedNotifications.length <= 0)
            return;

        const rollbackNotifications = notifications;

        try {
            const request: ViewNotificationsRequestDto = {
                notificationsId: unviewedNotifications.map(n => n.id)
            };

            setNotifications(prev => {
                prev.forEach(n => n.viewed = true);
                return prev;
            });

            await notificationService.view(request);
        } catch (error) {
            setNotifications(rollbackNotifications);
        }
    }

    async function handleDeleteButtonClick(notificationId: string) {

        const rollbackNotifications = notifications;

        try {
            setNotifications(prev => prev.filter(n => n.id !== notificationId));
            await notificationService.delete(notificationId);
        } catch (error) {
            setNotifications(rollbackNotifications);
        }
    }

    if (!isAuthenticated)
        return;

    return (
        <>
            <nav className={classes.navbar}>
                <h1>Real-Time Notification App</h1>
                <button
                    className={classes.notsIcon}
                    onClick={() => {
                        handleOpenNotificationsMenu()
                        setModalOpen(true)
                    }}
                >
                    <img src="sino.svg" alt="" />
                    {
                        notifications.filter(n => !n.viewed).length > 0 &&
                        <span>
                            {notifications.filter(n => !n.viewed).length}
                        </span>
                    }
                </button>
            </nav>

            <Modal
                isVisible={isModalOpen}
                onClick={() => setModalOpen(false)}
            >
                <NotificationsMenu
                    notifications={notifications}
                    onDelete={handleDeleteButtonClick}
                />
            </Modal>
        </>
    );
}