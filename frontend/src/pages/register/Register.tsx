import { useState } from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { authService } from "../../services/authService";
import { navigate } from "../../utils/router/Router";
import classes from "./Register.module.css";
import type { RegisterRequestDto } from "../../dtos/auth/RegisterRequestDto";

export function Register() {

    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState<RegisterRequestDto>({
        email: "",
        password: ""
    });

    function navigateToLogin() {
        navigate("login");
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setIsLoading(true);

            await authService.register(form);

            navigateToLogin();
        } catch (error) {
            alert(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <main className={classes.container}>
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>

                <Input
                    type={"email"}
                    title="Email"
                    placeholder="exemplo@email.com"
                    isValid={false}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                />

                <Input
                    type={"password"}
                    title="Senha"
                    placeholder="********"
                    isValid={false}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                />

                <Input
                    type={"password"}
                    title="Confirmar Senha"
                    placeholder="********"
                    isValid={false}
                />

                <Button
                    type={"submit"}
                    disabled={isLoading}
                >
                    Registrar-se
                </Button>

                <p> Já possuí uma conta? <b onClick={navigateToLogin}>entrar.</b></p>
            </form>
        </main>
    );
}