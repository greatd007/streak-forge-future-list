
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export type BadgeType = "founder" | "investor" | "influencer";

interface UserBadgeProps {
  type: BadgeType;
  className?: string;
}

export function UserBadge({ type, className = "" }: UserBadgeProps) {
  const getBadgeConfig = (badgeType: BadgeType) => {
    switch (badgeType) {
      case "founder":
        return {
          color: "bg-gradient-to-r from-blue-500 to-blue-600",
          hoverText: "Welcome, Verified Founder. You've committed to consistency. Let's build.",
          glowColor: "shadow-blue-500/50",
          animationClass: "founder-badge"
        };
      case "investor":
        return {
          color: "bg-gradient-to-r from-yellow-400 to-yellow-500",
          hoverText: "Investor Badge Unlocked. Access granted to a network of consistent builders.",
          glowColor: "shadow-yellow-500/50",
          animationClass: "investor-badge"
        };
      case "influencer":
        return {
          color: "bg-gradient-to-r from-purple-500 to-purple-600",
          hoverText: "You're Verified. Your voice matters. Use it to inspire consistency.",
          glowColor: "shadow-purple-500/50",
          animationClass: "influencer-badge"
        };
      default:
        return null;
    }
  };

  const config = getBadgeConfig(type);
  if (!config) return null;

  return (
    <>
      <style jsx>{`
        @keyframes float3d {
          0%, 100% { 
            transform: perspective(100px) rotateX(0deg) rotateY(0deg) translateZ(0px);
          }
          25% { 
            transform: perspective(100px) rotateX(5deg) rotateY(10deg) translateZ(8px);
          }
          50% { 
            transform: perspective(100px) rotateX(0deg) rotateY(20deg) translateZ(12px);
          }
          75% { 
            transform: perspective(100px) rotateX(-5deg) rotateY(10deg) translateZ(8px);
          }
        }

        @keyframes pulseBlue {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.5);
          }
        }

        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }

        @keyframes curtainReveal {
          0% { 
            clip-path: circle(0% at 50% 50%);
            filter: brightness(0.5);
          }
          60% { 
            clip-path: circle(80% at 50% 50%);
            filter: brightness(1.2);
          }
          100% { 
            clip-path: circle(100% at 50% 50%);
            filter: brightness(1);
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes lockOpen {
          0% { transform: rotate(-15deg) scale(0.8); }
          50% { transform: rotate(5deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); }
        }

        @keyframes particleForm {
          0% { 
            opacity: 0;
            transform: scale(0.3) rotate(0deg);
            filter: blur(3px);
          }
          70% { 
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
            filter: blur(0px);
          }
          100% { 
            transform: scale(1) rotate(360deg);
          }
        }

        @keyframes energyWave {
          0%, 100% { 
            background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%);
          }
          50% { 
            background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
          }
        }

        @keyframes checkPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        .founder-badge {
          animation: float3d 4s ease-in-out infinite, pulseBlue 2s ease-in-out infinite;
        }

        .founder-badge:hover::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.4), transparent);
          border-radius: 50%;
          animation: sparkle 1.5s ease-in-out infinite;
          z-index: -1;
        }

        .investor-badge {
          animation: curtainReveal 2s ease-out, lockOpen 1s ease-out 0.5s;
          background: linear-gradient(45deg, #fbbf24, #f59e0b, #fbbf24, #f59e0b);
          background-size: 200% 200%;
        }

        .investor-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          background-size: 200% 100%;
          border-radius: 50%;
          animation: shimmer 2s ease-in-out infinite;
        }

        .influencer-badge {
          animation: particleForm 2s ease-out;
          position: relative;
        }

        .influencer-badge::after {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          border-radius: 50%;
          animation: energyWave 3s ease-in-out infinite;
          z-index: -1;
          pointer-events: none;
        }

        .influencer-badge .check-pulse {
          animation: checkPulse 2s ease-in-out 1s;
        }
      `}</style>
      
      <div className="relative group">
        <div className={`${config.color} ${className} ${config.animationClass} w-6 h-6 rounded-full flex items-center justify-center relative overflow-hidden
          transform transition-all duration-300 ease-out
          hover:scale-110 hover:shadow-xl ${config.glowColor}`}>
          
          <Check className={`w-3.5 h-3.5 text-white relative z-10 drop-shadow-sm ${
            type === 'influencer' ? 'check-pulse' : ''
          }`} />
          
          {/* Founder sparkle effects */}
          {type === 'founder' && (
            <>
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-white rounded-full opacity-0 
                group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white rounded-full opacity-0 
                group-hover:opacity-100 group-hover:animate-ping transition-all duration-300 delay-150"></div>
            </>
          )}
          
          {/* Investor lock effect */}
          {type === 'investor' && (
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/30 via-transparent to-yellow-300/30 
              rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          
          {/* Influencer particle effects */}
          {type === 'influencer' && (
            <>
              <div className="absolute -top-2 -right-2 w-1 h-1 bg-purple-300 rounded-full opacity-0 
                group-hover:opacity-100 transition-all duration-300 animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-purple-300 rounded-full opacity-0 
                group-hover:opacity-100 transition-all duration-300 animate-bounce delay-100"></div>
              <div className="absolute top-0 -left-2 w-0.5 h-0.5 bg-purple-200 rounded-full opacity-0 
                group-hover:opacity-100 transition-all duration-300 animate-pulse delay-200"></div>
            </>
          )}
        </div>
        
        {/* Enhanced tooltip with badge-specific styling */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 
          group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20
          group-hover:translate-y-1">
          <div className={`text-white text-xs py-3 px-4 rounded-lg shadow-2xl whitespace-nowrap max-w-xs
            border backdrop-blur-sm ${
              type === 'founder' ? 'bg-blue-900/90 border-blue-500/50' :
              type === 'investor' ? 'bg-yellow-900/90 border-yellow-500/50' :
              'bg-purple-900/90 border-purple-500/50'
            }`}>
            <div className="font-semibold mb-1">
              {type === 'founder' ? 'Welcome, Verified Founder.' :
               type === 'investor' ? 'Investor Badge Unlocked' :
               'You\'re Verified.'}
            </div>
            <div className="text-xs opacity-90">
              {type === 'founder' ? 'You\'ve committed to consistency. Let\'s build.' :
               type === 'investor' ? 'Access granted to a network of consistent builders.' :
               'Your voice matters. Use it to inspire consistency.'}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 
              border-4 border-transparent border-t-current"></div>
          </div>
        </div>
      </div>
    </>
  );
}
