'use client';
import React from 'react';
import Link from 'next/link';
import { Heart, Bookmark, List } from 'lucide-react';
import { Film } from 'lucide-react';

const BottomNavbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-50">
      <div className="flex justify-between items-center px-8 py-3">
        <Link href="/dashboard/investor/interestedPitches" passHref>
          <div className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <Heart className="h-6 w-6" />
          </div>
        </Link>
        <Link href="/dashboard/investor/feed" passHref>
          <div className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <Film className="h-6 w-6" />
          </div>
        </Link>
        <Link href="/dashboard/investor/watchLater" passHref>
          <div className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <Bookmark className="h-6 w-6" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar;
