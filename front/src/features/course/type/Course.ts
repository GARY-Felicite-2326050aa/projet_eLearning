export interface Course {
    id: number;
    title: string;
    description: string;
    quizzes: string[];
    document:string[];
    video:string[];
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

export interface VideoResource {
    id: number;
    title: string;
    description: string;
    url: string; 
    course: Course; 
}

export interface DocumentResource {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    course: Course; 
}