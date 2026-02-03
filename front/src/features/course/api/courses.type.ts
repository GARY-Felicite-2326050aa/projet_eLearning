import type{Course} from "../type/Course";

export type CourseCollectionResponse = {
    member: Course[];
    totalItems: number;
};