import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface PitchFilterProps {
  totalPitches: number;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  className?: string;
}

const PitchFilter: React.FC<PitchFilterProps> = ({
  totalPitches,
  onSearchChange,
  onSortChange,
  onFilterChange,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 animate-fade-in',
        className
      )}
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Pitches <span className="text-shark-purple">({totalPitches})</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage and review startup pitches
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <Input
          placeholder="Search pitches..."
          className="h-9 w-full md:w-[180px] lg:w-[220px]"
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <div className="flex gap-2">
          <Select defaultValue="newest" onValueChange={onSortChange}>
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest">Highest Ask</SelectItem>
              <SelectItem value="lowest">Lowest Ask</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all" onValueChange={onFilterChange}>
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="consumer">Consumer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PitchFilter;
