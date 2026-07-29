import type React from "react";

import classes from "./Input.module.css";
import { useId } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    title: string
    isValid: boolean
    error?: string
};

export function Input(props: InputProps) {

    const id = useId();

    return (
        <div className={classes.formField}>
            <label htmlFor={id}>{props.title}</label>
            <input
                id={id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
            <small>{props.error}</small>
        </div>
    );
}