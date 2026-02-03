export interface Course {
    id: number;
    title: string;
    description: string;
    quizzes: string[];
}

export interface Quiz {
    id: number;
    title: string;
    questions: Question[];
}

export interface Question {
    id: number;
    content: string;
    answers: Answer[];
}

export interface Answer {
    id: number;
    content: string;
    isCorrect?: boolean;
}