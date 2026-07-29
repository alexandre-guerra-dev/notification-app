import type React from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { navigate } from "../../utils/router/Router";
import classes from "./Login.module.css";

export function Login() {

    function navigateToRegister() {
        navigate("register");
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        navigate("home");
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
                />

                <Input
                    type={"password"}
                    title="Senha"
                    placeholder="********"
                    isValid={false}
                    error="deu ruim"
                />

                <Button type={"submit"}> Entrar </Button>

                <p> Ainda não possuí uma conta? <b onClick={navigateToRegister}>registrar-se.</b></p>
            </form>
        </main>
    );
}