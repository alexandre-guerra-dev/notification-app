import type React from "react";

import classes from "./Button.module.css";

type ButtonProps =
    React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.PropsWithChildren &
    {
        
    };

export function Button(props: ButtonProps) {
    return (
        <button
            className={classes.button}
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}