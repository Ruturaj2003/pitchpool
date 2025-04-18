'use client';

import { useUser } from '@clerk/nextjs';
import { ProductList } from './_components/ProductList';
import { VideoUploader } from './_components/VideoUploader';

const FounderDashboard = () => {
  const { user } = useUser();
  const firstName = user?.firstName;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
            Welcome back, {firstName}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Select a product to view its pitch analytics
          </p>
        </div>

        {/* Video Uploader */}
        <div className="w-full max-w-2xl mx-auto">
          <VideoUploader />
        </div>

        {/* Product List */}
        <div>
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
