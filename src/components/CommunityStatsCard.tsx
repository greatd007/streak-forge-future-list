
import React from "react";

export default function CommunityStatsCard() {
  return (
    <div className="bg-[#18181B] rounded-2xl p-4 shadow-lg border border-gray-800">
      <h3 className="text-lg font-bold mb-2">What’s Happening</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-400 font-medium">
          72 check-ins today
        </div>
        <div className="flex items-center gap-2 text-orange-400 font-medium">
          7 badges unlocked this week
        </div>
        <div className="flex items-center gap-2 text-green-400 font-medium">
          Top Streak: @topbuilder (45d)
        </div>
      </div>
    </div>
  );
}
