
import React from "react";

export default function CommunityStatsCard() {
  return (
    <div className="bg-[#18181B] rounded-2xl p-5 shadow-lg border border-gray-800 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-4 text-white">What's Happening</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-blue-400 font-medium hover:bg-gray-800/30 rounded-lg p-2 -m-2 transition-colors">
          <span className="text-2xl">📊</span>
          72 check-ins today
        </div>
        <div className="flex items-center gap-2 text-orange-400 font-medium hover:bg-gray-800/30 rounded-lg p-2 -m-2 transition-colors">
          <span className="text-2xl">🏆</span>
          7 badges unlocked this week
        </div>
        <div className="flex items-center gap-2 text-green-400 font-medium hover:bg-gray-800/30 rounded-lg p-2 -m-2 transition-colors">
          <span className="text-2xl">🔥</span>
          Top Streak: @topbuilder (45d)
        </div>
      </div>
    </div>
  );
}
