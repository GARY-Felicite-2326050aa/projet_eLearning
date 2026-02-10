import api from "../../../shared/lib/axios";
import type {AnswerCollection} from "./answer.type";
import type {Answer} from "../type/Answer";

export const getAnswers = async (): Promise<AnswerCollection> => {
    const response = await api.get<AnswerCollection>("/api/answers");
    return response.data;
};

export const getAnswer = async (id: number): Promise<Answer> => {
    const response = await api.get<Answer>(`/api/answers/${id}`);
    return response.data;
};

export const createAnswer = async (
    data: Omit<Answer, "id">
): Promise<Answer> => {
    const response = await api.post<Answer>("/api/answers", data);
    return response.data;
};

export const updateAnswer = async (
    id: number,
    data: Partial<Omit<Answer, "id">>
): Promise<Answer> => {
    const response = await api.patch<Answer>(
        `/api/answers/${id}`,
        data,
        {
            headers: { "Content-Type": "application/merge-patch+json" },
        }
    );
    return response.data;
};

export const deleteAnswer = async (id: number): Promise<void> => {
    await api.delete(`/api/answers/${id}`);
};