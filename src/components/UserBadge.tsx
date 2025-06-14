
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
          color: "bg-blue-500",
          hoverText: "Blue badge ($3/month) For all founders just like X",
          icon: <Check className="w-4 h-4 text-white" />
        };
      case "investor":
        return {
          color: "bg-yellow-500",
          hoverText: "Golden badge No money Invite only specially for investors",
          icon: <Check className="w-4 h-4 text-white" />
        };
      case "influencer":
        return {
          color: "bg-purple-500",
          hoverText: "Purple badge($3/month) For influencers",
          icon: <Check className="w-4 h-4 text-white" />
        };
      default:
        return null;
    }
  };

  const config = getBadgeConfig(type);
  if (!config) return null;

  return (
    <div className="relative group">
      <div className={`${config.color} ${className} inline-flex items-center justify-center w-8 h-8 relative`}>
        {/* Star-like badge shape */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 32 32"
            className="w-full h-full"
            fill="currentColor"
          >
            <path d="M16 2L18.5 6.5L24 4.5L22.5 10L28 12L22.5 14L24 19.5L18.5 17.5L16 22L13.5 17.5L8 19.5L9.5 14L4 12L9.5 10L8 4.5L13.5 6.5L16 2Z" />
          </svg>
        </div>
        {/* Checkmark icon */}
        <div className="relative z-10">
          {config.icon}
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <div className="bg-gray-900 text-white text-xs py-2 px-3 rounded shadow-lg whitespace-nowrap max-w-xs">
          {config.hoverText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
