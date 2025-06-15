
import { useState } from "react";

interface MoodCheckInProps {
  onMoodSelect: (mood: string) => void;
  show: boolean;
}

const moods = [
  { emoji: "💪", label: "Focused", value: "focused" },
  { emoji: "😵‍💫", label: "Stressed", value: "stressed" },
  { emoji: "😐", label: "Just showed up", value: "showed-up" },
];

export function MoodCheckIn({ onMoodSelect, show }: MoodCheckInProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  if (!show) return null;

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mt-4 animate-fade-in">
      <h3 className="text-lg font-bold mb-4 text-center">How are you feeling today?</h3>
      <div className="flex gap-3 justify-center">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
              selectedMood === mood.value
                ? "bg-blue-600/30 border border-blue-500"
                : "bg-gray-700/50 hover:bg-gray-600/50"
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-sm text-gray-300">{mood.label}</span>
          </button>
        ))}
      </div>
      {selectedMood && (
        <p className="text-center text-green-400 mt-4 text-sm">
          ✅ Mood logged! This helps us understand the founder journey.
        </p>
      )}
    </div>
  );
}
