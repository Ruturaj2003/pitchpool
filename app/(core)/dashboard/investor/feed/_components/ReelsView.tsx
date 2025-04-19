'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReelCard from './ReelCard';

interface Reel {
  id: number;
  videoUrl: string;
  productName: string;
  description: string;
}

const DUMMY_REELS: Reel[] = [
  {
    id: 1,
    videoUrl: '/vid.mp4',
    productName: 'Tech Gadget Pro',
    description: 'Next generation technology at your fingertips',
  },
  {
    id: 2,
    videoUrl: '/vid.mp4',
    productName: 'Smart Device X',
    description: 'Revolutionary smart device for modern living',
  },
  {
    id: 3,
    videoUrl: '/vid.mp4',
    productName: 'Digital Assistant',
    description: 'Your personal AI companion',
  },
];

const ReelsView = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setReels(DUMMY_REELS); // Replace with real API later
  }, []);

  const handleSwipeUp = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, reels.length - 1));
  };

  const handleSwipeDown = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

<<<<<<< Updated upstream
  const handleSwipeLeft = () => {
    const currentReel = reels[currentIndex];
    if (currentReel) {
      router.push(`/pitch/${currentReel.id}/short`);
    }
=======
  const handleSwipeRight = () => {
    router.push('ptich/{id}/details');
>>>>>>> Stashed changes
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