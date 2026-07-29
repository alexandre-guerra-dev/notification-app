import type { User } from "../../models/User";
import { UserCard } from "./components/user-card/UserCard";
import classes from "./Home.module.css";

export function Home() {

    const users: User[] = [
        {id: "1", email: "ale@email.com"},
        {id: "2", email: "jao@email.com"},
    ];

    return (
        <main className={classes.container}>
            <h1>Bem vindo, {users[0].email}</h1>

            {users.map(u => {
                return <UserCard
                    key={u.id}
                    user={u}
                />
            })}
        </main>
    );
}