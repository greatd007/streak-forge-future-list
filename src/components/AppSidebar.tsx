import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react"; // <-- Import the bell icon

const menuItems = [
  {
    title: "🏠 Home",
    key: "home",
  },
  {
    title: "🔥 Streak",
    key: "streak",
  },
  {
    title: "💡 Idea Bank",
    key: "idea-bank",
  },
  {
    title: "🏆 Leaderboard",
    key: "leaderboard",
  },
  // Add Founder Access tab with 💎 emoji
  {
    title: (
      <span className="flex items-center gap-2">
        <span role="img" aria-label="Founder Access" className="text-xl">💎</span>
        Founder Access
      </span>
    ),
    key: "founder-access",
  },
  // Notifications tab with 🔔 emoji
  {
    title: (
      <span className="flex items-center gap-2">
        <span role="img" aria-label="Notifications" className="text-xl">🔔</span>
        Notifications
      </span>
    ),
    key: "notifications",
  },
  {
    title: "👤 Profile",
    key: "profile",
  },
  {
    title: "⚙️ Settings",
    key: "settings",
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
                <SidebarMenuItem key={typeof item.title === "string" ? item.key : item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeTab === item.key}
                    className="text-white hover:bg-black hover:text-white rounded-full px-4 py-3 text-lg transition-colors data-[active=true]:bg-black data-[active=true]:font-bold data-[active=true]:text-white"
                  >
                    <button 
                      onClick={() => onTabChange?.(item.key)}
                      className="flex items-center gap-4 w-full text-white hover:text-white"
                    >
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
