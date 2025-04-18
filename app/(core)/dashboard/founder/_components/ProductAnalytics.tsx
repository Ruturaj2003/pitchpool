'use client';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from './StatCard';
import { Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { AnalyticsChart } from './AnalyticsChart';
import { useState } from 'react';
// import CommentsModal from "@/components/CommentsModal"; // Import the CommentsModal

export function ProductAnalytics() {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [startupId, setStartupId] = useState(''); // To store the startupId

  // Example startup ID, you can replace this with dynamic data
  const currentStartupId = 'startup-123'; // This should be dynamic based on the founder's current startup

  // Toggle the Comments Modal and set the startup ID
  const handleCommentsClick = (startupId: string) => {
    setStartupId(startupId);
    setShowCommentsModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hover:bg-secondary/10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold mb-2">Product Analytics</h1>
          <p className="text-muted-foreground">
            Track your pitch performance and engagement
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Views"
          value="189"
          icon={<Eye className="w-4 h-4 text-secondary" />}
        />
        <StatCard
          title="Interested Sharks"
          value="32"
          icon={<TrendingUp className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="Comments"
          value="45"
          icon={<MessageSquare className="w-4 h-4 text-accent" />}
          // onClick={() => handleCommentsClick(currentStartupId)} // Handle the click and pass the startupId
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AnalyticsChart />
      </div>

      {/* Show Comments Modal if clicked */}
      {/* {showCommentsModal && (
        <CommentsModal
          startupId={startupId} // Pass the startupId to fetch comments
          onClose={() => setShowCommentsModal(false)} // Close the modal
        />
      )} */}
    </div>
  );
}
