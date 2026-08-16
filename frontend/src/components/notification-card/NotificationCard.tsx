import classes from "./NotificationCard.module.css";

import type { Notification } from "../../models/Notification";
import { Button } from "../button/Button";
import { notificationService } from "../../services/notificationService";


type NotificationCardProps = {
    notification: Notification,
    onDelete?: (notificationId: string) => void
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
            <Button
                onClick={() => props.onDelete && props.onDelete(props.notification.id)}
            >
                Apagar
            </Button>
        </div>
    );
}