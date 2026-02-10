import type {Answer} from "../type/Answer";

export type AnswerCollection = {
    "@context": string;
    "@id": string;
    "@type": "Collection";
    totalItems: number;
    member: Answer[];
};