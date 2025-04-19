import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';
import DashboardSidebar from './DashboardSidebar';

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
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="container px-4 md:px-6 py-6 max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex-1" />
            </div>
            <div className={cn('animate-fade-in', className)}>{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
