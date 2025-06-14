
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
        hover:scale-105 hover:shadow-lg ${config.glowColor}`}>
        
        {/* Simple checkmark */}
        <Check className="w-3.5 h-3.5 text-white relative z-10 
          transform transition-all duration-200 ease-out
          drop-shadow-sm" 
        />
      </div>
      
      {/* Simple tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 
        group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <div className="bg-gray-900 text-white text-xs py-2 px-3 rounded-lg shadow-lg whitespace-nowrap max-w-xs
          border border-gray-700">
          {config.hoverText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 
            border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
