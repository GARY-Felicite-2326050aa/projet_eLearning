import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {Answer} from "../type/Answer";

type AnswerState = {
    answers: Answer[];
    setAnswers: (answers: Answer[]) => void;
    addAnswer: (answer: Answer) => void;
    updateAnswer: (answer: Answer) => void;
    removeAnswer: (id: number) => void;
};

export const useAnswerStore = create<AnswerState>()(
    persist(
        (set) => ({
            answers: [],

            setAnswers: (answers) => set({ answers }),

            addAnswer: (answer) =>
                set((state) => ({
                    answers: [...state.answers, answer],
                })),

            updateAnswer: (updated) =>
                set((state) => ({
                    answers: state.answers.map((a) =>
                        a.id === updated.id ? updated : a
                    ),
                })),

            removeAnswer: (id) =>
                set((state) => ({
                    answers: state.answers.filter((a) => a.id !== id),
                })),
        }),
        {
            name: "answer-storage",
        }
    )
);