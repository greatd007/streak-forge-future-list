
import { useState, useEffect } from 'react';
import { Flame, CheckCircle } from 'lucide-react';

interface HeroStreakCardProps {
  currentStreak: number;
  checkedInToday: boolean;
  onCheckIn: () => void;
}

export function HeroStreakCard({ currentStreak, checkedInToday, onCheckIn }: HeroStreakCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const nextMilestone = currentStreak < 7 ? 7 : currentStreak < 30 ? 30 : currentStreak < 100 ? 100 : 365;
  const progress = (currentStreak / nextMilestone) * 100;

  useEffect(() => {
    setProgressPercentage(progress);
  }, [progress]);

  const handleCheckIn = () => {
    if (!checkedInToday) {
      setIsAnimating(true);
      onCheckIn();
      setTimeout(() => setIsAnimating(false), 2000);
    }
  };

  const getStreakEmoji = () => {
    if (currentStreak >= 100) return "💎";
    if (currentStreak >= 30) return "👑";
    if (currentStreak >= 7) return "⚡";
    return "🔥";
  };

  return (
    <div className="relative max-w-md mx-auto">
      {/* Main Streak Card */}
      <div className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10 border-2 border-orange-500/30 rounded-3xl p-8 text-center relative overflow-hidden">
        
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-purple-500/5 animate-pulse"></div>
        
        {/* Streak Counter */}
        <div className="relative z-10 mb-6">
          <div className="text-6xl font-bold mb-2">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {currentStreak}
            </span>
          </div>
          <div className="text-xl text-gray-300 mb-4">
            Day{currentStreak !== 1 ? 's' : ''} {getStreakEmoji()}
          </div>
        </div>

        {/* Progress Ring */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="rgba(75, 85, 99, 0.3)"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Flame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Flame className={`w-12 h-12 ${checkedInToday ? 'text-orange-400' : 'text-gray-500'} transition-all duration-300`} />
          </div>
        </div>

        {/* Next Milestone */}
        <div className="text-sm text-gray-400 mb-6">
          Next milestone: Day {nextMilestone}
        </div>

        {/* Check-in Button */}
        <button
          onClick={handleCheckIn}
          disabled={checkedInToday}
          className={`relative w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ${
            checkedInToday
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white transform hover:scale-105 active:scale-95'
          } ${isAnimating ? 'animate-pulse scale-105' : ''}`}
        >
          {checkedInToday ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Checked In Today!
            </div>
          ) : (
            'Check In Today'
          )}
        </button>

        {/* Confetti Effect */}
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-ping`}
                  style={{
                    left: `${Math.random() * 200 - 100}px`,
                    top: `${Math.random() * 200 - 100}px`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: '1s',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
