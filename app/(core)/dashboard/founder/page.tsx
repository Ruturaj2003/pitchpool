'use client';

import { useUser } from '@clerk/nextjs';
import { ProductList } from './_components/ProductList';
import { VideoUploader } from './_components/VideoUploader';
import { Sparkles } from 'lucide-react';

const FounderDashboard = () => {
  const { user } = useUser();
  const firstName = user?.firstName;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-14 animate-fade-in">
        {/* Welcome Section */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Sparkles className="w-8 h-8 text-primary animate-bounce" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Upload your startup pitch and track performance across products. Use
            analytics to refine your pitch and stand out!
          </p>
        </div>

        {/* Video Uploader Section */}
        <div className="w-full max-w-2xl mx-auto bg-white/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-muted space-y-4">
          <h2 className="text-xl font-semibold text-center text-primary">
            Upload Your Latest Pitch
          </h2>
          <VideoUploader />
          <p className="text-center text-xs text-muted-foreground">
            Max file size: 100MB | Format: mp4, mov
          </p>
        </div>

        {/* Product List Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Your Products</h2>
          <p className="text-muted-foreground">
            Choose a product to view detailed engagement and interest analytics.
          </p>
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
