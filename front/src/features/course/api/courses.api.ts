import api from "../../../shared/lib/axios";
import type { CourseCollectionResponse } from "./courses.type";
import type {Course} from "../type/Course";

export const getCourses = async (): Promise<Course[]> => {
    const response = await api.get<CourseCollectionResponse>("/api/courses");
    return response.data.member;
};

export const getCourseById = async (id: number): Promise<Course> => {
    const response = await api.get<Course>(`/api/courses/${id}`);
    return response.data;
};