
import React from "react";

interface MotivationModalProps {
  show: boolean;
  onClose: () => void;
}

export function MotivationModal({ show, onClose }: MotivationModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0F]/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 border border-blue-700 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in">
        <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-orange-400 to-purple-400 bg-clip-text text-transparent">
          Most give up in silence.<br />
          You didn’t.<br />
          Welcome to Day 1.
        </div>
        <button
          className="mt-6 py-3 px-7 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg transition-all hover:scale-105 active:scale-95"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
