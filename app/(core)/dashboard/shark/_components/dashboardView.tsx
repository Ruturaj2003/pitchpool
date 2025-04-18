
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, MessageSquare } from "lucide-react";
import { Startup, Shark } from "../types";

interface DashboardViewProps {
  shark: Shark;
  startups: Startup[];
  onBack: () => void;
  onViewStartup: (startupId: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  shark,
  startups,
  onBack,
  onViewStartup
}) => {
  const [activeTab, setActiveTab] = useState<"interested" | "comments">("interested");
  
  // Get interested startups
  const interestedStartups = startups.filter(startup => 
    shark.interestedStartups.includes(startup.id)
  );
  
  // Get startups with comments
  const commentsMap = new Map<string, { startup: Startup; commentId: string }[]>();
  
  shark.commentsMade.forEach(comment => {
    const startup = startups.find(s => s.id === comment.startupId);
    const commentObj = startup?.comments.find(c => c.id === comment.commentId);
    
    if (startup && commentObj) {
      if (!commentsMap.has(startup.id)) {
        commentsMap.set(startup.id, []);
      }
      commentsMap.get(startup.id)?.push({ startup, commentId: comment.commentId });
    }
  });
  
  const startupComments = Array.from(commentsMap.entries()).map(
    ([startupId, comments]) => {
      const startup = startups.find(s => s.id === startupId);
      return {
        startup,
        comments: comments.map(c => 
          startup?.comments.find(comment => comment.id === c.commentId)
        ).filter(Boolean)
      };
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        <h2 className="font-bold text-lg">Your Dashboard</h2>
        <div className="w-9"></div> {/* Empty div for flex spacing */}
      </div>
      
      {/* Profile */}
      <div className="p-5 flex items-center border-b">
        <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-shark-purple">
          <img 
            src={shark.photoUrl} 
            alt={shark.name} 
            className="h-full w-full object-cover" 
          />
        </div>
        <div>
          <h3 className="font-bold text-xl">{shark.name}</h3>
          <p className="text-gray-600 text-sm">Investor & Mentor</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("interested")}
          className={`flex-1 py-3 font-medium text-sm flex justify-center items-center ${
            activeTab === "interested"
              ? "text-shark-purple border-b-2 border-shark-purple"
              : "text-gray-500"
          }`}
        >
          <Heart className={`h-4 w-4 mr-1 ${activeTab === "interested" ? "fill-shark-purple" : ""}`} />
          Interested
          {interestedStartups.length > 0 && 
            <span className="ml-1 text-xs bg-shark-purple text-white rounded-full px-2">
              {interestedStartups.length}
            </span>
          }
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`flex-1 py-3 font-medium text-sm flex justify-center items-center ${
            activeTab === "comments"
              ? "text-shark-purple border-b-2 border-shark-purple"
              : "text-gray-500"
          }`}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Comments
          {startupComments.length > 0 && 
            <span className="ml-1 text-xs bg-shark-purple text-white rounded-full px-2">
              {startupComments.length}
            </span>
          }
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "interested" ? (
            <motion.div
              key="interested"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5"
            >
              {interestedStartups.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No startups marked as interested yet
                </div>
              ) : (
                <div className="space-y-4">
                  {interestedStartups.map(startup => (
                    <div 
                      key={startup.id}
                      onClick={() => onViewStartup(startup.id)}
                      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex h-24">
                        <div className="w-24 h-full overflow-hidden">
                          <img 
                            src={startup.thumbnailUrl} 
                            alt={startup.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold">{startup.name}</h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-shark-purple text-white">
                              {startup.sector}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{startup.tagline}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="comments"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5"
            >
              {startupComments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No comments yet
                </div>
              ) : (
                <div className="space-y-6">
                  {startupComments.map(({ startup, comments }) => (
                    <div key={startup?.id} className="border rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center p-3 border-b bg-gray-50 cursor-pointer"
                        onClick={() => startup && onViewStartup(startup.id)}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={startup?.thumbnailUrl} 
                            alt={startup?.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{startup?.name}</h3>
                          <p className="text-xs text-gray-600">{startup?.tagline}</p>
                        </div>
                      </div>
                      <div className="p-3 space-y-3">
                        {comments.map(comment => comment && (
                          <div key={comment.id} className="text-sm">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500">
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-800">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DashboardView;