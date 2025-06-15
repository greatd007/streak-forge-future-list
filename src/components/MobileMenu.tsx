
import { Plus, X } from "lucide-react";

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
              className={`w-full text-left px-4 py-3 rounded-full text-lg transition-colors flex items-center gap-3 ${
                activeTab === item.key
                  ? "bg-gray-900 font-bold text-white"
                  : "text-white hover:bg-gray-900 hover:text-white"
              }`}
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
              <span>{item.title}</span>
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
