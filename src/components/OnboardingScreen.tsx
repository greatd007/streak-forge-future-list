
import React from "react";
import { OnboardingFlame } from "./OnboardingFlame";

interface OnboardingScreenProps {
  animating: boolean;
  onStartDay1: () => void;
  buttonDisabled: boolean;
}
export function OnboardingScreen({
  animating,
  onStartDay1,
  buttonDisabled,
}: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] flex flex-col justify-center items-center w-full">
      <style>{`
        @keyframes streakIntroAppear {
          0% { opacity: 0; transform: scale(0.96) translateY(18px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .streak-intro-appear {
          animation: streakIntroAppear 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .onboarding-glow {
          box-shadow: 0 0 60px 10px rgba(249, 115, 22, 0.20),
                      0 0 92px 6px rgba(30, 64, 175, 0.18);
          transition: box-shadow 600ms;
        }
        .onboarding-glow.anim {
          box-shadow: 0 0 120px 32px rgba(249,115,22,0.46),
                      0 0 200px 40px rgba(139,92,246,0.14);
        }
        .big-flame-animate {
          animation: flameRingPulse 1.4s cubic-bezier(0.6,0.2,0.4,1) infinite alternate;
        }
        @keyframes flameRingPulse {
          0% { transform: scale(1); filter: brightness(1); }
          70% { transform: scale(1.13); filter: brightness(1.2);}
          100% { transform: scale(1); filter: brightness(1);}
        }
        @keyframes confettiPop {
          0% { transform: translateY(0) scale(0); opacity: 1; }
          60% { transform: translateY(-24px) scale(1.05); opacity: 1; }
          100% { transform: translateY(-34px) scale(1.01); opacity: 0; }
        }
        .confetti-particle {
          animation: confettiPop 1.5s cubic-bezier(.5,1.6,.32,1) forwards;
        }
      `}</style>
      <div className="w-full max-w-sm px-6 streak-intro-appear">
        <div
          className={`bg-gradient-to-br from-orange-500/10 via-red-500/15 to-purple-500/10
            rounded-3xl p-10 text-center shadow-2xl border-2 border-orange-500/30 relative transition-all duration-700
            ${animating ? "onboarding-glow anim" : "onboarding-glow"}`}
        >
          <OnboardingFlame animating={animating} />
          <div className="text-2xl md:text-3xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent select-none">
            Build your streak. Don’t disappear.
          </div>
          <div className="text-base md:text-lg text-gray-300 mb-8">
            Check in once a day. We’ll track your momentum.
          </div>
          <button
            className="w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all hover:scale-105 active:scale-95 duration-300 shadow-lg shadow-orange-500/20"
            disabled={buttonDisabled}
            onClick={onStartDay1}
          >
            Start My Streak
          </button>
        </div>
      </div>
    </div>
  );
}
