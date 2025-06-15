
import React from "react";
import { Lightbulb, TrendingUp, Bookmark } from "lucide-react";

const ideas = [
  {
    id: 1,
    title: "AI-powered code review assistant",
    upvotes: 41,
    trending: true,
    saved: false,
  },
  {
    id: 2,
    title: "Remote team wellness platform",
    upvotes: 15,
    trending: false,
    saved: false,
  },
  {
    id: 3,
    title: "Subscription cancellation service",
    upvotes: 22,
    trending: true,
    saved: true,
  },
];

export default function IdeaBankHighlightsCard() {
  return (
    <div className="bg-[#18181B] rounded-2xl p-4 shadow-lg border border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-bold">Idea Bank Highlights</h3>
      </div>
      <div className="flex flex-col gap-3">
        {ideas.slice(0, 3).map((idea) => (
          <div key={idea.id} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white truncate">{idea.title}</span>
              {idea.trending && (
                <span className="text-orange-400 flex items-center gap-1 text-xs ml-1"><TrendingUp className="w-3 h-3" />Trending</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-2 py-1 bg-gray-700/40 rounded-full hover:bg-blue-700/30 transition-colors text-sm">
                👍 {idea.upvotes}
              </button>
              <button className={`p-1 rounded-full ${idea.saved ? "text-yellow-400" : "text-gray-400 hover:text-yellow-500"}`}>
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
