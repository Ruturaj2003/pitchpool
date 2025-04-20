<<<<<<< HEAD
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

=======
// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../_components/layout/DashboardLayout";
import PitchCard from "../../_components/dashboard/PitchCard";
import PitchFilter from "../../_components/dashboard/PitchFilter";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import PCard from "../_components/PCard";

// pitch id , Founder Name , FounderUrl, Message  ,Date ,  and View Detail Button , Badge of Field

const mockPitches: Omit<PitchCardProps, "type">[] = [
  {
    id: "1",
    companyName: "CyberShield",
    description:
      "Enterprise-grade cybersecurity platform that uses AI to predict and prevent threats before they occur. Our solution has reduced security incidents by 75% for Fortune 500 companies.",
    category: "Tech",
    askAmount: "$4M",
    rating: 4,
  },
  {
    id: "2",
    companyName: "MindfulAI",
    description:
      "Mental health platform combining AI therapy chatbots with human therapist oversight, making mental healthcare accessible and affordable for everyone.",
    category: "Health",
    askAmount: "$2M",
    rating: 3,
  },
  {
    id: "3",
    companyName: "EcoCharge",
    description:
      "Revolutionary battery technology that extends the range of electric vehicles by 60% while reducing charging time to under 10 minutes.",
    category: "CleanTech",
    askAmount: "$5M",
    rating: 5,
  },
  {
    id: "4",
    companyName: "UrbanFarms",
    description:
      "Indoor farming technology for urban environments that grows organic produce with 80% less water and no pesticides, right in city centers.",
    category: "AgTech",
    askAmount: "$1.5M",
    rating: 3,
  },
  {
    id: "5",
    companyName: "DataEthics",
    description:
      "Platform for businesses to ensure ethical AI implementation with comprehensive bias detection and transparency tools.",
    category: "Tech",
    askAmount: "$2.2M",
    rating: 4,
  },
];

const FeedbackGiven: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { user } = useUser();
  const userId = user?.id;

  const fetchDataPipeline = async (userId: string) => {
    if (!userId) return [];

    try {
      // Step 1: Fetch feedbacks given by the user
      const resp = await axios.get(`/api/pitch/feedback/from/${userId}`);
      const data = resp.data;

      const entries = Object.entries(data.feedbacks || {});
      const formattedFeedbacks = entries.map(([id, fb]: any) => ({
        pitchId: fb.pitchId || id,
        founderName: fb.founderName || "Unknown Company",
        description: fb.message || "No feedback description",
      }));

      // Step 2: Fetch full pitch data for each feedback
      let pitchArray = [];
      for (const feedback of formattedFeedbacks) {
        let resp2 = await axios.get(`/api/pitch/${feedback.pitchId}`);
        let fullPitchData = resp2.data;

        // Step 3: Combine feedback and pitch data
        pitchArray.push({
          pitchId: fullPitchData.id,
          founderName: fullPitchData.founderName || "Unknown Founder",
          founderUrl: fullPitchData.founderUrl || "https://example.com",
          message: feedback.description, // Feedback's message
          fieldBadge: fullPitchData.category || "Uncategorized",
          date: fullPitchData.date || "24/11/24",
        });
      }
      console.log(pitchArray);

      return pitchArray; // Return the final array with all required data
    } catch (error) {
      console.error("Error in fetching data:", error);
      return [];
    }
  };

  // const fetchFeedBacks = async () => {
  //   if (!userId) return;

  //   try {
  //     console.log('Logging ' + userId);

  //     const resp = await axios.get(`/api/pitch/feedback/from/${userId}`);
  //     const data = resp.data;

  //     console.log(data.feedbacks);
  //     toast.success('Fetched feedback successfully!');
  //   } catch (error) {
  //     toast.error('Failed to fetch feedback');
  //   }
  // };
  let pitchAry;
>>>>>>> e45e3245b1213f47e1253058ed42ed1e45a07df9
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

<<<<<<< HEAD
=======
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
  if (categoryFilter !== "all") {
    filteredPitches = filteredPitches.filter(
      (pitch) => pitch.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  // Apply sorting
  switch (sortOption) {
    case "oldest":
      // In a real app, you would sort by date
      filteredPitches = [...filteredPitches].reverse();
      break;
    case "highest":
      filteredPitches = [...filteredPitches].sort(
        (a, b) =>
          parseInt(b.askAmount.replace(/\D/g, "")) -
          parseInt(a.askAmount.replace(/\D/g, ""))
      );
      break;
    case "lowest":
      filteredPitches = [...filteredPitches].sort(
        (a, b) =>
          parseInt(a.askAmount.replace(/\D/g, "")) -
          parseInt(b.askAmount.replace(/\D/g, ""))
      );
      break;
    default:
      // 'newest' is default
      break;
  }

>>>>>>> e45e3245b1213f47e1253058ed42ed1e45a07df9
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
<<<<<<< HEAD

=======
type PitchCardProps = {
  id: string;
  companyName: string;
  description: string;
  category: string;
  askAmount: string;
  rating?: number;
  logo?: string;
  isBookmarked?: boolean;
  type: "watch-later" | "interested" | "feedback";
  className?: string;
  style?: React.CSSProperties;
};
>>>>>>> e45e3245b1213f47e1253058ed42ed1e45a07df9
export default FeedbackGiven;
