
import { useState } from "react";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { UserBadge, BadgeType } from "./UserBadge";

const mockLeaderboard = [
  {
    rank: 1,
    username: "@alexbuilds",
    avatar: "AB",
    currentStreak: 67,
    longestStreak: 89,
    consistency: 94,
    points: 2840,
    badge: "founder" as BadgeType,
  },
  {
    rank: 2,
    username: "@sarahcodes",
    avatar: "SC",
    currentStreak: 45,
    longestStreak: 67,
    consistency: 89,
    points: 2156,
    badge: "investor" as BadgeType,
  },
  {
    rank: 3,
    username: "@mikeship",
    avatar: "MS",
    currentStreak: 38,
    longestStreak: 52,
    consistency: 87,
    points: 1943,
    badge: "influencer" as BadgeType,
  },
  {
    rank: 4,
    username: "@janefounder",
    avatar: "JF",
    currentStreak: 29,
    longestStreak: 41,
    consistency: 82,
    points: 1672,
  },
  {
    rank: 5,
    username: "@devtom",
    avatar: "DT",
    currentStreak: 24,
    longestStreak: 35,
    consistency: 78,
    points: 1456,
  },
];

export function LeaderboardTab() {
  const [timeframe, setTimeframe] = useState("all-time");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRankGlow = (rank: number) => {
    switch (rank) {
      case 1:
        return "shadow-lg shadow-yellow-500/25 border border-yellow-500/30";
      case 2:
        return "shadow-lg shadow-gray-400/25 border border-gray-400/30";
      case 3:
        return "shadow-lg shadow-amber-600/25 border border-amber-600/30";
      default:
        return "border border-gray-800";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <h1 className="text-xl font-bold">Leaderboard</h1>
      </div>

      {/* Time Filter */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex gap-2">
          <button
            onClick={() => setTimeframe("weekly")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              timeframe === "weekly"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe("all-time")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              timeframe === "all-time"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All-time
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="p-6 border-b border-gray-800">
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {/* 2nd Place */}
          <div className="text-center pt-8">
            <div className={`w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2 ${getRankGlow(2)}`}>
              {mockLeaderboard[1].avatar}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <p className="font-medium text-sm">{mockLeaderboard[1].username}</p>
              {mockLeaderboard[1].badge && <UserBadge type={mockLeaderboard[1].badge} />}
            </div>
            <p className="text-gray-400 text-xs">🔥 {mockLeaderboard[1].currentStreak}d</p>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className={`w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2 ${getRankGlow(1)}`}>
              {mockLeaderboard[0].avatar}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <p className="font-bold">{mockLeaderboard[0].username}</p>
              {mockLeaderboard[0].badge && <UserBadge type={mockLeaderboard[0].badge} />}
            </div>
            <p className="text-yellow-500 text-sm">🔥 {mockLeaderboard[0].currentStreak}d</p>
            <Trophy className="w-6 h-6 text-yellow-500 mx-auto mt-1" />
          </div>

          {/* 3rd Place */}
          <div className="text-center pt-12">
            <div className={`w-14 h-14 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center font-bold mx-auto mb-2 ${getRankGlow(3)}`}>
              {mockLeaderboard[2].avatar}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <p className="font-medium text-sm">{mockLeaderboard[2].username}</p>
              {mockLeaderboard[2].badge && <UserBadge type={mockLeaderboard[2].badge} />}
            </div>
            <p className="text-gray-400 text-xs">🔥 {mockLeaderboard[2].currentStreak}d</p>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="divide-y divide-gray-800">
        {mockLeaderboard.map((user, index) => (
          <div
            key={user.rank}
            className={`p-4 hover:bg-gray-900/30 transition-colors ${getRankGlow(user.rank)} ${
              user.rank <= 3 ? "bg-gray-900/20" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.rank)}
              </div>

              <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold ${
                user.rank <= 3 ? "shadow-lg" : ""
              }`}>
                {user.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-white">{user.username}</p>
                      {user.badge && <UserBadge type={user.badge} />}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {user.consistency}% consistency
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-500">🔥 {user.currentStreak}d</p>
                    <p className="text-sm text-gray-400">Best: {user.longestStreak}d</p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-blue-400">{user.points.toLocaleString()}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Your Rank */}
      <div className="p-4 border-t-2 border-blue-600 bg-blue-600/5">
        <div className="flex items-center gap-4">
          <span className="w-8 text-center font-bold text-blue-400">#12</span>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
            YU
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-white">@you</p>
              <UserBadge type="founder" />
            </div>
            <p className="text-sm text-gray-400">85% consistency</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-orange-500">🔥 12d</p>
            <p className="text-sm text-gray-400">Best: 28d</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-400">856</p>
            <p className="text-xs text-gray-500">points</p>
          </div>
        </div>
      </div>
    </div>
  );
}
