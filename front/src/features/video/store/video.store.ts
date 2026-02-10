import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {Video} from "../type/Video";

type VideoState = {
    videos: Video[];
    setVideos: (videos: Video[]) => void;
    addVideo: (video: Video) => void;
    updateVideo: (video: Video) => void;
    removeVideo: (id: number) => void;
};

export const useVideoStore = create<VideoState>()(
    persist(
        (set) => ({
            videos: [],

            setVideos: (videos) => set({ videos }),

            addVideo: (video) =>
                set((state) => ({
                    videos: [...state.videos, video],
                })),

            updateVideo: (updated) =>
                set((state) => ({
                    videos: state.videos.map((v) =>
                        v.id === updated.id ? updated : v
                    ),
                })),

            removeVideo: (id) =>
                set((state) => ({
                    videos: state.videos.filter((v) => v.id !== id),
                })),
        }),
        {
            name: "video-storage",
        }
    )
);