
import { useState, useEffect } from "react";
import { Share, X } from "lucide-react";

interface MilestoneConfettiProps {
  show: boolean;
  streakDay: number;
  onClose: () => void;
}

export function MilestoneConfetti({ show, streakDay, onClose }: MilestoneConfettiProps) {
  const [confettiActive, setConfettiActive] = useState(false);
  const [badgePopped, setBadgePopped] = useState(false);

  useEffect(() => {
    if (show) {
      setConfettiActive(true);
      setTimeout(() => setBadgePopped(true), 500);
      const timer = setTimeout(() => setConfettiActive(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  const getMilestoneMessage = () => {
    if (streakDay >= 100) return "🎉 You made it to Day 100!";
    if (streakDay >= 30) return "🎉 You made it to Day 30!";
    if (streakDay >= 7) return "🎉 You made it to Day 7!";
    return "🎉 Milestone achieved!";
  };

  const handleShareToX = () => {
    const tweetText = `${getMilestoneMessage().replace("🎉 ", "")} ${streakDay} days of consistent building with FoundrStreak! 🔥\n\nJoin the 1% who don't give up: https://foundrstreak.com`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <>
      <style>{`
        @keyframes elasticPop {
          0% { 
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          60% { 
            transform: scale(1.2) rotate(10deg);
            opacity: 1;
          }
          80% { 
            transform: scale(0.95) rotate(-5deg);
          }
          100% { 
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes sparkleTrail {
          0% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg);
          }
          50% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg);
          }
          100% { 
            opacity: 0; 
            transform: scale(0.5) rotate(360deg);
          }
        }
        
        @keyframes premiumConfetti {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotateZ(720deg);
            opacity: 0;
          }
        }
        
        @keyframes modalEntry {
          0% {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
            filter: blur(4px);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
            filter: blur(0px);
          }
        }
        
        .badge-pop {
          animation: elasticPop 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .sparkle-trail {
          animation: sparkleTrail 2s ease-out infinite;
        }
        
        .premium-confetti {
          animation: premiumConfetti 3s ease-out forwards;
        }
        
        .modal-entry {
          animation: modalEntry 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        {/* Premium Confetti Animation */}
        {confettiActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute premium-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 20 + 80}%`,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  fontSize: `${Math.random() * 20 + 15}px`,
                }}
              >
                {['🎉', '🔥', '⭐', '💎', '👑', '✨', '🚀', '💫'][Math.floor(Math.random() * 8)]}
              </div>
            ))}
          </div>
        )}

        {/* Modal with enhanced entry animation */}
        <div className="bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/30 rounded-3xl p-8 max-w-md mx-4 text-center relative modal-entry">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Badge with elastic pop */}
          <div className={`text-8xl mb-4 ${badgePopped ? 'badge-pop' : 'opacity-0'}`}>
            🔥
          </div>
          
          {/* Sparkle effects around badge */}
          {badgePopped && (
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute sparkle-trail"
                  style={{
                    left: `${Math.cos(i * Math.PI / 4) * 60}px`,
                    top: `${Math.sin(i * Math.PI / 4) * 60}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          )}
          
          <h2 className="text-3xl font-bold mb-4">{getMilestoneMessage()}</h2>
          <p className="text-yellow-400 mb-6">
            You're officially in the top 5% of consistent builders!
          </p>

          <button
            onClick={handleShareToX}
            className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105 active:scale-95 hover:shadow-lg"
          >
            <Share className="w-4 h-4" />
            Share to X
          </button>
        </div>
      </div>
    </>
  );
}
