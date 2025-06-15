
import { useState, useEffect } from "react";
import { Star, Crown, Zap, X, ArrowRight } from "lucide-react";
import { UserBadge } from "./UserBadge";

interface FounderAccessUpgradeProps {
  show: boolean;
  trigger: "milestone" | "badge-unlock" | "streak-achievement";
  onClose: () => void;
  onUpgrade: () => void;
}

export function FounderAccessUpgrade({ 
  show, 
  trigger, 
  onClose, 
  onUpgrade 
}: FounderAccessUpgradeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }
  }, [show]);

  if (!show) return null;

  const getTriggerMessage = () => {
    switch (trigger) {
      case "milestone":
        return {
          title: "🎉 Milestone Unlocked!",
          subtitle: "You've earned something special",
          message: "Your consistency deserves recognition. Claim your Founder Badge."
        };
      case "badge-unlock":
        return {
          title: "🏆 Badge Earned!",
          subtitle: "You're officially in the builder's club",
          message: "Level up with Founder Access. You've proven you show up."
        };
      case "streak-achievement":
        return {
          title: "🔥 Streak Achievement!",
          subtitle: "You're in rare company now",
          message: "Join the verified founders who never quit building."
        };
      default:
        return {
          title: "✨ You've Earned This",
          subtitle: "Consistency unlocks opportunities",
          message: "Upgrade to Founder Access and show the world you're serious."
        };
    }
  };

  const triggerContent = getTriggerMessage();

  const features = [
    {
      id: "badge",
      icon: <Crown className="w-5 h-5 text-blue-400" />,
      title: "Verified Founder Badge",
      description: "Show your commitment with a blue verified badge",
      preview: "Stand out in the feed with credibility"
    },
    {
      id: "priority",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Priority Leaderboard",
      description: "Get boosted visibility in rankings",
      preview: "Your updates reach more builders"
    },
    {
      id: "features",
      icon: <Star className="w-5 h-5 text-purple-400" />,
      title: "Comment & Reply Access",
      description: "Join conversations, build connections",
      preview: "Engage with the builder community"
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        
        {/* Main Modal */}
        <div className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
          border border-blue-500/30 rounded-3xl max-w-md w-full overflow-hidden
          transform transition-all duration-500 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
          
          {/* Animated Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 
            rounded-3xl animate-pulse"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white 
              transition-colors rounded-full hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Section */}
          <div className="relative p-8 text-center">
            {/* Floating Badge Animation */}
            <div className="relative inline-block mb-6">
              <div className="animate-float-badge">
                <UserBadge type="founder" className="w-16 h-16" />
              </div>
              {/* Sparkle Effects */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full 
                animate-ping opacity-75"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full 
                animate-ping opacity-75 delay-150"></div>
            </div>

            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 
              bg-clip-text text-transparent">
              {triggerContent.title}
            </h2>
            <p className="text-gray-300 mb-1">{triggerContent.subtitle}</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              {triggerContent.message}
            </p>
          </div>

          {/* Features Preview */}
          <div className="px-6 pb-6">
            <div className="space-y-3">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer
                    ${hoveredFeature === feature.id 
                      ? 'bg-blue-500/10 border-blue-500/40 transform scale-[1.02]' 
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      hoveredFeature === feature.id 
                        ? 'bg-blue-500/20 scale-110' 
                        : 'bg-gray-700'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {hoveredFeature === feature.id 
                          ? feature.preview 
                          : feature.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-6 pt-0">
            <button
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                hover:from-blue-500 hover:to-purple-500 text-white font-semibold 
                py-4 px-6 rounded-xl transition-all duration-300 
                hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]
                flex items-center justify-center gap-2 group"
            >
              <span>Claim Your Founder Badge</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-3">
              You've earned this. Join verified founders who ship daily.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-badge {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          33% { 
            transform: translateY(-8px) rotate(2deg);
          }
          66% { 
            transform: translateY(-4px) rotate(-1deg);
          }
        }

        .animate-float-badge {
          animation: float-badge 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
