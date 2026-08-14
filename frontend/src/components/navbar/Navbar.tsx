import { useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { Modal } from "../modal/Modal";
import classes from "./Navbar.module.css";
import { notificationService } from "../../services/notificationService";
import type { Notification } from "../../models/Notification";
import { NotificationsMenu } from "../notifications-menu/NotificationsMenu";
import { apiService } from "../../services/apiService";

export function Navbar() {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        let removeEventCallback: (() => void) | null = null;

        (async () => {
            try {
                const result = await notificationService.getAllMy();

                if (result)
                    setNotifications(result);

                const sseConsumer = await apiService.sse("notifications/my/sync");
                const onMessage = (n: Notification) => setNotifications(prev => [...prev, n]);

                sseConsumer.addEventListener<Notification>("NotificationReceived", onMessage);
                removeEventCallback =
                    () => sseConsumer.removeEventListener("NotificationReceived", onMessage);
            } catch (error) {
                // alert(error);
            }
        })()

        const unsubCallback = authService.authenticatedUserChanged.subscribe(() => {
            setIsAuthenticated(authService.isAuthenticated());
        });

        return () => {
            unsubCallback();

            if (removeEventCallback)
                removeEventCallback();
        };
    }, []);

    return (
        <>
            <nav className={classes.navbar}>
                <h1>Notification App</h1>
                {isAuthenticated &&
                    <button
                        className={classes.notsIcon}
                        onClick={() => setModalOpen(true)}
                    >
                        N({notifications.length})
                    </button>
                }
            </nav>

            <Modal
                isVisible={isModalOpen}
                onClick={() => setModalOpen(false)}
            >
                <NotificationsMenu
                    notifications={notifications}
                />
            </Modal>
        </>
    );
}