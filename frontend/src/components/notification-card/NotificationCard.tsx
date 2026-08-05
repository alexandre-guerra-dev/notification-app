import classes from "./NotificationCard.module.css";

import type { Notification } from "../../models/Notification";


type NotificationCardProps = {
    notification: Notification
};

export function NotificationCard(props: NotificationCardProps) {
    return (
        <div 
            className={classes.notificationCard}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <h1>{props.notification.content}</h1>
            <small>Enviada por: {props.notification.senderId}</small>
            <small>{props.notification.viewed ? "Visualizado" : "Não visualizado"}</small>
        </div>
    );
}