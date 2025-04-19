"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, MessageSquare, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatCard } from "./StatCard";
import { AnalyticsChart } from "./AnalyticsChart";

const weeklyData: DailyData[] = [
  { day: "Mon", views: 24, interested: 12, comments: 5 },
  { day: "Tue", views: 35, interested: 15, comments: 7 },
  { day: "Wed", views: 45, interested: 25, comments: 10 },
  { day: "Thu", views: 30, interested: 18, comments: 6 },
  { day: "Fri", views: 55, interested: 32, comments: 12 },
  { day: "Sat", views: 20, interested: 9, comments: 3 },
  { day: "Sun", views: 15, interested: 5, comments: 2 },
];

export function ProductAnalytics({ pitchId }: { pitchId: string }) {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    views: 0,
    interested: 0,
    comments: 0,
    peakDay: "",
  });

  useEffect(() => {
    const summary = calculateAnalyticsSummary(weeklyData);
    setAnalytics(summary);
  }, []);

  const calculateAnalyticsSummary = (data: DailyData[]): AnalyticsSummary => {
    let totalViews = 0;
    let totalInterested = 0;
    let totalComments = 0;
    let peakDay = "";
    let maxViews = -1;

    data.forEach((entry) => {
      totalViews += entry.views;
      totalInterested += entry.interested;
      totalComments += entry.comments;

      if (entry.views > maxViews) {
        maxViews = entry.views;
        peakDay = entry.day;
      }
    });

    return {
      views: totalViews,
      interested: totalInterested,
      comments: totalComments,
      peakDay,
    };
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
          value={analytics.views.toString()}
          icon={<Eye className="w-5 h-5 text-secondary" />}
        />
        <StatCard
          title="Interested Sharks"
          value={analytics.interested.toString()}
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
        />
        <StatCard
          title="Comments"
          value={analytics.comments.toString()}
          icon={<MessageSquare className="w-5 h-5 text-accent" />}
          onClick={() => router.push(`/dashboard/founder/${pitchId}/comments`)} // Updated redirection to dynamic route
          className="cursor-pointer hover:shadow-md transition"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold text-primary mb-2">
          Weekly Engagement Overview
        </h2>
        <div className="block sm:hidden text-muted-foreground text-sm">
          <p>
            <strong>Peak Activity Day:</strong> {analytics.peakDay || "N/A"}
          </p>
          <p className="mt-1">
            Most users viewed your pitch on{" "}
            <strong>{analytics.peakDay || "a day this week"}</strong>. Keep the
            momentum going!
          </p>
        </div>

        <div className="hidden sm:block">
          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
}

// Types
type DailyData = {
  day: string;
  views: number;
  interested: number;
  comments: number;
};

type AnalyticsSummary = {
  views: number;
  interested: number;
  comments: number;
  peakDay: string;
};
