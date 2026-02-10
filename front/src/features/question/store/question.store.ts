import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {Question} from "../type/Question";

type QuestionState = {
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
    addQuestion: (question: Question) => void;
    updateQuestion: (question: Question) => void;
    removeQuestion: (id: number) => void;
};

export const useQuestionStore = create<QuestionState>()(
    persist(
        (set) => ({
            questions: [],

            setQuestions: (questions) => set({ questions }),

            addQuestion: (question) =>
                set((state) => ({
                    questions: [...state.questions, question],
                })),

            updateQuestion: (updated) =>
                set((state) => ({
                    questions: state.questions.map((q) =>
                        q.id === updated.id ? updated : q
                    ),
                })),

            removeQuestion: (id) =>
                set((state) => ({
                    questions: state.questions.filter((q) => q.id !== id),
                })),
        }),
        {
            name: "question-storage",
        }
    )
);