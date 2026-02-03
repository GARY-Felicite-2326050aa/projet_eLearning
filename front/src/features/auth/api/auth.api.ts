import type {LoginPayload, RegisterPayload} from "./auth.type";
import api from "../../../shared/lib/axios";
import type {User} from "../type/User";

export const register = async (data: RegisterPayload) => {
    await api.post("/api/register", data);
};


export const login = async (data: LoginPayload): Promise<User> => {
    const response = await api.post<User>("/api/login", data);
    return response.data;
};