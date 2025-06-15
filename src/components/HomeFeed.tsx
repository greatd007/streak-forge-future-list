import { useState, useEffect } from "react";
import { Heart, MessageCircle, Repeat2, Share, Trophy, Flame, Target } from "lucide-react";
import { UserBadge, BadgeType } from "./UserBadge";
import { StreakFlame } from "./StreakFlame";
import { MoodCheckIn } from "./MoodCheckIn";
import { ReflectionCard } from "./ReflectionCard";
import { SocialShoutout } from "./SocialShoutout";
import { StreakJourneyTracker } from "./StreakJourneyTracker";
import { MilestoneConfetti } from "./MilestoneConfetti";
import { WeeklyDigestCard } from "./WeeklyDigestCard";
import { HiddenAchievements } from "./HiddenAchievements";
import { MiniWidgets } from "./MiniWidgets";

const mockPosts = [
  {
    id: 1,
    user: "@johndoe",
    avatar: "JD",
    content: "Just shipped the authentication system for my SaaS! OAuth integration was trickier than expected but got it working. 💪",
    streak: 15,
    likes: 12,
    comments: 3,
    reposts: 1,
    timestamp: "2h",
    badge: "founder" as BadgeType,
  },
  {
    id: 2,
    user: "@sarahbuilds",
    avatar: "SB",
    content: "Day 30 of building in public! Reached 100 beta users today. The feedback has been incredible. Here's what I learned...",
    streak: 30,
    likes: 28,
    comments: 8,
    reposts: 5,
    timestamp: "4h",
    badge: "influencer" as BadgeType,
  },
  {
    id: 3,
    user: "@devmike",
    avatar: "DM",
    content: "Small win today: fixed that nasty bug that's been haunting me for 3 days. Sometimes you just need fresh eyes! 🐛✅",
    streak: 7,
    likes: 8,
    comments: 2,
    reposts: 0,
    timestamp: "6h",
  },
];

const topBuilders = [
  { name: "@alexbuilds", streak: 67, badge: "founder" as BadgeType },
  { name: "@sarahcodes", streak: 45, badge: "investor" as BadgeType },
  { name: "@mikeship", streak: 38, badge: "influencer" as BadgeType },
];

const motivationalQuotes = [
  "You outlived yesterday's doubt.",
  "Only 1% are still here. You're one of them.",
  "Shipping beats waiting.",
  "Your dream hates flakiness.",
  "Consistency is your superpower.",
];

const streakHistory = [
  { day: "Mon", completed: true },
  { day: "Tue", completed: true },
  { day: "Wed", completed: false },
  { day: "Thu", completed: true },
  { day: "Fri", completed: true },
  { day: "Sat", completed: true },
  { day: "Sun", completed: true },
];

