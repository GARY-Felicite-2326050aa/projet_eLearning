import { useVideo } from "../hooks/useVideo";
import { useEffect } from "react";
import { useVideoStore } from "../store/video.store";

export const CourseVideos = ({ courseId }: { courseId: number }) => {
    const { getVideos } = useVideo();
    const { setVideos, videos } = useVideoStore();

    useEffect(() => {
        getVideos(courseId).then(setVideos);
    }, [courseId, getVideos, setVideos]);

    return (
        <>
            {videos.map((v) => (
                <video key={v.id} controls src={v.urlPath} />
            ))}
        </>
    );
};