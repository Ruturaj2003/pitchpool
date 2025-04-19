'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReelCard from './ReelCard';
import { ref, get } from 'firebase/database';
import { db } from '@/lib/firebase'; // Importing db from firebase.ts
import { useCommonStore } from '@/store/common';

interface Reel {
  id: string;
  videoUrl: string;
  productName: string;
  description: string;
  founderName: string;
  thumbnailUrl: string;
}

const ReelsView = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { pitchId, setCurrentPitch } = useCommonStore();
  useEffect(() => {
    // Fetching data from Firebase Realtime Database
    const fetchReels = async () => {
      const reelsRef = ref(db, 'pitches'); // Reference to the "pitches" node
      const snapshot = await get(reelsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedReels: Reel[] = Object.entries(data).map(
          ([id, pitch]: any) => ({
            id,
            videoUrl: pitch.videoUrl ?? '/fallback.mp4',
            productName: pitch.name,
            description: pitch.description,
            founderName: pitch.founderName,
            thumbnailUrl: pitch.thumbnailUrl ?? '/placeholder.svg',
          })
        );
        setReels(fetchedReels);
      } else {
        console.log('No data available');
      }
    };

    fetchReels();
  }, []);

  const handleSwipeUp = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, reels.length - 1));
  };

  const handleSwipeDown = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSwipeLeft = () => {
    const currentReel = reels[currentIndex];

    if (currentReel) {
      const pitch = {
        id: currentReel.id,
      };
      setCurrentPitch(pitch);
      router.push(`/pitch/${currentReel.id}/short`);
    }
  };

  if (reels.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <ReelCard
        {...reels[currentIndex]}
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
        onSwipeLeft={handleSwipeLeft}
      />
    </div>
  );
};

export default ReelsView;
