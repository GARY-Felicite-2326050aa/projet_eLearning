import type {Document} from "../type/Document";
export type DocumentCollection = {
    "@context"?: string;
    "@id"?: string;
    "@type"?: "Collection";
    totalItems: number;
    member: Document[];
};