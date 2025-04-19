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
      path: '/dashboard',
      count: 12,
    },
    {
      title: 'Feedback Given',
      icon: MessageSquare,
      path: '/dashboard/feedback',
      count: 8,
    },
    {
      title: 'Watch Later',
      icon: Clock,
      path: '/dashboard/watch-later',
      count: 5,
    },
  ];

  const user = useUser();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="py-6">
        <div className="flex items-center px-4">
          <div className="flex items-center space-x-2">
            <div className="bg-shark-purple rounded-md p-1">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">SharkFin</h1>
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
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3 animate-slide-in group-hover:text-shark-purple transition-colors" />
                          <span>{item.title}</span>
                        </div>
                        {item.count > 0 && (
                          <Badge
                            variant="outline"
                            className="ml-auto bg-sidebar-accent text-xs"
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

      <SidebarFooter className="py-4 px-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-shark-purple flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user?.firstName}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Mega Investor</p>
            <p className="text-xs text-sidebar-foreground/70">
              Premium Account
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
