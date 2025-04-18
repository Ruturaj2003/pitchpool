import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useApp } from "./context/appContext";
import SwipeCard from "./_components/swipeCard";
import BasicDetails from "./_components/basicDetails";
import StartupDetails from "./_components/startupDetails";
import DashboardView from "./_components/dashboardView";
import LoadingCard from "./_components/loadingCard";
import Header from "./_components/header";

function sharkDashboard() {
  const { 
    startups, 
    currentShark, 
    isFirstTimeUser,
    markAsInterested, 
    addComment,
    markFirstTimeUserSeen
  } = useApp();
  
  const [currentStartupIndex, setCurrentStartupIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"card" | "basic" | "detail" | "dashboard">("card");
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentStartup = startups[currentStartupIndex];
  const selectedStartup = startups.find(s => s.id === selectedStartupId);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show tutorial overlay for first-time users
    if (isFirstTimeUser) {
      setShowTutorial(true);
      
      // Auto-hide tutorial after some time
      const timer = setTimeout(() => {
        setShowTutorial(false);
        markFirstTimeUserSeen();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, markFirstTimeUserSeen]);

  const handleSwipeRight = () => {
    if (viewMode === "card") {
      setViewMode("basic");
    } else if (viewMode === "basic") {
      setSelectedStartupId(currentStartup.id);
      setViewMode("detail");
    }
  };

  const handleBackToCard = () => {
    setViewMode("card");
  };

  const handleBackToBasic = () => {
    setViewMode("basic");
  };

  const handleNextStartup = () => {
    if (currentStartupIndex < startups.length - 1) {
      setCurrentStartupIndex(prev => prev + 1);
    } else {
      // Loop back to first startup
      setCurrentStartupIndex(0);
    }
    setViewMode("card");
  };

  const handleDashboardClick = () => {
    setViewMode("dashboard");
  };

  const handleViewStartupFromDashboard = (startupId: string) => {
    const index = startups.findIndex(s => s.id === startupId);
    if (index !== -1) {
      setCurrentStartupIndex(index);
      setSelectedStartupId(startupId);
      setViewMode("detail");
    }
  };

  const isInterestedInCurrentStartup = currentShark.interestedStartups.includes(
    selectedStartupId || ""
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Tutorial Overlay for First-time Users */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              className="bg-white rounded-xl p-6 max-w-md relative"
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
            >
              <button 
                onClick={() => {
                  setShowTutorial(false);
                  markFirstTimeUserSeen();
                }}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
              
              <h2 className="text-2xl font-bold mb-4 text-shark-purple">Welcome to PitchPulse!</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-shark-purple/10 rounded-full p-2 mr-3 mt-1">
                    <ArrowRight className="h-5 w-5 text-shark-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Discover Startups</h3>
                    <p className="text-gray-600 text-sm">Swipe through our feed of innovative founder pitches</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-shark-blue/10 rounded-full p-2 mr-3 mt-1">
                    <ArrowRight className="h-5 w-5 text-shark-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Swipe Right for Details</h3>
                    <p className="text-gray-600 text-sm">Swipe right once to see basic info, and again for the full pitch</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-shark-coral/10 rounded-full p-2 mr-3 mt-1">
                    <ArrowRight className="h-5 w-5 text-shark-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Show Your Interest</h3>
                    <p className="text-gray-600 text-sm">Mark startups you like and provide feedback to the founders</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowTutorial(false);
                  markFirstTimeUserSeen();
                }}
                className="w-full mt-6 py-3 bg-gradient-to-r from-shark-purple to-shark-blue text-white rounded-lg font-semibold"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      {viewMode !== "dashboard" && viewMode !== "detail" && (
        <Header onDashboardClick={handleDashboardClick} />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md h-[80vh]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <LoadingCard />
              </motion.div>
            ) : viewMode === "card" && (
              <motion.div
                key="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <SwipeCard
                  startup={currentStartup}
                  onSwipeRight={handleSwipeRight}
                  isFirstTimeUser={isFirstTimeUser}
                />
              </motion.div>
            )}
            
            {viewMode === "basic" && (
              <motion.div
                key="basic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <BasicDetails
                  startup={currentStartup}
                  onSwipeRight={handleSwipeRight}
                  isFirstTimeUser={isFirstTimeUser}
                />
              </motion.div>
            )}
            
            {viewMode === "detail" && selectedStartup && (
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <StartupDetails
                  startup={selectedStartup}
                  onBack={handleBackToBasic}
                  onInterested={markAsInterested}
                  onComment={addComment}
                  isInterestedAlready={isInterestedInCurrentStartup}
                />
              </motion.div>
            )}
            
            {viewMode === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <DashboardView
                  shark={currentShark}
                  startups={startups}
                  onBack={handleBackToCard}
                  onViewStartup={handleViewStartupFromDashboard}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default sharkDashboard