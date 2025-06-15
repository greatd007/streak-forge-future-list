
import { useState, useEffect } from "react";
import { Share, X } from "lucide-react";

interface MilestoneConfettiProps {
  show: boolean;
  streakDay: number;
  onClose: () => void;
}

export function MilestoneConfetti({ show, streakDay, onClose }: MilestoneConfettiProps) {
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    if (show) {
      setConfettiActive(true);
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      {/* Confetti Animation */}
      {confettiActive && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {['🎉', '🔥', '⭐', '💎', '👑'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/30 rounded-3xl p-8 max-w-md mx-4 text-center relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-8xl mb-4">🔥</div>
        <h2 className="text-3xl font-bold mb-4">{getMilestoneMessage()}</h2>
        <p className="text-yellow-400 mb-6">
          You're officially in the top 5% of consistent builders!
        </p>

        <button
          onClick={handleShareToX}
          className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center gap-2 mx-auto"
        >
          <Share className="w-4 h-4" />
          Share to X
        </button>
      </div>
    </div>
  );
}
