// @ts-nocheck
'use client';

import { useSwipeable } from 'react-swipeable';
import React, { useEffect, useState } from 'react';
import { Heart, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { useCommonStore } from '@/store/common';
import { toast } from 'react-toastify';
import axios from 'axios'; // ✅ Make sure axios is imported
import { useUser } from '@clerk/nextjs'; // ✅ Assuming Clerk is used for auth

const ShortDetailPage = () => {
  const [startup, setStartup] = useState(null);
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const pitchId = useCommonStore((state) => state.pitchId);

  useEffect(() => {
    const fetchPitchDetails = async () => {
      const pitchRef = ref(db, `pitches/${pitchId?.id}`);
      const snapshot = await get(pitchRef);
      if (snapshot.exists()) {
        setStartup(snapshot.val());
      } else {
        console.log('No data available for this pitch.');
      }
    };

    fetchPitchDetails();
  }, []);

  const handlers = useSwipeable({
    onSwipedRight: () => router.back(),
    onSwipedLeft: () => router.push(`/pitch/${pitchId?.id}/detail`),
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  const handleInterested = async () => {
    try {
      await axios.post('/api/pitch/interested', {
        userId,
        pitchId: pitchId.id,
      });
      toast.success('Marked as Interested');
    } catch (error) {
      toast.error('Failed to mark as Interested');
    }
  };

  const handleSaveLater = async () => {
    try {
      await axios.post('/api/pitch/save', {
        userId,
        pitchId: pitchId.id,
      });
      toast.success('Saved for later');
    } catch (error) {
      toast.error('Failed to save for later');
    }
  };

  if (!startup) return <p>Loading pitch details...</p>;

  return (
    <main
      {...handlers}
      className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-400 font-sans flex flex-col items-center justify-center py-8 px-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-400 opacity-50 backdrop-blur-lg"></div>

      <div className="w-full max-w-lg p-8 bg-white bg-opacity-40 backdrop-blur-lg rounded-xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 tracking-tight">
          {startup.name}
        </h1>

        <p className="text-lg text-center text-purple-600 mb-6">
          {startup.tagline}
        </p>

        <div className="space-y-4">
          <Detail
            label="Founder"
            value={`${startup.founderName} — ${startup.founderTitle}`}
          />
          <Detail label="Problem" value={startup.pitchDetails.problem} />
          <Detail label="Solution" value={startup.pitchDetails.solution} />
          <Detail
            label="Ask Amount"
            value={startup.pitchDetails.askAmount}
            className="font-medium text-purple-700"
          />
          <Detail label="Equity" value={startup.pitchDetails.equity} />
        </div>

        <div className="flex space-x-4 mt-8">
          <Button
            onClick={handleInterested}
            icon={<Heart className="w-5 h-5" />}
            label="I'm Interested"
            primary
          />
          <Button
            onClick={handleSaveLater}
            icon={<Bookmark className="w-5 h-5" />}
            label="Save for Later"
          />
        </div>
      </div>
    </main>
  );
};

const Detail = ({ label, value, className = '' }) => (
  <div className="flex flex-col space-y-1">
    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </p>
    <p className={`text-gray-700 ${className}`}>{value}</p>
    <div className="mt-2 border-b border-gray-200"></div>
  </div>
);

const Button = ({ icon, label, primary = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 
      ${
        primary
          ? 'bg-purple-600 hover:bg-purple-700 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
      }
      text-base font-medium transition-all duration-200`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default ShortDetailPage;
