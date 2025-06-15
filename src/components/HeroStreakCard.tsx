
import { useState, useEffect } from 'react';
import { Flame, CheckCircle } from 'lucide-react';

interface HeroStreakCardProps {
  currentStreak: number;
  checkedInToday: boolean;
  onCheckIn: () => void;
}

export function HeroStreakCard({ currentStreak, checkedInToday, onCheckIn }: HeroStreakCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [countUpValue, setCountUpValue] = useState(0);

  const nextMilestone = currentStreak < 7 ? 7 : currentStreak < 30 ? 30 : currentStreak < 100 ? 100 : 365;
  const progress = (currentStreak / nextMilestone) * 100;

  // Animate counter from 0 to current streak on mount
  useEffect(() => {
    let start = 0;
    const end = currentStreak;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCountUpValue(end);
        clearInterval(timer);
      } else {
        setCountUpValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [currentStreak]);

  // Animate progress ring
  useEffect(() => {
    setTimeout(() => {
      setProgressPercentage(progress);
    }, 800);
  }, [progress]);

  const handleCheckIn = () => {
    if (!checkedInToday) {
      setIsAnimating(true);
      setShowConfetti(true);
      onCheckIn();
      
      setTimeout(() => {
        setIsAnimating(false);
        setShowConfetti(false);
      }, 2000);
    }
  };

  const getStreakEmoji = () => {
    if (currentStreak >= 100) return "💎";
    if (currentStreak >= 30) return "👑";
    if (currentStreak >= 7) return "⚡";
    return "🔥";
  };

  return (
    <>
      <style>{`
        @keyframes bounceGlow {
          0% { transform: scale(1); box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(249, 115, 22, 0.6); }
          100% { transform: scale(1); box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
        }
        
        @keyframes flameRingPulse {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.2); filter: brightness(1.5); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        
        @keyframes confettiPop {
          0% { transform: translateY(0) scale(0); opacity: 1; }
          50% { transform: translateY(-20px) scale(1); opacity: 1; }
          100% { transform: translateY(-40px) scale(0.8); opacity: 0; }
        }
        
        @keyframes progressFill {
          from { stroke-dashoffset: ${2 * Math.PI * 64}; }
          to { stroke-dashoffset: ${2 * Math.PI * 64 * (1 - progressPercentage / 100)}; }
        }
        
        .bounce-glow {
          animation: bounceGlow 0.3s ease-out;
        }
        
        .flame-pulse {
          animation: flameRingPulse 1s ease-out;
        }
        
        .confetti-particle {
          animation: confettiPop 1.5s ease-out forwards;
        }
        
        .progress-animate {
          animation: progressFill 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      
      <div className="relative max-w-lg mx-auto">
        {/* Main Streak Card */}
        <div className="bg-gradient-to-br from-orange-500/15 via-red-500/15 to-purple-500/15 border-2 border-orange-500/40 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl shadow-orange-500/10">
          
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/8 via-red-500/8 to-purple-500/8 animate-pulse"></div>
          
          {/* Streak Counter with animated count-up */}
          <div className="relative z-10 mb-8">
            <div className="text-7xl font-bold mb-3">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                {countUpValue}
              </span>
            </div>
            <div className="text-2xl text-gray-300 mb-2">
              Day{currentStreak !== 1 ? 's' : ''} {getStreakEmoji()}
            </div>
            <div className="text-lg text-blue-400 font-medium">
              Stay consistent, build great things
            </div>
          </div>

          {/* Progress Ring with enhanced animation */}
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
              {/* Progress Circle with smooth animation */}
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
                className="transition-all duration-[2000ms] ease-out"
                style={{ filter: isAnimating ? 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.8))' : 'none' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Flame with pulse animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Flame className={`w-14 h-14 transition-all duration-300 ${
                checkedInToday ? 'text-orange-400' : 'text-gray-500'
              } ${isAnimating ? 'flame-pulse' : ''}`} />
            </div>
          </div>

          {/* Next Milestone */}
          <div className="text-base text-gray-400 mb-8">
            Next milestone: Day {nextMilestone}
          </div>

          {/* Enhanced Check-in Button */}
          <button
            onClick={handleCheckIn}
            disabled={checkedInToday}
            className={`relative w-full py-5 px-10 rounded-2xl font-bold text-xl transition-all duration-300 ${
              checkedInToday
                ? 'bg-green-600 text-white cursor-default'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-500/25'
            } ${isAnimating ? 'bounce-glow' : ''}`}
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

          {/* Premium Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute confetti-particle"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 80}%`,
                    top: `${50 + (Math.random() - 0.5) * 40}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                >
                  {['🎉', '🔥', '⭐', '💎', '👑', '✨'][Math.floor(Math.random() * 6)]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
