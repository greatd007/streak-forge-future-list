
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
          hoverText: "Blue badge ($3/month) For all founders just like X",
          glowColor: "shadow-blue-500/50"
        };
      case "investor":
        return {
          color: "bg-gradient-to-r from-yellow-400 to-yellow-500",
          hoverText: "Golden badge No money Invite only specially for investors",
          glowColor: "shadow-yellow-500/50"
        };
      case "influencer":
        return {
          color: "bg-gradient-to-r from-purple-500 to-purple-600",
          hoverText: "Purple badge($3/month) For influencers",
          glowColor: "shadow-purple-500/50"
        };
      default:
        return null;
    }
  };

  const config = getBadgeConfig(type);
  if (!config) return null;

  return (
    <div className="relative group">
      <div className={`${config.color} ${className} w-6 h-6 rounded-full flex items-center justify-center relative overflow-hidden
        transform transition-all duration-300 ease-out
        hover:scale-110 hover:rotate-12 hover:shadow-lg ${config.glowColor}
        animate-pulse hover:animate-none
        before:absolute before:inset-0 before:bg-white/20 before:rounded-full 
        before:scale-0 before:transition-transform before:duration-500
        hover:before:scale-100 hover:before:animate-ping
        after:absolute after:inset-0 after:bg-gradient-to-tr after:from-white/30 after:via-transparent after:to-transparent 
        after:rounded-full after:opacity-0 after:transition-opacity after:duration-300
        hover:after:opacity-100`}>
        
        {/* Animated checkmark */}
        <Check className="w-3.5 h-3.5 text-white relative z-10 
          transform transition-all duration-300 ease-out
          group-hover:scale-125 group-hover:rotate-6
          drop-shadow-sm" 
        />
        
        {/* Sparkle effects */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 
          group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-75"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 
          group-hover:opacity-80 group-hover:animate-pulse transition-all duration-300 delay-150"></div>
      </div>
      
      {/* Enhanced tooltip with animation */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 
        group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20
        group-hover:translate-y-1 group-hover:scale-105">
        <div className="bg-gray-900 text-white text-xs py-2 px-3 rounded-lg shadow-2xl whitespace-nowrap max-w-xs
          border border-gray-700 backdrop-blur-sm
          animate-fade-in">
          {config.hoverText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 
            border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
