import {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} from "../api/question.api";

export const useQuestion = () => {
    return {
        getQuestions,
        getQuestion,
        createQuestion,
        updateQuestion,
        deleteQuestion,
    };
};