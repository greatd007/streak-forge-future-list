
import { Plus } from "lucide-react";

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
  {
    title: "🏅 Founder Access",
    key: "founder-access",
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

interface MobileMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileMenu({ activeTab, onTabChange }: MobileMenuProps) {
  return (
    <div className="h-full bg-black text-white p-0">
      <div className="px-6 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">FoundrStreak</h1>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`w-full text-left px-4 py-3 rounded-full text-lg transition-colors ${
                activeTab === item.key
                  ? "bg-gray-900 font-bold text-white"
                  : "text-white hover:bg-gray-900 hover:text-white"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <button className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-full transition-all duration-200 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
