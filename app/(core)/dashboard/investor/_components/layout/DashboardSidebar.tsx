// @ts-nocheck
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Heart, MessageSquare, Clock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@clerk/nextjs';

const DashboardSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Interested',
      icon: Heart,
      path: '/dashboard/investor/interestedPitches',
      count: 12,
    },
    {
      title: 'Feedback Given',
      icon: MessageSquare,
      path: '/dashboard/investor/feedback',
      count: 8,
    },
    {
      title: 'Watch Later',
      icon: Clock,
      path: '/dashboard/investor/watchLater',
      count: 5,
    },
  ];

  const user = useUser();

  return (
    <Sidebar className="border-r border-gray-300">
      <SidebarHeader className="py-6">
        <div className="flex items-center px-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 rounded-md p-1">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-gray-800">
              Pitch Reels
            </h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.path}
                        className={`flex items-center justify-between px-4 py-2 group font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-blue-50 hover:text-gray-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3 animate-slide-in group-hover:text-blue-500 transition-colors" />
                          <span>{item.title}</span>
                        </div>
                        {item.count > 0 && (
                          <Badge
                            variant="outline"
                            className="ml-auto bg-blue-100 text-xs text-blue-600 border-blue-200"
                          >
                            {item.count}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4 px-4 border-t border-gray-300">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user?.firstName}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">Mega Investor</p>
            <p className="text-xs text-gray-600">Premium Account</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
