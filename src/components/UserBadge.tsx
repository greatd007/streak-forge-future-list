
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
          color: "bg-blue-600 text-white border-blue-500",
          hoverText: "Verified Founder – $3/month",
          icon: <Check className="w-3 h-3" />
        };
      case "investor":
        return {
          color: "bg-yellow-500 text-black border-yellow-400",
          hoverText: "Invite-only Investor Access",
          icon: <Check className="w-3 h-3" />
        };
      case "influencer":
        return {
          color: "bg-purple-600 text-white border-purple-500",
          hoverText: "Verified Creator – $3/month",
          icon: <Check className="w-3 h-3" />
        };
      default:
        return null;
    }
  };

  const config = getBadgeConfig(type);
  if (!config) return null;

  return (
    <div className="relative group">
      <Badge 
        className={`${config.color} ${className} inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border`}
      >
        {config.icon}
      </Badge>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
          {config.hoverText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
