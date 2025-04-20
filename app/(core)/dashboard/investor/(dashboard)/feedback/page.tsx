'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../_components/layout/DashboardLayout';
import PitchFilter from '../../_components/dashboard/PitchFilter';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';
import PCard from '../_components/PCard';

const FeedbackGiven: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [pitches, setPitches] = useState<any[]>([]); // store real pitches

  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchFeedbacks = async () => {
      try {
        const resp = await axios.get(`/api/pitch/feedback/from/${userId}`);
        const data = resp.data;
        const entries = Object.entries(data.feedbacks || {});

        const formattedFeedbacks = entries.map(([id, fb]: any) => ({
          pitchId: fb.pitchId || id,
          founderName: fb.founderName || 'Unknown Company',
          message: fb.message || 'No feedback message',
        }));

        let pitchArray: any[] = [];

        for (const feedback of formattedFeedbacks) {
          const resp2 = await axios.get(`/api/pitch/${feedback.pitchId}`);
          const fullPitchData = resp2.data;

          pitchArray.push({
            pitchId: fullPitchData.id,
            founderName: fullPitchData.founderName || 'Unknown Founder',
            founderUrl: fullPitchData.founderUrl || 'https://example.com',
            message: feedback.message,
            fieldBadge: fullPitchData.category || 'Uncategorized',
            date: fullPitchData.date || '24/11/24',
          });
        }

        setPitches(pitchArray);
        toast.success('Fetched feedback successfully!');
      } catch (error) {
        console.error('Error fetching pitches:', error);
        toast.error('Failed to fetch feedback');
      }
    };

    fetchFeedbacks();
  }, [userId]);

  // Filters (optional)
  let filteredPitches = [...pitches];

  if (searchTerm) {
    filteredPitches = filteredPitches.filter(
      (pitch) =>
        pitch.founderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pitch.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (categoryFilter !== 'all') {
    filteredPitches = filteredPitches.filter(
      (pitch) => pitch.fieldBadge.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleFilterChange = (value: string) => {
    setCategoryFilter(value);
  };

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
              <PCard key={index} {...pitch} />
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
export default FeedbackGiven;
