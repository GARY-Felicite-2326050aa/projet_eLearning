export interface Video {
    id: number;
    title: string;
    urlPath: string; // Doit matcher ton API PHP
}

export interface DocumentResource { 
    id: number;
    title: string;
    filePath: string; // Doit matcher ton API PHP
}

export interface Course {
    id: number;
    title: string;
    description: string;
    quizzes: string[]; 
    documents: DocumentResource[]; // Pluriel
    videos: Video[]; // Pluriel
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

