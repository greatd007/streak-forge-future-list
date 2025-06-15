
import { Calendar, TrendingUp, MessageSquare, Clock } from "lucide-react";

interface MiniWidgetsProps {
  longestStreak: number;
  consistencyPercentile: number;
  buildLogs: number;
  daysActive: number;
}

export function MiniWidgets({ 
  longestStreak, 
  consistencyPercentile, 
  buildLogs, 
  daysActive 
}: MiniWidgetsProps) {
  const widgets = [
    {
      icon: <Calendar className="w-4 h-4 text-orange-400" />,
      label: "Your longest streak",
      value: `${longestStreak} days`,
      color: "orange"
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-green-400" />,
      label: "Consistency percentile",
      value: `top ${100 - consistencyPercentile}%`,
      color: "green"
    },
    {
      icon: <MessageSquare className="w-4 h-4 text-blue-400" />,
      label: "You've posted",
      value: `${buildLogs} build logs`,
      color: "blue"
    },
    {
      icon: <Clock className="w-4 h-4 text-purple-400" />,
      label: "First check-in was",
      value: `${daysActive} days ago`,
      color: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {widgets.map((widget, index) => (
        <div
          key={index}
          className={`bg-${widget.color}-500/10 border border-${widget.color}-500/30 rounded-xl p-3 text-center`}
        >
          <div className="flex items-center justify-center mb-2">
            {widget.icon}
          </div>
          <p className={`text-${widget.color}-400 font-bold text-sm mb-1`}>
            {widget.value}
          </p>
          <p className="text-xs text-gray-400">{widget.label}</p>
        </div>
      ))}
    </div>
  );
}
