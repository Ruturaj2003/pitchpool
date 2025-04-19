'use client';

import React, { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Pause, Play, ArrowRight } from 'lucide-react';

interface ReelCardProps {
  videoUrl: string;
  productName: string;
  description: string;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
}

const ReelCard: React.FC<ReelCardProps> = ({
  videoUrl,
  productName,
  description,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => onSwipeUp?.(),
    onSwipedDown: () => onSwipeDown?.(),
    onSwipedLeft: () => onSwipeLeft?.(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div
      {...handlers}
      className="relative h-screen w-full overflow-hidden bg-black touch-none select-none"
      onClick={(e) => {
        const x = e.nativeEvent.offsetX;
        const width = (e.target as HTMLElement).clientWidth;
        if (x > width * 0.6) {
          onSwipeLeft?.();
        } else {
          togglePlay();
        }
      }}
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Top Nav */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-black/30 backdrop-blur-md">
        <h1 className="text-white text-lg font-semibold tracking-wide">
          Pitch Reels
        </h1>
        <div className="text-white text-sm opacity-70">Swipe to explore</div>
      </div>

      {/* Main Info + Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="text-white space-y-2 max-w-[85%] mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">{productName}</h2>
          <p className="text-sm md:text-base text-white/80">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSwipeLeft?.();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex gap-1">
            {/* Example progress dots, dynamic version can be added */}
            <div className="w-2 h-2 rounded-full bg-white/70"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      {/* Play/Pause Button */}
      <div className="absolute right-4 bottom-28 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition">
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )}
      </div>
    </div>
  );
};

export default ReelCard;
