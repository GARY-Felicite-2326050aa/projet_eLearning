export type Question = {
    id: number;
    content: string;
    quiz: string;        // IRI ex: "/api/quizzes/2"
    answers: string[];  // IRIs ex: ["/api/answers/1", ...]
};