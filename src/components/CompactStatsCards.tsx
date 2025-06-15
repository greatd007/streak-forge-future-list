
import { Trophy, Target, TrendingUp } from 'lucide-react';

interface CompactStatsCardsProps {
  longestStreak: number;
  totalCheckIns: number;
  weeklyRank: number;
}

export function CompactStatsCards({ longestStreak, totalCheckIns, weeklyRank }: CompactStatsCardsProps) {
  const stats = [
    {
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
      label: 'Longest Streak',
      value: `${longestStreak} days`,
    },
    {
      icon: <Target className="w-5 h-5 text-blue-400" />,
      label: 'Total Check-ins',
      value: totalCheckIns.toString(),
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      label: 'This Week',
      value: `#${weeklyRank}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-900/30 border border-gray-700/50 rounded-xl p-4 text-center"
        >
          <div className="flex justify-center mb-2">
            {stat.icon}
          </div>
          <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
          <div className="text-xs text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
