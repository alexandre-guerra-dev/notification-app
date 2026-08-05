import type { Notification } from "../../models/Notification";
import { NotificationCard } from "../notification-card/NotificationCard";
import classes from "./NotificationsMenu.module.css";

type NotificationsMenuProps = {
    notifications: Notification[]
}

export function NotificationsMenu(props: NotificationsMenuProps) {
    return (
        <section className={classes.notificationsMenu}>
            {props.notifications.map((n) =>
                <NotificationCard
                    key={n.id}
                    notification={n}
                />)}
        </section>
    );
}