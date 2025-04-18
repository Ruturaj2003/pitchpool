'use client';

import { ChevronLeft, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from './StatCard';
import { AnalyticsChart } from './AnalyticsChart';
import { useState } from 'react';

export function ProductAnalytics() {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [startupId, setStartupId] = useState('');

  const currentStartupId = 'startup-123';

  const handleCommentsClick = (startupId: string) => {
    setStartupId(startupId);
    setShowCommentsModal(true);
  };

  return (
    <div className="space-y-6 px-4 py-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-secondary/20"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
          </Button>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Product Analytics
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your pitch performance and engagement
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <StatCard
          title="Total Views"
          value="189"
          icon={<Eye className="w-5 h-5 text-secondary" />}
        />
        <StatCard
          title="Interested Sharks"
          value="32"
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
        />
        <StatCard
          title="Comments"
          value="45"
          icon={<MessageSquare className="w-5 h-5 text-accent" />}
          // onClick={() => handleCommentsClick(currentStartupId)}
        />
      </div>

      {/* Chart */}
      <div className="w-full">
        <AnalyticsChart />
      </div>

      {/* Optional Comments Modal */}
      {/* {showCommentsModal && (
        <CommentsModal
          startupId={startupId}
          onClose={() => setShowCommentsModal(false)}
        />
      )} */}
    </div>
  );
}
