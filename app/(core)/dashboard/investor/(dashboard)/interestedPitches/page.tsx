'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../_components/layout/DashboardLayout';
import PitchCard from '../../_components/dashboard/PitchCard';
import PitchFilter from '../../_components/dashboard/PitchFilter';

// Mock data - in a real app, this would come from an API
const mockPitches: Omit<PitchCardProps, 'type'>[] = [
  {
    id: '1',
    companyName: 'NeuralTech',
    description:
      'AI-powered platform to analyze customer feedback and extract actionable insights for product teams. Using natural language processing to turn customer feedback into product roadmaps.',
    category: 'Tech',
    askAmount: '$2M',
    rating: 4,
    isBookmarked: true,
  },
  {
    id: '2',
    companyName: 'GreenHarvest',
    description:
      'Vertical farming technology that uses 95% less water and increases crop yields by 300%. Our patented system combines hydroponics with AI-powered climate control.',
    category: 'AgTech',
    askAmount: '$1.5M',
    rating: 5,
  },
  {
    id: '3',
    companyName: 'HealthSync',
    description:
      'Remote patient monitoring platform that connects medical devices to healthcare providers for real-time health data analysis and early intervention.',
    category: 'Health',
    askAmount: '$3M',
    rating: 3,
  },
  {
    id: '4',
    companyName: 'FinSecure',
    description:
      'Blockchain-based identity verification system for financial institutions that reduces fraud by 78% while cutting customer onboarding time in half.',
    category: 'Finance',
    askAmount: '$2.5M',
    rating: 4,
  },
  {
    id: '5',
    companyName: 'SpeedLogistics',
    description:
      'Last-mile delivery optimization platform that reduces delivery times by 35% and cuts operational costs by 28% using proprietary routing algorithms.',
    category: 'Logistics',
    askAmount: '$1.8M',
    rating: 4,
  },
  {
    id: '6',
    companyName: 'EcoPackage',
    description:
      'Biodegradable packaging materials made from agricultural waste that decompose 10x faster than existing alternatives while maintaining durability.',
    category: 'Consumer',
    askAmount: '$1M',
    rating: 3,
  },
];

const InterestedPitches: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleFilterChange = (value: string) => {
    setCategoryFilter(value);
  };

  // Apply filters and sorting
  let filteredPitches = [...mockPitches];

  // Search filter
  if (searchTerm) {
    filteredPitches = filteredPitches.filter(
      (pitch) =>
        pitch.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pitch.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Category filter
  if (categoryFilter !== 'all') {
    filteredPitches = filteredPitches.filter(
      (pitch) => pitch.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  // Apply sorting
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
      // 'newest' is default
      break;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
                type="interested"
                className={`transition-all duration-300 delay-${index * 100}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground">
              No pitches found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

type PitchCardProps = {
  id: string;
  companyName: string;
  description: string;
  category: string;
  askAmount: string;
  rating?: number;
  logo?: string;
  isBookmarked?: boolean;
  type: 'watch-later' | 'interested' | 'feedback';
  className?: string;
  style?: React.CSSProperties;
};

export default InterestedPitches;
