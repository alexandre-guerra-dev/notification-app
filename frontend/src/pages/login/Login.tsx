import type React from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { navigate } from "../../utils/router/Router";
import classes from "./Login.module.css";
import { authService } from "../../services/authService";
import { useState } from "react";
import type { LoginRequestDto } from "../../dtos/auth/LoginRequestDto";

export function Login() {

    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState<LoginRequestDto>({
        email: "",
        password: ""
    });

    function navigateToRegister() {
        navigate("register");
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        (async () => {
            try {
                setIsLoading(true);
                await authService.login(form);
                navigate("home");
            } catch (error) {
                alert(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }

    return (
        <main className={classes.container}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <Input
                    type={"email"}
                    title="Email"
                    placeholder="exemplo@email.com"
                    isValid={false}
                    error="deu ruim"
                    onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
                />

                <Input
                    type={"password"}
                    title="Senha"
                    placeholder="********"
                    isValid={false}
                    error="deu ruim"
                    onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                />

                <Button
                    type={"submit"}
                    disabled={isLoading}
                >
                    Entrar
                </Button>

                <p> Ainda não possuí uma conta? <b onClick={navigateToRegister}>registrar-se.</b></p>
            </form>
        </main>
    );
}