import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { navigate } from "../../utils/router/Router";
import classes from "./Register.module.css";

export function Register() {

    function navigateToLogin() {
        navigate("login");
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        navigate("home");
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
                    error="deu ruim"
                />

                <Input
                    type={"password"}
                    title="Senha"
                    placeholder="********"
                    isValid={false}
                    error="deu ruim"
                />

                <Input
                    type={"password"}
                    title="Confirmar Senha"
                    placeholder="********"
                    isValid={false}
                    error="deu ruim"
                />

                <Button type={"submit"}> Registrar-se </Button>

                <p> Já possuí uma conta? <b onClick={navigateToLogin}>entrar.</b></p>
            </form>
        </main>
    );
}