import { useState, useEffect, useRef } from "react";
import { Calendar, CheckCircle, Flame, Target, RotateCcw, Trophy, Share, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MoodCheckIn } from "./MoodCheckIn";

const streakBadges = [
  { name: "First Steps", days: 1, unlocked: true, icon: "🚀" },
  { name: "Week Warrior", days: 7, unlocked: true, icon: "⚡" },
  { name: "Consistency King", days: 14, unlocked: false, icon: "👑" },
  { name: "Month Master", days: 30, unlocked: false, icon: "🏆" },
  { name: "Centurion", days: 100, unlocked: false, icon: "💎" },
];

const monthlyData = [
  { date: 1, completed: true }, { date: 2, completed: true }, { date: 3, completed: false },
  { date: 4, completed: true }, { date: 5, completed: true }, { date: 6, completed: true },
  { date: 7, completed: true }, { date: 8, completed: false }, { date: 9, completed: true },
  { date: 10, completed: true }, { date: 11, completed: true }, { date: 12, completed: true },
  { date: 13, completed: true }, { date: 14, completed: false }, { date: 15, completed: true },
];

const consistencyData = [65, 72, 78, 85, 88, 92, 95, 89, 93, 96, 98, 85];

export function StreakTab() {
  // New: Onboarding state
  const [isOnboarding, setIsOnboarding] = useState<boolean | null>(null);
  const [onboardingAnimating, setOnboardingAnimating] = useState(false);

  const [checkedIn, setCheckedIn] = useState(false);
  const [hasGoal, setHasGoal] = useState(true);
  const [commitment, setCommitment] = useState("Ship daily");
  const [duration, setDuration] = useState("30");
  const [newCommitment, setNewCommitment] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [currentStreak, setCurrentStreak] = useState(12);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  
  const longestStreak = 28;
  const consistencyPercentage = 85;

  // Helper: get the date when the streak started
  const STREAK_COUNT_KEY = "fs_streak_count";
  const CHECKED_IN_KEY = "fs_checked_in_today";
  const STREAK_START_DATE_KEY = "fs_streak_start_date";

  // --- New: get/set streak start date on first checkin ---
  useEffect(() => {
    const streakCount = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || "0", 10);
    // If the user has a streak count but no start date, set it now
    if (streakCount > 0 && !localStorage.getItem(STREAK_START_DATE_KEY)) {
      localStorage.setItem(STREAK_START_DATE_KEY, new Date().toISOString().slice(0,10));
    }
  }, []);

  // --- New: Check onboarding state on mount ---
  useEffect(() => {
    const streakStored = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || "0", 10);
    const checkedInTodayStr = localStorage.getItem(CHECKED_IN_KEY);
    const isFreshUser = !streakStored || streakStored < 1;
    setIsOnboarding(isFreshUser);
    if (!isFreshUser) {
      setCurrentStreak(isNaN(streakStored) ? 0 : streakStored);
      // Consider the case if needed: setCheckedIn as well
      const isToday = (dateString: string) => {
        const todayStr = new Date().toISOString().slice(0, 10);
        return dateString === todayStr;
      };
      setCheckedIn(!!(checkedInTodayStr && isToday(checkedInTodayStr)));
    }
    // else <= onboarding: all regular UI will be hidden
  }, []);

  // --- update onboarding logic to also store streak start date ---
  const handleStartDay1 = () => {
    setOnboardingAnimating(true);
    setTimeout(() => {
      const todayStr = new Date().toISOString().slice(0, 10);
      localStorage.setItem(STREAK_COUNT_KEY, "1");
      localStorage.setItem(CHECKED_IN_KEY, todayStr);
      localStorage.setItem(STREAK_START_DATE_KEY, todayStr); // NEW: save first check-in date
      setCurrentStreak(1);
      setCheckedIn(true);
      setTimeout(() => {
        setOnboardingAnimating(false);
        setIsOnboarding(false);
      }, 1400);
    }, 500);
  };

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
      setCurrentStreak(0);
      setCheckedIn(false);
    }
  };

  const nextBadge = streakBadges.find(badge => !badge.unlocked);
  const daysUntilNextBadge = nextBadge ? nextBadge.days - currentStreak : 0;

  useEffect(() => {
    const moodCheckKey = "mood_checkin_date";
    const today = new Date().toISOString().slice(0, 10);
    const alreadyChecked = localStorage.getItem(moodCheckKey) === today;
    // Only show on entry into streak tab if hasGoal & NOT checkedIn & not already shown today
    if (hasGoal && !checkedIn && !alreadyChecked) {
      setShowMoodCheckIn(true);
    }
  }, [hasGoal, checkedIn]);

  const handleMoodCheckInClose = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("mood_checkin_date", today);
    setShowMoodCheckIn(false);
  };

  // --- Calendar month context ---
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // --- NEW: get the streak start day-of-month/index for graph offset ---
  let streakStartDayOfMonth: number | null = null;
  const streakStartStr = localStorage.getItem(STREAK_START_DATE_KEY);
  if (streakStartStr) {
    const streakStartDateObj = new Date(streakStartStr);
    if (
      streakStartDateObj.getFullYear() === year &&
      streakStartDateObj.getMonth() === month
    ) {
      streakStartDayOfMonth = streakStartDateObj.getDate(); // 1-indexed
    }
  }

  // --- Build monthly streak completion data FROM STREAK START ---
  const buildMonthlyData = () => {
    const streakStored = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || "0", 10);
    const checkedInTodayStr = localStorage.getItem(CHECKED_IN_KEY);

    let lastCheckin = streakStored;
    const isTodayChecked = checkedInTodayStr === new Date().toISOString().slice(0, 10);
    if (!isTodayChecked && streakStored > 0) {
      lastCheckin = streakStored - 1;
    }

    // Build the data array for each day with streak start offset/padding
    const arr: { date: number; completed: boolean | null }[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      // If streak didn't start this month or hasn't started yet, everything is null prior to start
      if (!streakStartDayOfMonth || i < streakStartDayOfMonth) {
        arr.push({ date: i, completed: null });
      } else {
        // mark completed if within streak, else false
        const dayIndex = i - streakStartDayOfMonth; // 0 index for first streak day
        arr.push({
          date: i,
          completed: dayIndex < lastCheckin,
        });
      }
    }
    return arr;
  };

  const monthlyData = buildMonthlyData();

  // --- Build consistency data for graph: only from streak start, pad with 0s for days before ---
  const buildConsistencyData = () => {
    const arr: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      if (!streakStartDayOfMonth || i < streakStartDayOfMonth) {
        arr.push(0); // before streak: no bar (gray)
      } else if (i > today.getDate()) {
        arr.push(0); // future
      } else if (monthlyData[i - 1]?.completed) {
        arr.push(100); // completed
      } else if (monthlyData[i - 1]?.completed === false) {
        arr.push(40); // missed
      } else {
        arr.push(0);
      }
    }
    return arr;
  };
  const consistencyData = buildConsistencyData();

  // Show onboarding card if isOnboarding === true
  if (isOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] w-full">
        <style>{`
          @keyframes streakIntroAppear {
            0% { opacity: 0; transform: scale(0.96) translateY(18px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .streak-intro-appear {
            animation: streakIntroAppear 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
          }
          .onboarding-glow {
            box-shadow: 0 0 60px 10px rgba(249, 115, 22, 0.20),
                        0 0 92px 6px rgba(30, 64, 175, 0.18);
            transition: box-shadow 600ms;
          }
          .onboarding-glow.anim {
            box-shadow: 0 0 120px 32px rgba(249,115,22,0.46),
                        0 0 200px 40px rgba(139,92,246,0.14);
          }
          .big-flame-animate {
            animation: flameRingPulse 1.4s cubic-bezier(0.6,0.2,0.4,1) infinite alternate;
          }
          @keyframes flameRingPulse {
            0% { transform: scale(1); filter: brightness(1); }
            70% { transform: scale(1.13); filter: brightness(1.2);}
            100% { transform: scale(1); filter: brightness(1);}
          }
          @keyframes confettiPop {
            0% { transform: translateY(0) scale(0); opacity: 1; }
            60% { transform: translateY(-24px) scale(1.05); opacity: 1; }
            100% { transform: translateY(-34px) scale(1.01); opacity: 0; }
          }
          .confetti-particle {
            animation: confettiPop 1.5s cubic-bezier(.5,1.6,.32,1) forwards;
          }
        `}</style>
        <div className="w-full max-w-sm px-6 streak-intro-appear">
          <div className={`bg-gradient-to-br from-orange-500/10 via-red-500/15 to-purple-500/10
              rounded-3xl p-10 text-center shadow-2xl border-2 border-orange-500/30 relative transition-all duration-700
              ${onboardingAnimating ? "onboarding-glow anim" : "onboarding-glow"}`}>
            <div className="flex flex-col items-center mb-7 relative">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-orange-600 via-orange-500 to-red-500 shadow-xl
                  ${onboardingAnimating ? "big-flame-animate" : ""}`}>
                <span className="text-5xl drop-shadow-lg">🔥</span>
              </div>
              {onboardingAnimating && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(35)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute confetti-particle"
                      style={{
                        left: `${50 + (Math.random() - 0.5) * 80}%`,
                        top: `${48 + (Math.random() - 0.5) * 36}%`,
                        animationDelay: `${Math.random() * 0.6}s`,
                      }}
                    >
                      {['🎉', '🔥', '⭐', '👑', '✨'][Math.floor(Math.random() * 5)]}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent select-none">Start your streak today</div>
            <div className="text-lg text-gray-300 mb-7">Show up once. That’s Day 1.</div>
            <Button
              size="lg"
              className={`w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all hover:scale-105 active:scale-95 duration-300 shadow-lg shadow-orange-500/20`}
              disabled={onboardingAnimating}
              onClick={handleStartDay1}
            >
              Start Day 1
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <MoodCheckIn show={showMoodCheckIn} onClose={handleMoodCheckInClose} />
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Streak</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 flex items-center gap-2"
            >
              <Share className="w-4 h-4" />
              Share
            </Button>
            {hasGoal && (
              <Button
                onClick={() => setHasGoal(false)}
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {!hasGoal ? (
        // Goal Setting
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
                  placeholder="e.g., Ship every day, Write daily, Code 1 hour/day"
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
          {/* Main Streak Display */}
          <div className="p-6 text-center border-b border-gray-800">
            <div className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 border border-orange-500/30 rounded-3xl p-8 mb-6">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-lg shadow-orange-500/25 relative">
                <Flame className="w-16 h-16 text-white" />
                <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {currentStreak}
                </div>
              </div>
              
              <h2 className="text-4xl font-bold mb-2">
                🔥 {currentStreak}-day streak
              </h2>
              
              <p className="text-blue-400 font-bold text-lg mb-4">
                "{commitment}" for {duration} days
              </p>
              
              <div className="bg-gray-800 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStreak / parseInt(duration)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">
                {currentStreak} of {duration} days ({Math.round((currentStreak / parseInt(duration)) * 100)}%)
              </p>
            </div>

            {!checkedIn ? (
              <button
                onClick={handleCheckIn}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 flex items-center gap-3 mx-auto hover:scale-105"
              >
                <CheckCircle className="w-6 h-6" />
                Check in Day {currentStreak + 1} ✅
              </button>
            ) : (
              <div className="bg-green-600/20 border border-green-600 text-green-400 font-bold py-4 px-8 rounded-full text-lg flex items-center gap-3 mx-auto w-fit">
                <CheckCircle className="w-6 h-6" />
                Day {currentStreak} completed! 🎉
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="p-6 border-b border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-orange-500 mb-1">{currentStreak}</p>
                <p className="text-gray-400 text-sm">Current Streak</p>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-green-500 mb-1">{longestStreak}</p>
                <p className="text-gray-400 text-sm">Longest Streak</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-500 mb-1">{consistencyPercentage}%</p>
                <p className="text-gray-400 text-sm">Consistency</p>
              </div>
            </div>
          </div>

          {/* Next Badge Alert */}
          {nextBadge && (
            <div className="p-4 border-b border-gray-800">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-3">
                <div className="text-2xl">{nextBadge.icon}</div>
                <div className="flex-1">
                  <p className="font-bold text-yellow-400">
                    {daysUntilNextBadge} more days until "{nextBadge.name}" badge!
                  </p>
                  <p className="text-sm text-gray-400">Keep going to unlock this milestone</p>
                </div>
              </div>
            </div>
          )}

          {/* Streak Badges */}
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Streak Badges
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {streakBadges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    badge.unlocked
                      ? "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20"
                      : "bg-gray-800 border-gray-700 opacity-50"
                  }`}
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <p className={`font-bold text-sm ${badge.unlocked ? "text-yellow-400" : "text-gray-500"}`}>
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-400">{badge.days} days</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Calendar View */}
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              This Month
            </h3>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs text-gray-400 p-2">
                  {day}
                </div>
              ))}
              {/* Pad empty days at start of the month */}
              {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                <div key={`pad-${idx}`} />
              ))}
              {/* Actual days */}
              {monthlyData.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                    day.completed === true
                      ? "bg-green-500 text-white"
                      : day.completed === false
                      ? "bg-red-500/20 border border-red-500/30 text-red-400"
                      : "bg-gray-800 border border-gray-700 opacity-30" // before streak start
                  }`}
                >
                  {day.date}
                </div>
              ))}
            </div>
          </div>

          {/* Consistency Graph */}
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Consistency Over Time
            </h3>
            <div className="flex items-end gap-[2px] h-20">
              {consistencyData.map((value, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-t transition-all duration-300
          ${value === 100
            ? "bg-gradient-to-t from-blue-500 to-green-400"
            : value === 40
            ? "bg-yellow-400/60"
            : "bg-gray-700/20"}
        `}
                  style={{ height: `${value}%`, minWidth: "4px", maxWidth: "12px" }}
                  title={
                    streakStartDayOfMonth && idx + 1 < streakStartDayOfMonth
                      ? `Day ${idx + 1}: Before Streak`
                      : value === 100
                      ? `Day ${idx + 1}: Success`
                      : value === 40
                      ? `Day ${idx + 1}: Missed`
                      : `Day ${idx + 1}: Not occurred yet`
                  }
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{today.toLocaleString('default', { month: 'short' })} 1</span>
              <span>{today.toLocaleString('default', { month: 'short' })} {daysInMonth}</span>
            </div>
          </div>

          {/* Motivational Section */}
          <div className="p-6">
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-2">💪 Keep Going!</h3>
              <p className="text-gray-300">
                You're in the top 5% of builders who make it past day 10. 
                Just {parseInt(duration) - currentStreak} more days to reach your {duration}-day milestone! 🎯
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
