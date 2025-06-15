
import { Trophy, Star, Flame } from "lucide-react";

interface StreakJourneyTrackerProps {
  currentStreak: number;
  targetStreak: number;
}

const milestones = [
  { day: 7, name: "Week Warrior", icon: "⚡", badge: "First Steps" },
  { day: 30, name: "Month Master", icon: "👑", badge: "Community" },
  { day: 100, name: "Centurion", icon: "💎", badge: "Flame" },
];

export function StreakJourneyTracker({ currentStreak, targetStreak }: StreakJourneyTrackerProps) {
  const progressPercentage = (currentStreak / targetStreak) * 100;
  const nextMilestone = milestones.find(m => m.day > currentStreak);
  
  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 mb-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold mb-2">
          🔥 Day {currentStreak} of {targetStreak}
        </h3>
        {nextMilestone && (
          <p className="text-blue-400">
            Next badge unlocks at Day {nextMilestone.day}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative bg-gray-800 rounded-full h-4 mb-6">
        <div 
          className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {Math.round(progressPercentage)}%
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-0 top-0 w-full h-1 bg-gray-700 rounded"></div>
        <div className="flex justify-between relative">
          {milestones.map((milestone, index) => {
            const isUnlocked = currentStreak >= milestone.day;
            const isNext = milestone.day === nextMilestone?.day;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg mb-2 transition-all ${
                  isUnlocked 
                    ? "bg-green-500 border-green-500 text-white" 
                    : isNext
                    ? "bg-yellow-500/20 border-yellow-500 text-yellow-500 animate-pulse"
                    : "bg-gray-700 border-gray-600 text-gray-400"
                }`}>
                  {isUnlocked ? "✅" : milestone.icon}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-medium ${isUnlocked ? "text-green-400" : isNext ? "text-yellow-400" : "text-gray-500"}`}>
                    Day {milestone.day}
                  </p>
                  <p className={`text-xs ${isUnlocked ? "text-green-300" : isNext ? "text-yellow-300" : "text-gray-500"}`}>
                    {milestone.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
