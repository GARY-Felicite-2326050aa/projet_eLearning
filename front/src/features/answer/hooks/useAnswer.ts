import {
    getAnswers,
    getAnswer,
    createAnswer,
    updateAnswer,
    deleteAnswer,
} from "../api/answer.api";

export const useAnswer = () => {
    return {
        getAnswers,
        getAnswer,
        createAnswer,
        updateAnswer,
        deleteAnswer,
    };
};