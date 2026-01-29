import { login, register } from "../api/auth.api";

export const useAuth = () => {
    return {
        login,
        register,
    };
};