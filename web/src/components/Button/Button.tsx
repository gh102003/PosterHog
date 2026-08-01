import styles from "./Button.module.css";
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    type: "primary" | "secondary";
    active?: boolean;
}

function Button({ children, onClick, type, active }: ButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.button} ${styles[type]} ${active && styles.active}`}>
            {children}
        </button>
    );
}

export default Button;