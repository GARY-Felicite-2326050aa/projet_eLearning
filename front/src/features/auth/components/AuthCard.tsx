"use client"
import type {ReactNode} from "react";
import styles from "./AuthCard.module.css";

interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    submitLabel: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthCard({
    title,
    subtitle,
    children,
    submitLabel,
    onSubmit,
}: AuthCardProps) {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                {/* Header */}
                <div className={styles.header}>
                    <h1>{title}</h1>
                    {subtitle && <p>{subtitle}</p>}
                </div>

                {/* Form */}
                <form
                    className={styles.form}
                    onSubmit={(e) => {
                        console.log("[AuthCard] form submit event triggered");
                        onSubmit(e);
                    }}
                >
                    {children}

                    <button type="submit" className={styles.submit}>
                        {submitLabel}
                    </button>
                </form>
            </div>
        </div>
    );
}