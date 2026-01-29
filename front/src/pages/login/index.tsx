import styles from "./page.module.css";
import AuthCard from "../../features/auth/components/Form/Form";

export default function LoginPage() {
    return (
        <AuthCard
            title="Welcome back"
            subtitle="Log in to your account"
            submitLabel="Sign in"
        >
            <div className={styles.field}>
                <label>Email</label>
                <input type="email" placeholder="you@company.com" />
            </div>

            <div className={styles.field}>
                <label>Password</label>
                <input type="password" placeholder="••••••••" />
            </div>
        </AuthCard>
    );
}