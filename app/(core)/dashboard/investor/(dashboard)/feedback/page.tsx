'use client';
import React, { useState } from 'react';
import DashboardLayout from '../../_components/layout/DashboardLayout';
import PitchCard from '../../_components/dashboard/PitchCard';
import PitchFilter from '../../_components/dashboard/PitchFilter';

const mockPitches: Omit<PitchCardProps, 'type'>[] = [
  {
    id: '1',
    companyName: 'CyberShield',
    description:
      'Enterprise-grade cybersecurity platform that uses AI to predict and prevent threats before they occur. Our solution has reduced security incidents by 75% for Fortune 500 companies.',
    category: 'Tech',
    askAmount: '$4M',
    rating: 4,
  },
  {
    id: '2',
    companyName: 'MindfulAI',
    description:
      'Mental health platform combining AI therapy chatbots with human therapist oversight, making mental healthcare accessible and affordable for everyone.',
    category: 'Health',
    askAmount: '$2M',
    rating: 3,
  },
  {
    id: '3',
    companyName: 'EcoCharge',
    description:
      'Revolutionary battery technology that extends the range of electric vehicles by 60% while reducing charging time to under 10 minutes.',
    category: 'CleanTech',
    askAmount: '$5M',
    rating: 5,
  },
  {
    id: '4',
    companyName: 'UrbanFarms',
    description:
      'Indoor farming technology for urban environments that grows organic produce with 80% less water and no pesticides, right in city centers.',
    category: 'AgTech',
    askAmount: '$1.5M',
    rating: 3,
  },
  {
    id: '5',
    companyName: 'DataEthics',
    description:
      'Platform for businesses to ensure ethical AI implementation with comprehensive bias detection and transparency tools.',
    category: 'Tech',
    askAmount: '$2.2M',
    rating: 4,
  },
];

const FeedbackGiven: React.FC = () => {
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
      // In a real app, you would sort by date
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary animate-fade-in">
            Feedback Given
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Review and manage pitches you've provided feedback on
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
                type="feedback"
                className={`transition-all duration-300 delay-${index * 100}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No pitches found</h3>
            <p className="text-muted">
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
export default FeedbackGiven;
