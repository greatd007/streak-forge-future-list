
import React from "react";

interface OnboardingFlameProps {
  animating: boolean;
}

export function OnboardingFlame({ animating }: OnboardingFlameProps) {
  return (
    <div className="flex flex-col items-center mb-8 relative">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-orange-600 via-orange-500 to-red-500 shadow-xl
        ${animating ? "big-flame-animate" : ""}`}
      >
        <span className="text-5xl drop-shadow-lg">🔥</span>
      </div>
      {animating && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute confetti-particle"
              style={{
                left: `${50 + (Math.random() - 0.5) * 80}%`,
                top: `${48 + (Math.random() - 0.5) * 36}%`,
                animationDelay: `${Math.random() * 0.6}s`,
              }}
            >
              {["🎉", "🔥", "⭐", "👑", "✨"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
