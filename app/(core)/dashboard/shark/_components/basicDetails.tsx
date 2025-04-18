
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { Startup } from "../types";

interface BasicDetailsProps {
  startup: Startup;
  onSwipeRight: () => void;
  isFirstTimeUser: boolean;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ startup, onSwipeRight, isFirstTimeUser }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white h-full w-full rounded-2xl p-6 shadow-xl flex flex-col"
    >
      <div className="flex items-center mb-6">
        <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
          <img 
            src={startup.founderPhotoUrl} 
            alt={startup.founderName} 
            className="h-full w-full object-cover" 
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">{startup.founderName}</h3>
          <p className="text-gray-600 text-sm">{startup.founderTitle}</p>
        </div>
      </div>
      
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-shark-purple mb-2">{startup.name}</h2>
        <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-sm text-shark-purple mb-4">
          {startup.sector}
        </div>
        <p className="text-gray-700 mb-6">{startup.tagline}</p>
        <p className="text-gray-700">{startup.description}</p>
      </div>
      
      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSwipeRight}
          className="w-full py-3 px-6 bg-shark-blue text-white rounded-lg font-semibold flex items-center justify-center"
        >
          View Full Pitch <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </div>
      
      {/* First-time user instruction */}
      {isFirstTimeUser && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-shark-blue bg-opacity-90 p-3 rounded-lg text-white animate-pulse">
          <p className="flex items-center text-sm font-medium">
            Tap for full details <ArrowRight className="ml-1 h-4 w-4" />
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default BasicDetails;