import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Plus, Calendar, Users, TrendingUp, CheckCircle, Flame } from 'lucide-react';
import { StreakJourneyTracker } from './StreakJourneyTracker';
import { MilestoneConfetti } from './MilestoneConfetti';
import { WeeklyDigestCard } from './WeeklyDigestCard';
import { HiddenAchievements } from './HiddenAchievements';
import { MiniWidgets } from './MiniWidgets';
import { StreakFlame } from './StreakFlame';
import { MoodCheckIn } from './MoodCheckIn';
import { ReflectionCard } from './ReflectionCard';
import { SocialShoutout } from './SocialShoutout';
import { FounderAccessUpgrade } from './FounderAccessUpgrade';

interface ActivityItem {
  id: string;
  type: 'check-in' | 'reflection' | 'achievement';
  timestamp: string;
  content: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares: number;
}

const initialActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'check-in',
    timestamp: '2024-02-29T10:30:00',
    content: 'Just shipped a new feature! Feeling productive. #buildinpublic',
    user: {
      name: 'Alex',
      username: '@alexbuilds',
      avatar: 'https://avatar.vercel.sh/api/alex',
    },
    likes: 12,
    comments: 3,
    shares: 1,
  },
  {
    id: '2',
    type: 'reflection',
    timestamp: '2024-02-28T18:00:00',
    content: 'Reflecting on the past week. Learned a lot about user engagement.',
    user: {
      name: 'Sarah',
      username: '@sarahcodes',
      avatar: 'https://avatar.vercel.sh/api/sarah',
    },
    likes: 8,
    comments: 2,
    shares: 0,
  },
  {
    id: '3',
    type: 'achievement',
    timestamp: '2024-02-27T14:45:00',
    content: 'Reached 100 followers! Thanks for the support!',
    user: {
      name: 'Mike',
      username: '@mikeship',
      avatar: 'https://avatar.vercel.sh/api/mike',
    },
    likes: 15,
    comments: 5,
    shares: 2,
  },
];

const streakBadges = [
  { name: "First Steps", days: 1, unlocked: true, icon: "🚀" },
  { name: "Week Warrior", days: 7, unlocked: true, icon: "⚡" },
  { name: "Consistency King", days: 14, unlocked: false, icon: "👑" },
  { name: "Month Master", days: 30, unlocked: false, icon: "🏆" },
  { name: "Centurion", days: 100, unlocked: false, icon: "💎" },
];

