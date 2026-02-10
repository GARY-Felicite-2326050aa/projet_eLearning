import api from "../../../shared/lib/axios";
import type {QuestionCollection} from "./question.dto";
import type {Question} from "../type/Question";


export const getQuestions = async (): Promise<QuestionCollection> => {
    const response = await api.get<QuestionCollection>("/api/questions");
    return response.data;
};

export const getQuestion = async (id: number): Promise<Question> => {
    const response = await api.get<Question>(`/api/questions/${id}`);
    return response.data;
};

export const createQuestion = async (
    data: Omit<Question, "id">
): Promise<Question> => {
    const response = await api.post<Question>("/api/questions", data);
    return response.data;
};

export const updateQuestion = async (
    id: number,
    data: Partial<Omit<Question, "id">>
): Promise<Question> => {
    const response = await api.patch<Question>(
        `/api/questions/${id}`,
        data,
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            },
        }
    );
    return response.data;
};

export const deleteQuestion = async (id: number): Promise<void> => {
    await api.delete(`/api/questions/${id}`);
};