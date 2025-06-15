
import { BellOff } from "lucide-react";

export function NotificationsTab() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-fade-in">
      <div className="relative mb-4">
        <BellOff className="w-16 h-16 text-gray-500 animate-bounce" />
        {/* Simple animated dot to draw attention */}
        <span className="absolute top-0 right-0 block w-4 h-4 rounded-full bg-red-500 animate-ping" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-300 mb-2">No Notifications</h2>
      <p className="text-gray-400 text-center max-w-xs mb-4">
        You're all caught up!<br />
        Check back later for updates.
      </p>
      <div className="mt-8 w-32 h-32">
        {/* Simple pulsing animation */}
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <circle
            cx="64"
            cy="64"
            r="48"
            fill="#64748b"
            opacity="0.10"
            className="animate-pulse"
          />
          <circle
            cx="64"
            cy="64"
            r="32"
            fill="#64748b"
            opacity="0.20"
            className="animate-pulse"
            style={{ animationDelay: "0.3s" }}
          />
        </svg>
      </div>
    </div>
  );
}
