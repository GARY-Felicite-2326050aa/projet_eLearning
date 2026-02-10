import {
    getVideos,
    getVideo,
    createVideo,
    updateVideo,
    deleteVideo,
} from "../api/video.api";

export const useVideo = () => {
    return {
        getVideos,
        getVideo,
        createVideo,
        updateVideo,
        deleteVideo,
    };
};