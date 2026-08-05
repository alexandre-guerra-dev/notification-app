import { useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { Modal } from "../modal/Modal";
import classes from "./Navbar.module.css";
import { notificationService } from "../../services/notificationService";
import type { Notification } from "../../models/Notification";
import { NotificationCard } from "../notification-card/NotificationCard";
import { NotificationsMenu } from "../notifications-menu/NotificationsMenu";

export function Navbar() {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const result = await notificationService.getAllMy();
                
                if (result)
                    setNotifications(result);
            } catch (error) {
                // alert(error);
            }
        })()

        return authService.authenticatedUserChanged.subscribe(() => {
            setIsAuthenticated(authService.isAuthenticated());
        });
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