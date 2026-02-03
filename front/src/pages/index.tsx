import HomeTeacher from "../features/teacher/components/HomeTeacher";
import HomeStudent from "../features/student/components/HomeStudent";
import {useAuthStore} from "../features/auth/store/auth.sotre";

export default function Page() {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <p>Non connecté</p>;
    }

    if (user.roles.includes("ROLE_PROF")) {
        return <HomeTeacher />;
    }

    if (user.roles.includes("ROLE_USER")) {
        return <HomeStudent />;
    }

    return <p>Rôle inconnu</p>;
}