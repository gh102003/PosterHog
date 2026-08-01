import styles from "./Button.module.css";
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    type: "primary" | "secondary";
}

function Button({ children, onClick, type }: ButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.button} ${styles[type]}`}>
            {children}
        </button>
    );
}

export default Button;