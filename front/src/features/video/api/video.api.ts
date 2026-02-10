import api from "../../../shared/lib/axios";
import type {VideoCollection} from "./video.type";
import type {Video} from "../type/Video";

export const getVideos = async (courseId: number): Promise<Video[]> => {
    const response = await api.get<VideoCollection>("/api/videos");

    return response.data.member.filter(
        (video) => Number(video.course) === courseId
    );
};

export const getVideo = async (id: number): Promise<Video> => {
    const response = await api.get<Video>(`/api/videos/${id}`);
    return response.data;
};

export const createVideo = async (
    data: Omit<Video, "id">
): Promise<Video> => {
    const response = await api.post<Video>("/api/videos", data);
    return response.data;
};

export const updateVideo = async (
    id: number,
    data: Partial<Omit<Video, "id">>
): Promise<Video> => {
    const response = await api.patch<Video>(
        `/api/videos/${id}`,
        data,
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            },
        }
    );
    return response.data;
};

export const deleteVideo = async (id: number): Promise<void> => {
    await api.delete(`/api/videos/${id}`);
};