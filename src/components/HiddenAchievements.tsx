
import { Moon, Eye, Zap } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  condition: string;
}

const achievements: Achievement[] = [
  {
    id: "night-builder",
    name: "Night Builder",
    description: "Checked in after 11PM",
    icon: "🌙",
    unlocked: true,
    condition: "3 late night check-ins"
  },
  {
    id: "stealth-mode",
    name: "Stealth Mode",
    description: "Building without the noise",
    icon: "👻",
    unlocked: false,
    condition: "5 check-ins without posts"
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "First to check in today",
    icon: "🐦",
    unlocked: true,
    condition: "Check in before 6AM"
  },
  {
    id: "comeback-kid",
    name: "Comeback Kid",
    description: "Restarted after breaking streak",
    icon: "💪",
    unlocked: false,
    condition: "Restart streak 3x"
  }
];

export function HiddenAchievements() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-gray-900/30 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-400" />
          Hidden Achievements
        </h3>
        <span className="text-xs text-gray-400">
          {unlockedCount}/{achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-3 rounded-lg border text-center transition-all ${
              achievement.unlocked
                ? "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20"
                : "bg-gray-800 border-gray-700 opacity-50"
            }`}
          >
            <div className="text-2xl mb-1">
              {achievement.unlocked ? achievement.icon : "🔒"}
            </div>
            <p className={`font-medium text-xs ${
              achievement.unlocked ? "text-purple-400" : "text-gray-500"
            }`}>
              {achievement.unlocked ? achievement.name : "???"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {achievement.unlocked ? achievement.description : achievement.condition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
