'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReelCard from './ReelCard';
// adjust if needed

const reelsData = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    productName: 'Tech Gadget Pro',
    description: 'Next generation technology at your fingertips',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    productName: 'Smart Device X',
    description: 'Revolutionary smart device for modern living',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    productName: 'Digital Assistant',
    description: 'Your personal AI companion',
  },
];

const ReelsView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleSwipeUp = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, reelsData.length - 1));
  };

  const handleSwipeDown = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSwipeRight = () => {
    router.push('/details');
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#1A1F2C]">
      <ReelCard
        {...reelsData[currentIndex]}
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
        onSwipeRight={handleSwipeRight}
      />
    </div>
  );
};

export default ReelsView;
