
import React, { createContext, useState, useContext, useEffect } from "react";
import { Startup, Shark } from "../types";
import { mockStartups, mockShark } from "../data/mockData";

interface AppContextType {
  startups: Startup[];
  currentShark: Shark;
  isFirstTimeUser: boolean;
  markAsInterested: (startupId: string) => void;
  addComment: (startupId: string, text: string) => void;
  markFirstTimeUserSeen: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [startups, setStartups] = useState<Startup[]>(mockStartups);
  const [currentShark, setCurrentShark] = useState<Shark>(mockShark);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);

  // Check if it's the first time opening the app
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (hasVisitedBefore) {
      setIsFirstTimeUser(false);
    }
  }, []);

  const markFirstTimeUserSeen = () => {
    localStorage.setItem("hasVisitedBefore", "true");
    setIsFirstTimeUser(false);
  };

  const markAsInterested = (startupId: string) => {
    // Don't add if already interested
    if (currentShark.interestedStartups.includes(startupId)) {
      return;
    }
    
    // Update shark's interested startups
    const updatedShark = {
      ...currentShark,
      interestedStartups: [...currentShark.interestedStartups, startupId]
    };
    
    setCurrentShark(updatedShark);
  };

  const addComment = (startupId: string, text: string) => {
    const newCommentId = `c${Date.now()}`;
    
    // Create new comment
    const newComment = {
      id: newCommentId,
      sharkId: currentShark.id,
      sharkName: currentShark.name,
      sharkPhotoUrl: currentShark.photoUrl,
      text,
      timestamp: new Date().toISOString()
    };
    
    // Update startups with new comment
    const updatedStartups = startups.map(startup => {
      if (startup.id === startupId) {
        return {
          ...startup,
          comments: [...startup.comments, newComment]
        };
      }
      return startup;
    });
    
    // Update shark's comments made
    const updatedShark = {
      ...currentShark,
      commentsMade: [
        ...currentShark.commentsMade,
        { startupId, commentId: newCommentId }
      ]
    };
    
    setStartups(updatedStartups);
    setCurrentShark(updatedShark);
  };

  return (
    <AppContext.Provider 
      value={{ 
        startups, 
        currentShark, 
        isFirstTimeUser,
        markAsInterested, 
        addComment,
        markFirstTimeUserSeen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
