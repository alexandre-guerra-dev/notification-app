import { Home } from "../../pages/home/Home";
import { Login } from "../../pages/login/Login";
import { Register } from "../../pages/register/Register";
import type { Route } from "./Route";

export const routes: Route[] = [
    { path: "login", page: Login },
    { path: "register", page: Register },
    { path: "home", page: Home },
];