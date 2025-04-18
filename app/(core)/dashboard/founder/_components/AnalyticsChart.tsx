"use client";
import { Card } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", views: 24, interested: 12 },
  { day: "Tue", views: 35, interested: 15 },
  { day: "Wed", views: 45, interested: 25 },
  { day: "Thu", views: 30, interested: 18 },
  { day: "Fri", views: 55, interested: 32 },
];

export function AnalyticsChart() {
  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm">
      <h3 className="font-semibold mb-4">Conversion Overview</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#3B82F6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="interested"
              stroke="#7C3AED"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}