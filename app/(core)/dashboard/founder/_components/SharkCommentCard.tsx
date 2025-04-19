
import { SharkComment } from "../data/mockComments";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MessageCircle, UserRound } from "lucide-react";
import { useState } from "react";

interface SharkCommentCardProps {
  comment: SharkComment;
  index: number;
}

export function SharkCommentCard({ comment, index }: SharkCommentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openMessagingTab = (action: "connect" | "mentor") => {
    const url = `/messaging?shark=${encodeURIComponent(comment.sharkName)}&action=${action}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className={cn(
        "relative w-full rounded-xl p-6 mb-8",
        "bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800",
        "border border-gray-100 dark:border-gray-700",
        "shadow-md hover:shadow-lg transition-all duration-300",
        "animate-fade-in",
        { "delay-100": index % 5 === 0 },
        { "delay-200": index % 5 === 1 },
        { "delay-300": index % 5 === 2 },
        { "delay-400": index % 5 === 3 },
        { "delay-500": index % 5 === 4 },
        isHovered ? "transform hover:-translate-y-1" : ""
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pitch Title */}
      <div className="text-xs font-medium text-shark-blue mb-4 uppercase tracking-wider">
        {comment.pitchTitle}
      </div>
      
      {/* Shark Info */}
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-shark-purple mr-3">
          <img 
            src={comment.sharkImage} 
            alt={comment.sharkName} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-inter text-gray-900 dark:text-white">
            {comment.sharkName}
          </h3>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate(comment.date)}</span>
            <span className="mx-2">•</span>
            <span>{comment.time}</span>
          </div>
        </div>
      </div>
      
      {/* Comment */}
      <div className="my-4 font-inter text-gray-700 dark:text-gray-300 leading-relaxed">
        "{comment.comment}"
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={() => openMessagingTab("connect")}
          className={cn(
            "flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all",
            "bg-shark-purple text-white hover:bg-opacity-90 focus:ring-2 focus:ring-shark-purple focus:ring-opacity-50",
            isHovered ? "animate-pulse-light" : ""
          )}
        >
          <UserRound size={18} className="mr-2" />
          Connect with Shark
          <ArrowUpRight size={16} className="ml-1" />
        </button>
        
        <button
          onClick={() => openMessagingTab("mentor")}
          className={cn(
            "flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all",
            "bg-shark-blue text-white hover:bg-opacity-90 focus:ring-2 focus:ring-shark-blue focus:ring-opacity-50"
          )}
        >
          <MessageCircle size={18} className="mr-2" />
          Seek Mentoring
          <ArrowUpRight size={16} className="ml-1" />
        </button>
      </div>
      
      {/* Decorative gradient accent */}
      <div className="absolute top-0 right-0 h-16 w-16 rounded-tr-xl rounded-bl-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-shark-purple/30 via-shark-blue/20 to-shark-coral/10 opacity-70"></div>
      </div>
    </div>
  );
}