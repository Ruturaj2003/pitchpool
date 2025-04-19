'use client';

import React, { useState } from 'react';
import DashboardLayout from '../_components/layout/DashboardLayout';
import PitchCard from '../_components/dashboard/PitchCard';
import PitchFilter from '../_components/dashboard/PitchFilter';
import type { PitchCardProps } from '../_components/dashboard/PitchCard';

// Mock data - in a real app, this would come from an API
const mockPitches: Omit<PitchCardProps, 'type'>[] = [
  {
    id: '1',
    companyName: 'SoundScape',
    description:
      'AI-powered audio tech that creates personalized soundscapes to improve focus, sleep, and relaxation.',
    category: 'Consumer',
    askAmount: '$1.8M',
    rating: 3,
  },
  {
    id: '2',
    companyName: 'RoboChef',
    description:
      'Automated cooking system for restaurant-quality meals at home using robotics and vision.',
    category: 'FoodTech',
    askAmount: '$3M',
    rating: 4,
  },
  {
    id: '3',
    companyName: 'SpaceConnect',
    description:
      'Low-cost satellite internet for rural areas, offering 50% cheaper high-speed connectivity.',
    category: 'Tech',
    askAmount: '$7M',
    rating: 5,
  },
];

const WatchLater: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<
    'newest' | 'oldest' | 'highest' | 'lowest'
  >('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleSearchChange = (value: string) => setSearchTerm(value);
  const handleSortChange = (value: string) => setSortOption(value as any);
  const handleFilterChange = (value: string) => setCategoryFilter(value);

  // Apply filters and sorting
  let filteredPitches = [...mockPitches];

  if (searchTerm) {
    filteredPitches = filteredPitches.filter(
      (pitch) =>
        pitch.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pitch.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (categoryFilter !== 'all') {
    filteredPitches = filteredPitches.filter(
      (pitch) => pitch.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  switch (sortOption) {
    case 'oldest':
      filteredPitches = [...filteredPitches].reverse();
      break;
    case 'highest':
      filteredPitches = [...filteredPitches].sort(
        (a, b) =>
          parseInt(b.askAmount.replace(/\D/g, '')) -
          parseInt(a.askAmount.replace(/\D/g, ''))
      );
      break;
    case 'lowest':
      filteredPitches = [...filteredPitches].sort(
        (a, b) =>
          parseInt(a.askAmount.replace(/\D/g, '')) -
          parseInt(b.askAmount.replace(/\D/g, ''))
      );
      break;
    default:
      break;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-shark-purple animate-fade-in">
            Watch Later
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Pitches you&apos;ve saved to review later
          </p>
        </div>

        <PitchFilter
          totalPitches={filteredPitches.length}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />

        {filteredPitches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPitches.map((pitch, index) => (
              <PitchCard
                key={pitch.id}
                {...pitch}
                type="watch-later"
                className="transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No pitches found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WatchLater;
