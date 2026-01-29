import type {LoginPayload, LoginResponse, RegisterPayload} from "./auth.type";
import api from "../../../shared/lib/axios";

export const register = async (data: RegisterPayload) => {
    await api.post("/api/register", data);
};

export const login = async (
    data: LoginPayload
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/api/login", data);
    return response.data;
};