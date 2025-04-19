// @ts-nocheck
'use client';
import { useSwipeable } from 'react-swipeable';

import React from 'react';
import { Heart, Bookmark, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
const ShortDetailPage = () => {
  const router = useRouter();

  const handlers = useSwipeable({
    onSwipedRight: onSwipeRight,
    onSwipedLeft: onSwipeLeft, // Trigger onSwipeRight when swiped right
    preventScrollOnSwipe: true, // Prevent scrolling when swiping
    trackMouse: true, // Enable mouse tracking (for testing)
    trackTouch: true, // Enable touch tracking
  });

  function onSwipeRight() {
    router.back();
  }

  function onSwipeLeft() {
    router.push(`/pitch/${startup.id}/detail`);
  }

  const startup = {
    name: 'EcoCharge',
    tagline: 'Charging the world sustainably',
    founderName: 'Jane Doe',
    founderTitle: 'CEO & Founder',
    problem:
      'Electric vehicle charging is slow and inaccessible in remote areas.',
    solution: 'Solar-powered EV stations for rapid and eco-friendly charging.',
    askAmount: '$100,000',
    id: '2',
  };

  return (
    <main
      {...handlers}
      className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-400 font-sans flex flex-col items-center justify-center py-8 px-4"
    >
      {/* Glassy Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-400 opacity-50 backdrop-blur-lg"></div>

      {/* Card Container */}
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-40 backdrop-blur-lg rounded-xl shadow-xl space-y-6">
        {/* Startup Name */}
        <h1 className="text-3xl font-bold text-center text-gray-800 tracking-tight">
          {startup.name}
        </h1>

        {/* Startup Tagline */}
        <p className="text-lg text-center text-purple-600 mb-6">
          {startup.tagline}
        </p>

        {/* Startup Details */}
        <div className="space-y-4">
          <Detail
            label="Founder"
            value={`${startup.founderName} — ${startup.founderTitle}`}
          />
          <Detail label="Problem" value={startup.problem} />
          <Detail label="Solution" value={startup.solution} />
          <Detail
            label="Ask Amount"
            value={startup.askAmount}
            className="font-medium text-purple-700"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8">
          <Button
            icon={<Heart className="w-5 h-5" />}
            label="I'm Interested"
            primary={true}
          />
          <Button
            icon={<Bookmark className="w-5 h-5" />}
            label="Save for Later"
            primary={false}
          />
        </div>
      </div>
    </main>
  );
};

// Detail Component
const Detail = ({ label, value, className = '' }) => (
  <div className="flex flex-col space-y-1">
    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </p>
    <p className={`text-gray-700 ${className}`}>{value}</p>
    <div className="mt-2 border-b border-gray-200"></div>
  </div>
);

// Button Component with Icon
const Button = ({ icon, label, primary }) => (
  <button
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
