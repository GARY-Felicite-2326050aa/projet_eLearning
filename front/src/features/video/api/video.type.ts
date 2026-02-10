import type {Video} from "../type/Video";

export type VideoCollection = {
    "@context"?: string;
    "@id"?: string;
    "@type"?: "Collection";
    totalItems: number;
    member: Video[];
};