import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';
import DashboardSidebar from './DashboardSidebar';
import { UserButton } from '@clerk/nextjs';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />

        <main className="flex-1 overflow-x-hidden bg-background">
          <div className="container px-4 md:px-6 py-6 max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <div className="lg:hidden flex justify-between items-center">
                <SidebarTrigger className="lg:hidden" />
                {/* Pitch Reels Logo */}
                <h1 className="text-lg font-bold tracking-tight text-foreground">
                  Pitch Reels
                </h1>
              </div>

              <div className="flex-1" />
              <UserButton></UserButton>
            </div>
            <div className={cn('animate-fade-in', className)}>{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
