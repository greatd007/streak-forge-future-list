
import { Flame } from "lucide-react";
import { useState, useEffect } from "react";

interface StreakFlameProps {
  streakDay: number;
  checkedInToday: boolean;
}

export function StreakFlame({ streakDay, checkedInToday }: StreakFlameProps) {
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    if (checkedInToday && streakDay >= 7) {
      const interval = setInterval(() => {
        setPulseIntensity(prev => prev === 1 ? 1.2 : 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [checkedInToday, streakDay]);

  const getFlameStyle = () => {
    if (!checkedInToday) {
      return "text-gray-500 opacity-50"; // Dimmed when not checked in
    }
    
    if (streakDay <= 3) {
      return "text-orange-400 animate-pulse"; // Soft flicker
    } else if (streakDay <= 6) {
      return "text-orange-500 animate-bounce"; // Flame grows
    } else {
      return "text-red-500"; // Hot fire
    }
  };

  const getFlameSize = () => {
    if (streakDay <= 3) return "w-8 h-8";
    if (streakDay <= 6) return "w-10 h-10";
    return "w-12 h-12";
  };

  return (
    <div className="relative">
      <Flame 
        className={`${getFlameSize()} ${getFlameStyle()} transition-all duration-300`}
        style={{ transform: `scale(${pulseIntensity})` }}
      />
      {streakDay >= 7 && checkedInToday && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-20 blur-lg animate-pulse"></div>
      )}
    </div>
  );
}
