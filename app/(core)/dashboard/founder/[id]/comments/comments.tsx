
import { CommentsList } from "../../_components/CommentList";
import { mockComments } from "../../data/mockComments";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function Comments() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 font-inter">
      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/"
              className="flex items-center text-shark-purple hover:text-shark-purple/80 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <MessageSquare size={24} className="text-shark-blue mr-2" />
              Shark Comments
            </h1>
            
            <div className="w-24"></div> {/* Empty div for spacing */}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-shark-purple via-shark-blue to-shark-coral">
              Investor Feedback
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Review comments from investors who've seen your pitch. Connect with sharks for mentoring
            and partnership opportunities to take your startup to the next level.
          </p>
        </div>
        
        {/* Comments list */}
        <CommentsList comments={mockComments} />
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-gray-100 dark:border-gray-800 py-8 mt-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 sm:mb-0">
            © 2025 SharkWhisperConnect. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-shark-purple transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-shark-purple transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-shark-purple transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}