export function HomeFeed() {
  const [activity, setActivity] = useState(initialActivity);
  const [newPost, setNewPost] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [showMilestoneConfetti, setShowMilestoneConfetti] = useState(false);
  const [milestoneDay, setMilestoneDay] = useState(0);
  const [showSocialShoutout, setShowSocialShoutout] = useState(false);
  const [socialStreakDay, setSocialStreakDay] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(6);
  const [showFounderAccessUpgrade, setShowFounderAccessUpgrade] = useState(false);
  const [upgradeTriggger, setUpgradeTrigger] = useState<"milestone" | "badge-unlock" | "streak-achievement">("milestone");

  const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(event.target.value);
  };

  const handlePostSubmit = () => {
    if (newPost.trim() !== '') {
      const newActivityItem: ActivityItem = {
        id: String(activity.length + 1),
        type: 'check-in',
        timestamp: new Date().toISOString(),
        content: newPost,
        user: {
          name: 'Your Name',
          username: '@yourusername',
          avatar: 'https://avatar.vercel.sh/api/yourname',
        },
        likes: 0,
        comments: 0,
        shares: 0,
      };
      setActivity([newActivityItem, ...activity]);
      setNewPost('');
    }
  };

  const handleLike = (id: string) => {
    setActivity(
      activity.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleShare = (id: string) => {
    setActivity(
      activity.map((item) =>
        item.id === id ? { ...item, shares: item.shares + 1 } : item
      )
    );
  };

  const handleCheckIn = () => {
    if (!checkedIn) {
      setCheckedIn(true);
      setCurrentStreak(prev => prev + 1);
      setShowMoodCheckIn(true);
      
      // Trigger milestone confetti for specific days
      const newStreak = currentStreak + 1;
      if (newStreak === 7 || newStreak === 30 || newStreak === 100) {
        setShowMilestoneConfetti(true);
        setMilestoneDay(newStreak);
        
        // Show Founder Access upgrade after milestone
        setTimeout(() => {
          setUpgradeTrigger("milestone");
          setShowFounderAccessUpgrade(true);
        }, 3000);
      }
      
      // Check for badge unlocks
      const unlockedBadge = streakBadges.find(badge => badge.days === newStreak);
      if (unlockedBadge) {
        setTimeout(() => {
          setUpgradeTrigger("badge-unlock");
          setShowFounderAccessUpgrade(true);
        }, 1500);
      }

      // Show social shoutout for major milestones
      if (newStreak === 7 || newStreak === 30 || newStreak === 100) {
        setTimeout(() => {
          setShowSocialShoutout(true);
          setSocialStreakDay(newStreak);
        }, 5000);
      }
    }
  };

  const handleFounderAccessUpgrade = () => {
    console.log("Navigating to Founder Access upgrade...");
    setShowFounderAccessUpgrade(false);
    // Here you would navigate to the founder access page
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      {/* Header */}
      <header className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">FoundrStreak</h1>
          <button
            onClick={handleCheckIn}
            disabled={checkedIn}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {checkedIn ? 'Checked In Today!' : 'Check In Today'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto mt-8 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <StreakJourneyTracker />
            <WeeklyDigestCard />
            <HiddenAchievements />
          </div>

          {/* Main Feed */}
          <div className="md:col-span-2">
            {/* Widgets */}
            <MiniWidgets
              longestStreak={28}
              consistencyPercentile={85}
              buildLogs={125}
              daysActive={42}
            />

            {/* Post Input */}
            <div className="mb-6">
              <textarea
                value={newPost}
                onChange={handlePostChange}
                placeholder="Share your progress..."
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handlePostSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Activity Feed */}
            <div>
              {activity.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-xl p-4 mb-4">
                  <div className="flex items-start mb-2">
                    <img
                      src={item.user.avatar}
                      alt={item.user.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-bold">{item.user.name}</div>
                      <div className="text-gray-400 text-sm">
                        {item.user.username} ·{' '}
                        {new Date(item.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">{item.content}</div>
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleLike(item.id)}
                        className="hover:text-white focus:outline-none"
                      >
                        <Heart className="inline-block w-4 h-4 mr-1" />
                        {item.likes} Likes
                      </button>
                      <button className="hover:text-white focus:outline-none ml-3">
                        <MessageCircle className="inline-block w-4 h-4 mr-1" />
                        {item.comments} Comments
                      </button>
                    </div>
                    <button
                      onClick={() => handleShare(item.id)}
                      className="hover:text-white focus:outline-none"
                    >
                      <Share className="inline-block w-4 h-4 mr-1" />
                      {item.shares} Shares
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-1">
            <StreakFlame currentStreak={currentStreak} />
            <ReflectionCard />
          </div>
        </div>
      </div>

      {/* Mood Check-in Modal */}
      <MoodCheckIn show={showMoodCheckIn} onClose={() => setShowMoodCheckIn(false)} />

      {/* Milestone Confetti Modal */}
      <MilestoneConfetti show={showMilestoneConfetti} streakDay={milestoneDay} onClose={() => setShowMilestoneConfetti(false)} />

      {/* Social Shoutout Modal */}
      <SocialShoutout show={showSocialShoutout} streakDay={socialStreakDay} onClose={() => setShowSocialShoutout(false)} />

      {/* Founder Access Upgrade Animation */}
      <FounderAccessUpgrade
        show={showFounderAccessUpgrade}
        trigger={upgradeTriggger}
        onClose={() => setShowFounderAccessUpgrade(false)}
        onUpgrade={handleFounderAccessUpgrade}
      />
    </div>
  );
}
