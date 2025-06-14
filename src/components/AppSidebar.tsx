
import { Home, Plus, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

// Custom icons for the specific features
const StreakIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 7.26L18 9L13.09 10.74L12 16L10.91 10.74L6 9L10.91 7.26L12 2Z" fill="currentColor"/>
    <path d="M5 14L5.5 16.5L8 17L5.5 17.5L5 20L4.5 17.5L2 17L4.5 16.5L5 14Z" fill="currentColor"/>
    <path d="M19 10L19.5 12.5L22 13L19.5 13.5L19 16L18.5 13.5L16 13L18.5 12.5L19 10Z" fill="currentColor"/>
  </svg>
);

const IdeaBankIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 16V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LeaderboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const FounderAccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
  </svg>
);

const menuItems = [
  {
    title: "Home",
    icon: Home,
    key: "home",
  },
  {
    title: "Streak",
    icon: StreakIcon,
    key: "streak",
  },
  {
    title: "Idea Bank",
    icon: IdeaBankIcon,
    key: "idea-bank",
  },
  {
    title: "Leaderboard",
    icon: LeaderboardIcon,
    key: "leaderboard",
  },
  {
    title: "🏅 Founder Access",
    icon: FounderAccessIcon,
    key: "founder-access",
  },
  {
    title: "Profile",
    icon: ProfileIcon,
    key: "profile",
  },
  {
    title: "Settings",
    icon: Settings,
    key: "settings",
  },
];

interface AppSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function AppSidebar({ activeTab = "home", onTabChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-800">
      <SidebarContent className="bg-[#0B0B0F] pt-4">
        <div className="px-6 mb-8">
          <h1 className="text-2xl font-bold text-white">FoundrStreak</h1>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeTab === item.key}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 rounded-full px-4 py-3 text-lg transition-colors"
                  >
                    <button 
                      onClick={() => onTabChange?.(item.key)}
                      className="flex items-center gap-4 w-full"
                    >
                      <item.icon className="w-6 h-6" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-8 px-6">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Post
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
