
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, MessageSquare, Send, User } from "lucide-react";
import { Startup } from "../types";

interface StartupDetailsProps {
  startup: Startup;
  onBack: () => void;
  onInterested: (startupId: string) => void;
  onComment: (startupId: string, text: string) => void;
  isInterestedAlready: boolean;
}

const StartupDetails: React.FC<StartupDetailsProps> = ({
  startup,
  onBack,
  onInterested,
  onComment,
  isInterestedAlready
}) => {
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState<"pitch" | "discussion">("pitch");
  
  const handleSendComment = () => {
    if (commentText.trim()) {
      onComment(startup.id, commentText);
      setCommentText("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white h-full w-full rounded-2xl shadow-xl flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h2 className="font-bold text-lg">{startup.name}</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onInterested(startup.id)}
          className={`p-2 rounded-full ${
            isInterestedAlready ? "bg-shark-coral text-white" : "hover:bg-gray-100 text-gray-700"
          }`}
          disabled={isInterestedAlready}
        >
          <Heart className={`h-5 w-5 ${isInterestedAlready ? "fill-white" : ""}`} />
        </motion.button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("pitch")}
          className={`flex-1 py-3 font-medium text-sm ${
            activeTab === "pitch"
              ? "text-shark-purple border-b-2 border-shark-purple"
              : "text-gray-500"
          }`}
        >
          Pitch Details
        </button>
        <button
          onClick={() => setActiveTab("discussion")}
          className={`flex-1 py-3 font-medium text-sm ${
            activeTab === "discussion"
              ? "text-shark-purple border-b-2 border-shark-purple"
              : "text-gray-500"
          }`}
        >
          Discussion {startup.comments.length > 0 && `(${startup.comments.length})`}
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "pitch" ? (
            <motion.div
              key="pitch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5"
            >
              {/* Founder */}
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                  <img
                    src={startup.founderPhotoUrl}
                    alt={startup.founderName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{startup.founderName}</h3>
                  <p className="text-sm text-gray-600">{startup.founderTitle}</p>
                </div>
              </div>
              
              {/* Pitch Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">The Problem</h3>
                  <p className="text-gray-800">{startup.pitchDetails.problem}</p>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">Our Solution</h3>
                  <p className="text-gray-800">{startup.pitchDetails.solution}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">Market Size</h3>
                    <p className="text-gray-800">{startup.pitchDetails.marketSize}</p>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">Business Model</h3>
                    <p className="text-gray-800">{startup.pitchDetails.businessModel}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">Competition</h3>
                  <p className="text-gray-800">{startup.pitchDetails.competition}</p>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">Traction</h3>
                  <p className="text-gray-800">{startup.pitchDetails.traction}</p>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">Team</h3>
                  <p className="text-gray-800">{startup.pitchDetails.team}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm uppercase text-gray-500 font-semibold mb-3">The Ask</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="block text-sm text-gray-500">Amount</span>
                      <span className="text-shark-purple font-bold">{startup.pitchDetails.askAmount}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Equity</span>
                      <span className="text-shark-purple font-bold">{startup.pitchDetails.equity}</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Use of Funds</span>
                      <span className="text-shark-purple font-bold">{startup.pitchDetails.useOfFunds}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="discussion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5"
            >
              {/* Comments */}
              <div className="space-y-4 mb-4">
                {startup.comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Be the first to leave feedback for this startup
                  </div>
                ) : (
                  startup.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                          <img
                            src={comment.sharkPhotoUrl}
                            alt={comment.sharkName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{comment.sharkName}</h4>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
              
              {/* Comment Input */}
              <div className="sticky bottom-0 bg-white border-t p-3">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add feedback or advice..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    onClick={handleSendComment}
                    disabled={!commentText.trim()}
                    className={`ml-2 p-1 rounded-full ${
                      commentText.trim() ? "text-shark-blue" : "text-gray-400"
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StartupDetails;