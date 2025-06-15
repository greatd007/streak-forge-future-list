
import { useState } from "react";
import { Moon, PenTool } from "lucide-react";

interface ReflectionCardProps {
  show: boolean;
  onReflectionSubmit: (reflection: string) => void;
}

export function ReflectionCard({ show, onReflectionSubmit }: ReflectionCardProps) {
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!show) return null;

  const handleSubmit = () => {
    if (reflection.trim()) {
      onReflectionSubmit(reflection);
      setSubmitted(true);
    }
  };

  const motivationalMessages = [
    "Still here. That's the win.",
    "You showed up when others didn't.",
    "Another day, another step forward.",
    "Consistency is your superpower.",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 animate-slide-in-right z-50">
      <div className="flex items-center gap-3 mb-4">
        <Moon className="w-6 h-6 text-purple-400" />
        <h3 className="text-lg font-bold">End of Day Reflection</h3>
      </div>
      
      <p className="text-purple-200 mb-4 italic">"{randomMessage}"</p>
      
      {!submitted ? (
        <>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write one line about today..."
            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none mb-4"
            rows={2}
          />
          <button
            onClick={handleSubmit}
            disabled={!reflection.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            <PenTool className="w-4 h-4" />
            Reflect on Day
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-green-400 mb-2">✅ Day reflected on!</p>
          <p className="text-sm text-gray-300">Rest well, build tomorrow.</p>
        </div>
      )}
    </div>
  );
}
