//@ts-nocheck
"use client";

import React, { useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import VideoCard from "./VideoCard";
import { cn } from "@/lib/utils";

const DEMO_VIDEOS = [
  {
    id: 1,
    title: "AI-Powered Healthcare Solution",
    founder: "Sarah Chen",
    description: "Revolutionary AI technology for early disease detection",
    videoUrl: "/vid.mp4",
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Sustainable Energy Platform",
    founder: "Mike Rodriguez",
    description: "Democratizing access to renewable energy solutions",
    videoUrl: "https://example.com/video2.mp4",
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: 3,
    title: "FinTech Revolution",
    founder: "Lisa Wong",
    description: "Next-gen payment processing for small businesses",
    videoUrl: "https://example.com/video3.mp4",
    thumbnailUrl: "/placeholder.svg",
  },
];

const VideoFeed: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, DEMO_VIDEOS.length - 1));
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: goToNext,
    onSwipedDown: goToPrev,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  return (
    <div {...handlers} className="relative h-[100dvh] overflow-hidden">
      {DEMO_VIDEOS.map((video, index) => {
        const positionClass =
          index === activeIndex
            ? "translate-y-0 z-10"
            : index > activeIndex
            ? "translate-y-full z-0"
            : "-translate-y-full z-0";

        return (
          <div
            key={video.id}
            className={cn(
              "absolute inset-0 w-full h-full transition-transform duration-300",
              positionClass
            )}
          >
            <VideoCard
              video={video}
              isActive={index === activeIndex}
              onVisible={() => setActiveIndex(index)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideoFeed;
