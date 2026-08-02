import { Button } from "../../../../components/button/Button";
import type { SendNotificationRequestDto } from "../../../../dtos/notifications/SendNotificationRequestDto";
import type { User } from "../../../../models/User";
import { notificationService } from "../../../../services/notificationService";


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
        <div>
            <p>{props.user.email}</p>
            <small>{props.user.id}</small>
            <Button onClick={sendNotification}>Notificar</Button>
        </div>
    );
}