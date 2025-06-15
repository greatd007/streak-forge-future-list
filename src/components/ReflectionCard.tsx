
import { Lightbulb, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ReflectionCardProps {
  show?: boolean;
  onReflectionSubmit?: (reflection: string) => void;
}

export function ReflectionCard({ show = true, onReflectionSubmit }: ReflectionCardProps) {
  const [reflection, setReflection] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (reflection.trim()) {
      onReflectionSubmit?.(reflection);
      setReflection("");
      setIsExpanded(false);
    }
  };

  if (!show) return null;

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        <h3 className="font-bold text-sm">End of Day Reflection</h3>
      </div>
      
      {!isExpanded ? (
        <div>
          <p className="text-sm text-gray-300 mb-3">
            Still here. That's the win.
          </p>
          <button
            onClick={() => setIsExpanded(true)}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors flex items-center gap-1"
          >
            Write 1 line about today <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What happened today that moved you forward?"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none text-sm"
            rows={2}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSubmit}
              disabled={!reflection.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Reflect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
