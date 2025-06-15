
import React from "react";

interface StreakOrb3DProps {
  /** Progress from 0 to 100 (%) */
  progress: number;
  /** Animate orb (pulse on check-in, glow on idle, etc) */
  isAnimating?: boolean;
  /** Flame or badge to show in the orb center */
  centerIcon?: React.ReactNode;
}

export const StreakOrb3D = ({
  progress,
  isAnimating = false,
  centerIcon,
}: StreakOrb3DProps) => {
  // 0 to 128-px radius, map progress to stroke
  const RADIUS = 66; // for 148x148 svg (big enough for 3D feel)
  const CIRCUM = 2 * Math.PI * RADIUS;
  const arcOffset = CIRCUM * (1 - progress / 100);

  return (
    <div className="relative w-40 h-40 mx-auto select-none pointer-events-none">
      <svg
        viewBox="0 0 148 148"
        className="w-40 h-40 drop-shadow"
        style={{
          filter: isAnimating
            ? "drop-shadow(0 0 14px #fde68a77) brightness(1.04)"
            : "drop-shadow(0 0 8px #fbbf2444) brightness(0.98)",
          transition: "filter 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <defs>
          <radialGradient id="orb-glass" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.56" />
            <stop offset="30%" stopColor="#fef3c7" stopOpacity="0.19" />
            <stop offset="60%" stopColor="#fde68a" stopOpacity="0.13" />
            <stop offset="85%" stopColor="#f59e42" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.08" />
          </radialGradient>
          <linearGradient id="streak-progress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#f59e4288" />
            <stop offset="60%" stopColor="#fbbf2488" />
            <stop offset="100%" stopColor="#fee2b855" />
          </linearGradient>
          <radialGradient id="shine" cx="70%" cy="18%" r="45%">
            <stop offset="5%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-shadow" cx="55%" cy="48%" r="60%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.06" />
            <stop offset="60%" stopColor="#de6e22" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.01" />
          </radialGradient>
        </defs>
        <ellipse
          cx="74"
          cy="130"
          rx="48"
          ry="12"
          fill="url(#orb-shadow)"
          opacity={0.38}
        />
        <circle cx="74" cy="74" r="66"
          fill="url(#orb-glass)"
          stroke="#fbbf24cc"
          strokeWidth="6"
        />
        <ellipse
          cx="110" cy="34"
          rx="22" ry="8"
          fill="url(#shine)"
          style={{ filter: "blur(0.5px)" }}
        />
        <circle
          cx="74"
          cy="74"
          r={RADIUS}
          fill="none"
          stroke="url(#streak-progress)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={CIRCUM}
          strokeDashoffset={arcOffset}
          className={`[transition:stroke-dashoffset_2s_cubic-bezier(0.38,0.14,0.4,1.3)]`}
          style={{
            filter:
              isAnimating
                ? "drop-shadow(0 0 7px #fde68a55)"
                : "drop-shadow(0 0 3px #fbbf2411)",
          }}
          opacity={0.85}
        />
      </svg>
      {/* Subtle animated pulse on orb container */}
      <div
        className={`absolute inset-0 pointer-events-none z-1 rounded-full
          ${isAnimating ? "animate-pulse" : ""}
        `}
        style={{
          boxShadow:
            isAnimating
              ? "0 0 13px 4px #fde68a33, 0 2px 8px #ffedd544"
              : "0 0 5px 1px #fde04722, 0px 0px 2px #fff1ec22",
          transition: "box-shadow 0.33s cubic-bezier(0.58,0.0,0.38,1)",
        }}
      />
      {centerIcon && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          {centerIcon}
        </div>
      )}
    </div>
  );
};
