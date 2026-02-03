import { useState } from "react";
import styles from "./page.module.css";
import {useAuth} from "../../features/auth/hooks/useAuth";
import AuthCard from "../../features/auth/components/AuthCard";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../features/auth/store/auth.sotre";

export default function LoginPage() {
    const setUser = useAuthStore((state) => state.setUser);
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await login({ email, password });
            setUser(user);
            navigate("/");
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <AuthCard
            title="Welcome back"
            subtitle="Log in to your account"
            submitLabel="Sign in"
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className={styles.field}>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
        </AuthCard>
    );
}