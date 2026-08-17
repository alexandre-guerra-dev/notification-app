import { Button } from "../../../../components/button/Button";
import type { SendNotificationRequestDto } from "../../../../dtos/notifications/SendNotificationRequestDto";
import type { User } from "../../../../models/User";
import { notificationService } from "../../../../services/notificationService";
import classes from "./UserCard.module.css";

type UserCardProps = {
    user: User
};

export function UserCard(props: UserCardProps) {

    function sendNotification() {
        try {
            const request: SendNotificationRequestDto = {
                content: "Notificação"
            }
            notificationService.send(props.user.id, request);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className={classes.userCard}>
            <h1>{props.user.email}</h1>
            <hr />
            <small>{props.user.id}</small>
            <Button onClick={sendNotification}>
                <img className={classes.icon} src="aviao-de-papel.svg" alt="" />
                Enviar notificação
            </Button>
        </div>
    );
}