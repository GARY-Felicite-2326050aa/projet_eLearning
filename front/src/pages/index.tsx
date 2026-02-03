import {useAuthStore} from "../features/auth/store/auth.sotre";

export default function Page() {
    const user = useAuthStore((state) => state.user);

    if (!user) return <p>Non connecté</p>;

    return(
        <h1>

            <p>{user.email}</p>
            <p>{user.roles.join(", ")}</p>
        </h1>
    )
}