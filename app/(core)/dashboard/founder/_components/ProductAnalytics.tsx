'use client';

import { ChevronLeft, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from './StatCard';
import { AnalyticsChart } from './AnalyticsChart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ProductAnalytics() {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [startupId, setStartupId] = useState('');

  const router = useRouter();
  const currentStartupId = 'startup-123';

  const handleCommentsClick = (startupId: string) => {
    setStartupId(startupId);
    setShowCommentsModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 px-4 py-6 sm:px-6 md:px-8 max-w-screen-xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-secondary/20"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Product Analytics
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              See how your pitch is performing and who's interested
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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

      {/* Chart Section */}
      <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold text-primary mb-2">
          Weekly Engagement Overview
        </h2>
        <AnalyticsChart />
      </div>

      {/* Comments Modal (Optional) */}
      {/* {showCommentsModal && (
        <CommentsModal
          startupId={startupId}
          onClose={() => setShowCommentsModal(false)}
        />
      )} */}
    </div>
  );
}
