
import React from "react";
import { motion } from "framer-motion";

const LoadingCard: React.FC = () => {
  return (
    <div className="w-full h-full rounded-2xl bg-white shadow-xl overflow-hidden relative">
      {/* Shimmer effect for image */}
      <div className="w-full h-full bg-gray-200">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }}
          animate={{ x: ["100%", "100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Shimmer for content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="h-8 w-1/2 bg-gray-300 rounded mb-3">
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            }}
            animate={{ x: ["100%", "100%", "-100%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              times: [0, 0.5, 1],
              delay: 0.2,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-4">
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            }}
            animate={{ x: ["100%", "100%", "-100%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              times: [0, 0.5, 1],
              delay: 0.4,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="h-6 w-24 bg-gray-300 rounded">
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            }}
            animate={{ x: ["100%", "100%", "-100%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              times: [0, 0.5, 1],
              delay: 0.6,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
      
      {/* Logo overlay while loading */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          className="text-2xl font-bold bg-gradient-to-r from-shark-purple to-shark-blue bg-clip-text text-transparent"
        >
          PitchPulse
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingCard;