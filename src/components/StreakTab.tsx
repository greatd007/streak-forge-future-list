
import { useState } from "react";
import { Calendar, CheckCircle, Flame } from "lucide-react";

export function StreakTab() {
  const [checkedIn, setCheckedIn] = useState(false);
  const currentStreak = 12;
  const longestStreak = 28;

  const recentActivity = [
    { date: "Today", status: "pending" },
    { date: "Yesterday", status: "completed" },
    { date: "Dec 13", status: "completed" },
    { date: "Dec 12", status: "completed" },
    { date: "Dec 11", status: "completed" },
    { date: "Dec 10", status: "missed" },
    { date: "Dec 9", status: "completed" },
  ];

  const handleCheckIn = () => {
    setCheckedIn(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <h1 className="text-xl font-bold">Streak</h1>
      </div>

      {/* Main Streak Display */}
      <div className="p-6 text-center border-b border-gray-800">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-lg shadow-orange-500/25">
          <Flame className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-2">
          🔥 {currentStreak}-day streak
        </h2>
        <p className="text-gray-400 mb-6">
          Keep building! Your longest streak was {longestStreak} days.
        </p>
        
        {!checkedIn ? (
          <button
            onClick={handleCheckIn}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 flex items-center gap-3 mx-auto"
          >
            <CheckCircle className="w-6 h-6" />
            Check in today ✅
          </button>
        ) : (
          <div className="bg-green-600/20 border border-green-600 text-green-400 font-bold py-4 px-8 rounded-full text-lg flex items-center gap-3 mx-auto w-fit">
            <CheckCircle className="w-6 h-6" />
            Checked in! 🎉
          </div>
        )}
      </div>

      {/* Streak History */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
            >
              <span className="font-medium">{day.date}</span>
              <div className="flex items-center gap-2">
                {day.status === "completed" && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-500 font-medium">Completed</span>
                  </>
                )}
                {day.status === "pending" && (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
                    <span className="text-gray-500 font-medium">Pending</span>
                  </>
                )}
                {day.status === "missed" && (
                  <>
                    <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                    <span className="text-red-500 font-medium">Missed</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Messages */}
      <div className="p-6 border-t border-gray-800">
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-2">💪 Keep Going!</h3>
          <p className="text-gray-300">
            You're doing amazing! Consistency is the key to success. 
            Just {18} more days to reach your {30}-day milestone! 🎯
          </p>
        </div>
      </div>
    </div>
  );
}
