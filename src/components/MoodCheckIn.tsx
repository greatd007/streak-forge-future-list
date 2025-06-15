
import { useState } from "react";
import { X } from "lucide-react";

interface MoodCheckInProps {
  show: boolean;
  onClose: () => void;
  onMoodSubmit?: (mood: string) => void;
}

const moodOptions = [
  { emoji: "💪", label: "Focused", value: "focused" },
  { emoji: "😵‍💫", label: "Stressed", value: "stressed" },
  { emoji: "😐", label: "Just showed up", value: "neutral" },
  { emoji: "🔥", label: "On fire", value: "motivated" },
];

export function MoodCheckIn({ show, onClose, onMoodSubmit }: MoodCheckInProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSubmit?.(mood);
    setTimeout(onClose, 1000); // Auto close after selection
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">How are you feeling today?</h3>
          <p className="text-gray-400 text-sm">Your mood helps us understand your journey</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                selectedMood === mood.value
                  ? "bg-blue-500/20 border-blue-500"
                  : "bg-gray-800 border-gray-600 hover:border-gray-500"
              }`}
            >
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
