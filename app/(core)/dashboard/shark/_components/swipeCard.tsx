
import React, { useState, useRef } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { ArrowRight, Play, Pause } from "lucide-react";
import { Startup } from "../types";

interface SwipeCardProps {
  startup: Startup;
  onSwipeRight: () => void;
  isFirstTimeUser: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ startup, onSwipeRight, isFirstTimeUser }) => {
  const [swipeLevel, setSwipeLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const controls = useAnimation();
  const constraintsRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      controls.start({ x: "100%", opacity: 0 });
      onSwipeRight();
      // Reset after animation completes
      setTimeout(() => {
        controls.set({ x: 0, opacity: 1 });
      }, 300);
    } else {
      controls.start({ x: 0 });
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div ref={constraintsRef} className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileDrag={{ scale: 0.98 }}
        className="w-full h-full"
      >
        <div className="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
          {/* Video player */}
          <div className="w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src={startup.videoUrl}
              poster={startup.thumbnailUrl}
              className="w-full h-full object-cover"
              playsInline
              loop
              muted
              onClick={togglePlayPause}
            />
            
            {/* Play/Pause button overlay */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="h-16 w-16 text-white/80" />
              ) : (
                <Play className="h-16 w-16 text-white/80" />
              )}
            </motion.button>
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
          
          {/* Content at bottom */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold">{startup.name}</h2>
            <p className="text-gray-300 mb-2">{startup.tagline}</p>
            <div className="inline-block px-3 py-1 rounded-full bg-shark-purple bg-opacity-30 text-sm shadow-lg">
              {startup.sector}
            </div>
          </motion.div>
          
          {/* Swipe indicator */}
          <motion.div 
            className="absolute top-1/2 right-8 transform -translate-y-1/2"
            animate={{ x: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <div className="bg-white/20 backdrop-blur-lg p-2 rounded-full">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </motion.div>
          
          {/* First-time user instruction */}
          {isFirstTimeUser && (
            <motion.div 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-shark-blue bg-opacity-90 p-3 rounded-lg text-white"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <p className="flex items-center text-sm font-medium">
                Swipe right for details <ArrowRight className="ml-1 h-4 w-4" />
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Subtle hint at bottom */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/80 text-xs bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Swipe to explore
      </motion.div>
    </div>
  );
};

export default SwipeCard;