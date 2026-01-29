import styles from "./Header.module.css"
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                <Link to={"/"}>
                    🎓 EduLearn
                </Link>
            </div>
            <div>
                <Link to="/register">
                    Register
                </Link>
                <Link to="/login" className={styles.active}>
                    Login
                </Link>
            </div>
        </header>
    )
}