import type { PropsWithChildren } from "react";
import classes from "./Modal.module.css";

type ModalProps = PropsWithChildren & {
    onClick?: () => void
    isVisible: boolean
};

export function Modal(props: ModalProps) {
    return (
        <div 
            className={`${classes.modal}${!props.isVisible ? ` ${classes.hidden}` : ""}`}
            onClick={(e) => {
                e.stopPropagation();
                props.onClick && props.onClick();
            }}
        >
            {props.children}
        </div>
    );
}