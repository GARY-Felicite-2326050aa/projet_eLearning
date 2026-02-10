import type {Question} from "../type/Question";


export type QuestionCollection = {
    "@context"?: string;
    "@id"?: string;
    "@type"?: "Collection";
    totalItems: number;
    member: Question[];
};