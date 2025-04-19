'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur pl-4 supports-[backdrop-filter]:bg-background/60 pr-4">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary">PitchReels</h1>
        </div>

        {/* User Button */}
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
