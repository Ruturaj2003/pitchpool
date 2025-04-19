import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void; // Added onClick prop
}

export function StatCard({ title, value, icon, className, onClick }: StatCardProps) {
  return (
    <Card 
      className={cn("bg-white/50 backdrop-blur-sm cursor-pointer", className)} 
      onClick={onClick} // Apply the onClick handler
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
