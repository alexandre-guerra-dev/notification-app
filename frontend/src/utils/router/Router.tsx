import React, { useEffect, useState } from "react";
import { routes } from "./routes";
import type { Route } from "./Route";

let setPageCallback: React.Dispatch<React.SetStateAction<Route>> | null = null;

export function navigate(path: string) {
    const route = routes.find(r => r.path === path);

    if (!route)
        throw new Error(`Path "${path}" is not listed.`);

    setPageCallback && setPageCallback(route);
}

export function Router() {
    const [currentRoute, setCurrentRoute] = useState(routes[0]);

    useEffect(() => {
        setPageCallback = setCurrentRoute;

        return () => { setPageCallback = null }
    }, []);

    return (
        <>
            {currentRoute.page()}
        </>
    );
}