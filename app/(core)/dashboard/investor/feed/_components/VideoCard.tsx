import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    founder: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
  };
  isActive: boolean;
  onVisible: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isActive,
  onVisible,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold: 0.7 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  return (
    <Card
      ref={cardRef}
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-500/20 transition-all duration-300 ${
        isActive ? "scale-100" : "scale-95 opacity-90"
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h3 className="text-2xl font-bold mb-2 animate-fade-in">
          {video.title}
        </h3>
        <div className="flex items-center space-x-3 mb-3">
          <Avatar>
            <div className="w-full h-full bg-purple-500 flex items-center justify-center">
              {video.founder[0]}
            </div>
          </Avatar>
          <span className="font-medium">{video.founder}</span>
        </div>
        <p className="text-sm text-gray-200 mb-4 line-clamp-2">
          {video.description}
        </p>
      </div>

      <div className="absolute right-4 bottom-24 flex flex-col space-y-4">
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
        >
          {isActive ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
      </div>
    </Card>
  );
};

export default VideoCard;
