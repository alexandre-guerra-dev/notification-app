import { useEffect, useState } from "react";
import type { User } from "../../models/User";
import { UserCard } from "./components/user-card/UserCard";
import classes from "./Home.module.css";
import { authService } from "../../services/authService";

export function Home() {

    const user = authService.authenticatedUser!;

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        (async () => {
            const users = await authService.getAll();
            console.log(users);
            
            if (users)
                setUsers(users);
        })()
    }, []);

    return (
        <main className={classes.container}>
            <h1>Bem vindo, {user.email}</h1>

            {users.map(u => {
                return <UserCard
                    key={u.id}
                    user={u}
                />
            })}
        </main>
    );
}