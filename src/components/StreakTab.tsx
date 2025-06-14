
import { useState } from "react";
import { Calendar, CheckCircle, Flame, Target, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function StreakTab() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [hasGoal, setHasGoal] = useState(false); // Changed to false to show initial state
  const [commitment, setCommitment] = useState("Ship daily");
  const [duration, setDuration] = useState("30");
  const [newCommitment, setNewCommitment] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0); // Start at 0 for new streaks
  
  const longestStreak = 28;

  const recentActivity = [
    { date: "Today", status: "pending" },
  ];

  const handleCheckIn = () => {
    setCheckedIn(true);
    setCurrentStreak(prev => prev + 1);
  };

  const handleSetGoal = () => {
    if (newCommitment && newDuration) {
      setCommitment(newCommitment);
      setDuration(newDuration);
      setHasGoal(true);
      setNewCommitment("");
      setNewDuration("");
      setCurrentStreak(0); // Reset streak when setting new goal
      setCheckedIn(false); // Reset check-in status
    }
  };

  const handleEditGoal = () => {
    setNewCommitment(commitment);
    setNewDuration(duration);
    setHasGoal(false);
  };

  const handleStartNewStreak = () => {
    setHasGoal(false);
    setCheckedIn(false);
    setNewCommitment("");
    setNewDuration("");
    setCurrentStreak(0); // Reset streak count
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Streak</h1>
          {!hasGoal && (
            <Button
              onClick={handleStartNewStreak}
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Start New Streak
            </Button>
          )}
        </div>
      </div>

      {/* Set Your Streak Goal */}
      {!hasGoal ? (
        <div className="p-6 border-b border-gray-800">
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-500" />
              Set Your Streak
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  What are you committing to?
                </label>
                <Input
                  placeholder="e.g., Ship every day, Write daily, Code 1 hour/day, Reach $1K MRR"
                  value={newCommitment}
                  onChange={(e) => setNewCommitment(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  How long do you want to do it for?
                </label>
                <Select value={newDuration} onValueChange={setNewDuration}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="100">100 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleSetGoal}
                disabled={!newCommitment || !newDuration}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
              >
                Start My Streak
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Current Streak Goal Display */}
          <div className="p-6 border-b border-gray-800">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Your Goal</h3>
                <Button
                  onClick={handleEditGoal}
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </Button>
              </div>
              <p className="text-xl font-medium">
                {currentStreak === 0 ? (
                  <>🚀 Ready to start your {duration}-day journey: <span className="text-blue-400 font-bold">"{commitment}"</span></>
                ) : (
                  <>🔥 You're on a {currentStreak}-day streak toward your {duration}-day build goal: <span className="text-blue-400 font-bold">"{commitment}"</span></>
                )}
              </p>
              <div className="mt-4 bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStreak / parseInt(duration)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {currentStreak} of {duration} days completed ({Math.round((currentStreak / parseInt(duration)) * 100)}%)
              </p>
            </div>
          </div>

          {/* Main Streak Display */}
          <div className="p-6 text-center border-b border-gray-800">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-lg shadow-orange-500/25">
              <Flame className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {currentStreak === 0 ? "🚀 Start your streak!" : `🔥 ${currentStreak}-day streak`}
            </h2>
            <p className="text-gray-400 mb-6">
              {currentStreak === 0 ? (
                "Take your first step towards building consistency!"
              ) : (
                `Keep building! Your longest streak was ${longestStreak} days.`
              )}
            </p>
            
            {!checkedIn ? (
              <button
                onClick={handleCheckIn}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 flex items-center gap-3 mx-auto"
              >
                <CheckCircle className="w-6 h-6" />
                {currentStreak === 0 ? "Start your streak! ✅" : "Check in today ✅"}
              </button>
            ) : (
              <div className="bg-green-600/20 border border-green-600 text-green-400 font-bold py-4 px-8 rounded-full text-lg flex items-center gap-3 mx-auto w-fit">
                <CheckCircle className="w-6 h-6" />
                {currentStreak === 1 ? "Great start! 🎉" : "Checked in! 🎉"}
              </div>
            )}
          </div>
        </>
      )}

      {/* Streak History */}
      {hasGoal && (
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
      )}

      {/* Motivational Messages */}
      {hasGoal && (
        <div className="p-6 border-t border-gray-800">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-2">💪 Keep Going!</h3>
            <p className="text-gray-300">
              {currentStreak === 0 ? (
                "Every expert was once a beginner. Take that first step and start building your streak today! 🎯"
              ) : (
                `You're doing amazing! Consistency is the key to success. Just ${parseInt(duration) - currentStreak} more days to reach your ${duration}-day milestone! 🎯`
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
