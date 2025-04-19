
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";

export default function Messaging() {
  const [searchParams] = useSearchParams();
  const sharkName = searchParams.get("shark") || "Unknown Shark";
  const action = searchParams.get("action") || "connect";
  
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{sender: string; text: string; timestamp: Date}[]>([]);
  
  // Mock initial message based on the action
  useEffect(() => {
    const initialMessage = action === "connect" 
      ? `Hello! I'm interested in connecting with you regarding my startup.`
      : `Hello! I'd like to request mentoring for my startup.`;
      
    const welcomeMessage = action === "connect"
      ? `Hi there! I'm ${sharkName}. I'm excited to connect with you about your startup. What specifically would you like to discuss?`
      : `Hi there! I'm ${sharkName}. I'd be happy to provide mentoring for your startup. What areas would you like guidance on?`;
    
    setChatHistory([
      {
        sender: "You",
        text: initialMessage,
        timestamp: new Date(Date.now() - 60000)
      },
      {
        sender: sharkName,
        text: welcomeMessage,
        timestamp: new Date()
      }
    ]);
  }, [sharkName, action]);
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const newMessage = {
      sender: "You",
      text: message,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, newMessage]);
    setMessage("");
    
    // Simulate shark response after 1 second
    setTimeout(() => {
      const responseMessages = [
        "That's a great point. Let's explore that further.",
        "I've had experience with similar challenges. Here's what worked for me...",
        "Have you considered approaching it from this angle?",
        "I'd be happy to introduce you to some contacts in that industry.",
        "Let's schedule a follow-up call to discuss this in more detail."
      ];
      
      const randomResponse = responseMessages[Math.floor(Math.random() * responseMessages.length)];
      
      const sharkResponse = {
        sender: sharkName,
        text: randomResponse,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, sharkResponse]);
    }, 1000);
  };
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 font-inter">
      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => window.close()}
              className="flex items-center text-shark-purple hover:text-shark-purple/80 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Close Chat</span>
            </button>
            
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <MessageSquare size={20} className="text-shark-blue mr-2" />
              {action === "connect" ? "Connect with" : "Mentoring from"} {sharkName}
            </h1>
            
            <div className="w-24"></div> {/* Empty div for spacing */}
          </div>
        </div>
      </header>
      
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className={`flex ${chat.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs sm:max-w-md rounded-2xl p-4 ${
                chat.sender === 'You' 
                  ? 'bg-shark-blue text-white ml-12' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mr-12'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="font-semibold mb-1">{chat.sender}</div>
              <p>{chat.text}</p>
              <div className="text-xs opacity-70 text-right mt-1">
                {chat.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <form onSubmit={sendMessage} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-shark-purple"
          />
          <button 
            type="submit"
            className="bg-shark-purple text-white rounded-full p-2 hover:bg-opacity-90 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}