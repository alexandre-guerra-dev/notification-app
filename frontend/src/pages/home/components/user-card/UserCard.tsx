import { Button } from "../../../../components/button/Button";
import type { User } from "../../../../models/User";


type UserCardProps = {
    user: User
};

export function UserCard(props: UserCardProps) {
    return (
        <div>
            <p>{props.user.email}</p>
            <small>{props.user.id}</small>
            <Button>Notificar</Button>
        </div>
    );
}