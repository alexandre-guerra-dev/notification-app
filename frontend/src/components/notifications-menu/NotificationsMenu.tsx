import { useEffect } from "react";
import type { Notification } from "../../models/Notification";
import { NotificationCard } from "../notification-card/NotificationCard";
import classes from "./NotificationsMenu.module.css";

type NotificationsMenuProps = {
    notifications: Notification[],
    onDelete?: (notificationId: string) => void
}

export function NotificationsMenu(props: NotificationsMenuProps) {
    if (props.notifications.length <= 0)
        return (
            <section className={classes.notificationsMenu}>
                <p>Nenhuma notificação recebida...</p>
            </section>
        );

    return (
        <section className={classes.notificationsMenu}>
            {props.notifications.map((n) =>
                <NotificationCard
                    key={n.id}
                    notification={n}
                    onDelete={props.onDelete}
                />)}
        </section>
    );
}