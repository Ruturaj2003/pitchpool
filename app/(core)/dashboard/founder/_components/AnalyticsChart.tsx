'use client';
import { Card } from '@/components/ui/card';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { day: 'Mon', views: 24, interested: 12 },
  { day: 'Tue', views: 35, interested: 15 },
  { day: 'Wed', views: 45, interested: 25 },
  { day: 'Thu', views: 30, interested: 18 },
  { day: 'Fri', views: 55, interested: 32 },
  { day: 'Sat', views: 42, interested: 20 },
  { day: 'Sun', views: 38, interested: 22 },
];

export function AnalyticsChart() {
  return (
    <Card className="p-4 rounded-2xl bg-gradient-to-br from-white/50 via-muted/40 to-white/20 shadow-sm backdrop-blur">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-primary">
          Conversion Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Visitors vs Interest (This Week)
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ borderRadius: '10px', border: 'none' }}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="interested"
              stroke="#A855F7"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
