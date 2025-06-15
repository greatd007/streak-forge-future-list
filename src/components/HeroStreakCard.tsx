
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
    <div className="relative max-w-lg mx-auto">
      {/* Main Streak Card - Made larger and more prominent */}
      <div className="bg-gradient-to-br from-orange-500/15 via-red-500/15 to-purple-500/15 border-2 border-orange-500/40 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl shadow-orange-500/10">
        
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/8 via-red-500/8 to-purple-500/8 animate-pulse"></div>
        
        {/* Streak Counter - Larger and more prominent */}
        <div className="relative z-10 mb-8">
          <div className="text-7xl font-bold mb-3">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {currentStreak}
            </span>
          </div>
          <div className="text-2xl text-gray-300 mb-2">
            Day{currentStreak !== 1 ? 's' : ''} {getStreakEmoji()}
          </div>
          <div className="text-lg text-blue-400 font-medium">
            Stay consistent, build great things
          </div>
        </div>

        {/* Progress Ring - Slightly larger */}
        <div className="relative w-36 h-36 mx-auto mb-8">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 144 144">
            {/* Background Circle */}
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="rgba(75, 85, 99, 0.3)"
              strokeWidth="14"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="url(#gradient)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 64}`}
              strokeDashoffset={`${2 * Math.PI * 64 * (1 - progressPercentage / 100)}`}
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
            <Flame className={`w-14 h-14 ${checkedInToday ? 'text-orange-400' : 'text-gray-500'} transition-all duration-300`} />
          </div>
        </div>

        {/* Next Milestone */}
        <div className="text-base text-gray-400 mb-8">
          Next milestone: Day {nextMilestone}
        </div>

        {/* Check-in Button - Made larger and more prominent */}
        <button
          onClick={handleCheckIn}
          disabled={checkedInToday}
          className={`relative w-full py-5 px-10 rounded-2xl font-bold text-xl transition-all duration-300 ${
            checkedInToday
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-500/25'
          } ${isAnimating ? 'animate-pulse scale-105' : ''}`}
        >
          {checkedInToday ? (
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6" />
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
