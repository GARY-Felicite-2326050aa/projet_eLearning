import styles from "../login/page.module.css";
import AuthCard from "../../features/auth/components/Form/Form";

export default function Page() {
    return (
        <AuthCard
            title="Create your account"
            subtitle="Get started in a few seconds"
            submitLabel="Sign up"
        >
            <div className={styles.field}>
                <label htmlFor="name">Full name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                />
            </div>
        </AuthCard>
    );
}