export function HomeFeed() {
  const [postContent, setPostContent] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(12);
  const [randomQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [userMood, setUserMood] = useState<string | null>(null);
  const [showReflection, setShowReflection] = useState(false);
  const [showSocialShoutout, setShowSocialShoutout] = useState(false);
  const [showMilestoneConfetti, setShowMilestoneConfetti] = useState(false);

  // Show reflection card after 10pm
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 22 && checkedIn) {
      setShowReflection(true);
    }
  }, [checkedIn]);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setCurrentStreak(prev => prev + 1);
    setShowMoodCheckIn(true);
    
    // Show milestone confetti for achievements
    if ([7, 30, 100].includes(currentStreak + 1)) {
      setTimeout(() => setShowMilestoneConfetti(true), 1000);
      setTimeout(() => setShowSocialShoutout(true), 4000);
    }
  };

  const handleMoodSelect = (mood: string) => {
    setUserMood(mood);
    setTimeout(() => setShowMoodCheckIn(false), 2000);
  };

  const handleReflectionSubmit = (reflection: string) => {
    console.log("Reflection submitted:", reflection);
    setTimeout(() => setShowReflection(false), 3000);
  };

  const progressPercentage = (currentStreak / 100) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      {/* Streak Journey Tracker */}
      <div className="p-6 border-b border-gray-800">
        <StreakJourneyTracker currentStreak={currentStreak} targetStreak={100} />
      </div>

      {/* Hero Streak Card */}
      <div className="p-6 border-b border-gray-800">
        <div className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 border border-orange-500/30 rounded-3xl p-8 text-center relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-xl"></div>
          
          <div className="relative z-10">
            {/* Progress Ring with Streak Flame */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${progressPercentage * 3.14} 314`}
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6633" />
                    <stop offset="100%" stopColor="#FF3366" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <StreakFlame streakDay={currentStreak} checkedInToday={checkedIn} />
              </div>
            </div>

            {/* Streak Info */}
            <h2 className="text-4xl font-bold mb-2">
              Day {currentStreak} / 100
            </h2>
            <p className="text-orange-400 text-lg mb-4">🔥 {currentStreak}-day streak</p>
            
            {/* Motivational Quote */}
            <p className="text-gray-300 italic mb-6 text-lg">"{randomQuote}"</p>

            {/* Streak History */}
            <div className="flex justify-center gap-2 mb-6">
              {streakHistory.map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`w-3 h-3 rounded-full mb-1 ${
                    day.completed ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-xs text-gray-400">{day.day}</span>
                </div>
              ))}
            </div>

            {/* Check-in Button */}
            {!checkedIn ? (
              <button
                onClick={handleCheckIn}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 animate-pulse"
              >
                🔥 Check in Day {currentStreak + 1}
              </button>
            ) : (
              <div className="bg-green-600/20 border border-green-600 text-green-400 font-bold py-4 px-8 rounded-full text-lg flex items-center gap-3 mx-auto w-fit">
                ✅ Day {currentStreak} secured! 🎉
                {userMood && <span className="ml-2">{
                  userMood === 'focused' ? '💪' : 
                  userMood === 'stressed' ? '😵‍💫' : '😐'
                }</span>}
              </div>
            )}
          </div>
        </div>

        {/* Mood Check-in */}
        <MoodCheckIn 
          show={showMoodCheckIn} 
          onMoodSelect={handleMoodSelect}
        />
      </div>

      {/* Motivation Stats */}
      <div className="p-4 border-b border-gray-800">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-center">
            <p className="text-blue-400 font-bold">#3 in your cohort</p>
            <p className="text-xs text-gray-400">this week</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 text-center">
            <p className="text-purple-400 font-bold">4AM check-in streak: 6</p>
            <p className="text-xs text-gray-400">early bird</p>
          </div>
        </div>
      </div>

      {/* Weekly Digest & Hidden Achievements */}
      <div className="p-4 border-b border-gray-800 space-y-4">
        <WeeklyDigestCard />
        <HiddenAchievements />
      </div>

      {/* Mini Widgets */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-bold mb-4">Your Stats</h3>
        <MiniWidgets 
          longestStreak={28}
          consistencyPercentile={94}
          buildLogs={13}
          daysActive={47}
        />
      </div>

      {/* Mini Leaderboard Preview */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Top Builders
          </h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">
            See full leaderboard →
          </button>
        </div>
        
        <div className="space-y-3">
          {topBuilders.map((builder, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl">
              <span className="text-yellow-500 font-bold">#{index + 1}</span>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                {builder.name.slice(1, 3).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{builder.name}</span>
                  {builder.badge && <UserBadge type={builder.badge} />}
                </div>
              </div>
              <span className="text-orange-500 font-bold">🔥 {builder.streak}d</span>
            </div>
          ))}
        </div>
      </div>

      {/* Post Composer */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
            YU
          </div>
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={`Post your Day ${currentStreak} update...`}
              className="w-full bg-transparent text-xl placeholder-gray-500 resize-none outline-none"
              rows={2}
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">
                Share your progress with the community
              </span>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
                disabled={!postContent.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div>
        {mockPosts.map((post) => (
          <div key={post.id} className="border-b border-gray-800 p-4 hover:bg-gray-900/30 transition-colors">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{post.user}</span>
                  {post.badge && <UserBadge type={post.badge} />}
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500">{post.timestamp}</span>
                  <span className="text-orange-500 font-medium bg-orange-500/10 px-2 py-1 rounded-full text-xs">
                    🔥 Day {post.streak}
                  </span>
                </div>
                <p className="text-gray-100 mb-3 leading-relaxed">{post.content}</p>
                <div className="flex items-center justify-between text-gray-500 max-w-md">
                  <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-green-500/10">
                      <Repeat2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{post.reposts}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-red-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-red-500/10">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="hover:text-blue-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                      <Share className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reflection Card */}
      <ReflectionCard 
        show={showReflection}
        onReflectionSubmit={handleReflectionSubmit}
      />

      {/* Social Shoutout Modal */}
      <SocialShoutout 
        show={showSocialShoutout}
        streakDay={currentStreak}
        onClose={() => setShowSocialShoutout(false)}
      />

      {/* Milestone Confetti */}
      <MilestoneConfetti
        show={showMilestoneConfetti}
        streakDay={currentStreak}
        onClose={() => setShowMilestoneConfetti(false)}
      />
    </div>
  );
}
