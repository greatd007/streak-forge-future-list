
import { TrendingUp, Users } from "lucide-react";

export function WeeklyDigestCard() {
  const weeklyStats = {
    checkIns: 94,
    founders: 67,
    trending: ["@alexbuilds", "@sarahcodes", "@mikeship"]
  };

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        <h3 className="font-bold text-sm">This Week</h3>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-300">
          <span className="text-blue-400 font-bold">{weeklyStats.checkIns}</span> check-ins by{" "}
          <span className="text-purple-400 font-bold">{weeklyStats.founders}</span> founders
        </p>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">
            {weeklyStats.trending.join(", ")} are on fire this week
          </span>
        </div>
      </div>

      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
        See trending builders →
      </button>
    </div>
  );
}
