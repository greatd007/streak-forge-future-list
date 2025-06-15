
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { X } from "lucide-react";

const menuItems = [
  {
    title: "Home",
    key: "home",
    emoji: "🏠",
  },
  {
    title: "Streak",
    key: "streak",
    emoji: "🔥",
  },
  {
    title: "Idea Bank",
    key: "idea-bank",
    emoji: "💡",
  },
  {
    title: "Leaderboard",
    key: "leaderboard",
    emoji: "🏆",
  },
  {
    title: "Founder Access",
    key: "founder-access",
    emoji: "💎",
  },
  {
    title: "Notifications",
    key: "notifications",
    emoji: "🔔",
  },
  {
    title: "Profile",
    key: "profile",
    emoji: "👤",
  },
  {
    title: "Settings",
    key: "settings",
    emoji: "⚙️",
  },
];

interface AppSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function AppSidebar({ activeTab = "home", onTabChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-800 bg-black">
      <SidebarContent className="bg-black pt-4">
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
                    className="text-white hover:bg-black hover:text-white rounded-full px-4 py-3 text-lg transition-colors data-[active=true]:bg-black data-[active=true]:font-bold data-[active=true]:text-white"
                  >
                    <button
                      onClick={() => onTabChange?.(item.key)}
                      className="flex items-center gap-3 w-full text-white hover:text-white"
                    >
                      <span 
                        className="text-xl" 
                        role="img" 
                        aria-label={item.title + " emoji"}
                        style={{ color: "white", display: "inline-block", lineHeight: 1 }}
                      >
                        {item.emoji}
                      </span>
                      <X className="w-5 h-5 text-white" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
