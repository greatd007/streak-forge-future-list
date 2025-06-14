
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

const menuItems = [
  {
    title: "🏠 Home",
    icon: Home,
    key: "home",
  },
  {
    title: "🔥 Streak",
    icon: Home, // Using Home as placeholder since we're showing emojis
    key: "streak",
  },
  {
    title: "💡 Idea Bank",
    icon: Home,
    key: "idea-bank",
  },
  {
    title: "🏆 Leaderboard",
    icon: Home,
    key: "leaderboard",
  },
  {
    title: "🏅 Founder Access",
    icon: Home,
    key: "founder-access",
  },
  {
    title: "👤 Profile",
    icon: Home,
    key: "profile",
  },
  {
    title: "⚙️ Settings",
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
