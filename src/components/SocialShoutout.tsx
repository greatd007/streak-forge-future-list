
import { useState } from "react";
import { Share, X, Copy, Check } from "lucide-react";

interface SocialShoutoutProps {
  show: boolean;
  streakDay: number;
  onClose: () => void;
}

export function SocialShoutout({ show, streakDay, onClose }: SocialShoutoutProps) {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const getStreakLevel = () => {
    if (streakDay >= 100) return "Centurion";
    if (streakDay >= 30) return "Month Master";
    if (streakDay >= 7) return "Week Warrior";
    return "First Steps";
  };

  const getTweetText = () => {
    return `${streakDay} days of building. No disappearances. Still shipping.

FoundrStreak made it impossible to quit.

Join the 1% who don't give up: https://foundrstreak.com`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getTweetText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShareToX = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getTweetText())}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/30 rounded-3xl p-8 max-w-md w-full relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔥</div>
          <h2 className="text-2xl font-bold mb-2">
            You've unlocked the {getStreakLevel()}!
          </h2>
          <p className="text-yellow-400">
            {streakDay} days of consistency deserves recognition
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-300 whitespace-pre-line">
            {getTweetText()}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleShareToX}
            className="flex-1 bg-black hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            <Share className="w-4 h-4" />
            Share to X
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </div>
      </div>
    </div>
  );
}
