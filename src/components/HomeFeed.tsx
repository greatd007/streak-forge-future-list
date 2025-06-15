import React, { useState, useEffect } from 'react';
import { HeroStreakCard } from './HeroStreakCard';
import { MiniFeedPreview } from './MiniFeedPreview';
import { MilestoneConfetti } from './MilestoneConfetti';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import FeedSortBar from './FeedSortBar';
import RightSidebar from './RightSidebar';
import { MoodCheckIn } from './MoodCheckIn';

// Helper keys
const STREAK_COUNT_KEY = "fs_streak_count";
const CHECKED_IN_KEY = "fs_checked_in_today";

// Util: isToday helpers for check-in state
function isToday(dateString: string) {
  const todayStr = new Date().toISOString().slice(0, 10);
  return dateString === todayStr;
}

export function HomeFeed() {
  // onboarding flow detection
  const [hasCheckedInBefore, setHasCheckedInBefore] = useState<boolean | null>(null);
  const [onboardingActive, setOnboardingActive] = useState(false);
  const [onboardingAnimating, setOnboardingAnimating] = useState(false);
  // main streak state
  const [checkedIn, setCheckedIn] = useState(false);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [showMilestoneConfetti, setShowMilestoneConfetti] = useState(false);
  const [milestoneDay, setMilestoneDay] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(6);

  // Animation reveal
  const [showFeed, setShowFeed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // -- 1. Load onboarding state, streak, checkin state
  useEffect(() => {
    // Load streak from storage
    const streakStored = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || "0", 10);
    const checkedInTodayStr = localStorage.getItem(CHECKED_IN_KEY);
    const checkedInToday = checkedInTodayStr && isToday(checkedInTodayStr);
    setCurrentStreak(isNaN(streakStored) ? 0 : streakStored);
    setCheckedIn(!!checkedInToday);
    // If no streak data at all, show onboarding
    if (!streakStored || streakStored < 1) {
      setOnboardingActive(true);
      setHasCheckedInBefore(false);
    } else {
      setOnboardingActive(false);
      setHasCheckedInBefore(true);
    }
  }, []);

  // -- 2. Standard check-in flow (not onboarding, after first)
  const handleCheckIn = () => {
    if (!checkedIn) {
      // Update streak count and check-in date in storage
      const newStreak = currentStreak + 1;
      setCheckedIn(true);
      setCurrentStreak(newStreak);
      localStorage.setItem(STREAK_COUNT_KEY, String(newStreak));
      localStorage.setItem(CHECKED_IN_KEY, new Date().toISOString().slice(0, 10));
      setShowMoodCheckIn(true);
      // Confetti for milestones
      if (newStreak === 7 || newStreak === 30 || newStreak === 100) {
        setShowMilestoneConfetti(true);
        setMilestoneDay(newStreak);
      }
    }
  };

  // -- 3. Onboarding CTA: Start Day 1
  const handleStartDay1 = () => {
    // Animate streak card just like a check-in
    setOnboardingAnimating(true);
    setTimeout(() => {
      // Register first day
      setOnboardingActive(false);
      setCheckedIn(true);
      setCurrentStreak(1);
      localStorage.setItem(STREAK_COUNT_KEY, "1");
      localStorage.setItem(CHECKED_IN_KEY, new Date().toISOString().slice(0, 10));
      setTimeout(() => {
        setOnboardingAnimating(false);
        // Staggered reveal (same as normal checked-in)
        setShowFeed(false);
        setShowSidebar(false);
        setTimeout(() => setShowFeed(true), 800);
        setTimeout(() => setShowSidebar(true), 1200);
        setShowMoodCheckIn(true);
      }, 1800); // Allow onboarding animation time (aligned to streak card)
    }, 700); // Delay to allow button "Start Day 1" animation in
  };

  // -- 4. Mood Check-in logic (unchanged except streak state now local)
  useEffect(() => {
    const moodCheckKey = "mood_checkin_date";
    const today = new Date().toISOString().slice(0, 10);
    const alreadyChecked = localStorage.getItem(moodCheckKey) === today;
    if (!checkedIn && !onboardingActive && !alreadyChecked) {
      const timer = setTimeout(() => {
        if (!checkedIn && localStorage.getItem(moodCheckKey) !== today) {
          setShowMoodCheckIn(true);
        }
      }, 5 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [checkedIn, onboardingActive]);

  // -- 5. Mood checkin modal close
  const handleMoodCheckInClose = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("mood_checkin_date", today);
    setShowMoodCheckIn(false);
  };

  // -- 6. Animate post-onboarding feed/sidebar
  useEffect(() => {
    if (checkedIn && !onboardingActive) {
      const feedTimeout = setTimeout(() => setShowFeed(true), 800);
      const sidebarTimeout = setTimeout(() => setShowSidebar(true), 1200);
      return () => {
        clearTimeout(feedTimeout);
        clearTimeout(sidebarTimeout);
      };
    }
  }, [checkedIn, onboardingActive]);

  // -- 7. Render onboarding if onboardingActive
  if (onboardingActive) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex flex-col justify-center items-center w-full">
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
          /* Confetti animation same as main streak card */
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
            {/* Flame mascot/graphic */}
            <div className="flex flex-col items-center mb-7 relative">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-orange-600 via-orange-500 to-red-500 shadow-xl
                  ${onboardingAnimating ? "big-flame-animate" : ""}`}>
                <span className="text-5xl drop-shadow-lg">🔥</span>
              </div>
              {/* Show confetti if animating */}
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

  // -- 8. Regular main homefeed UI 
  return (
    <>
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes staggerFadeIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes streakCardFade {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0.3;
            transform: scale(0.95);
          }
        }
        
        .slide-up-fade {
          animation: slideUpFade 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .stagger-fade-in {
          animation: staggerFadeIn 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .streak-fade-out {
          animation: streakCardFade 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className="min-h-screen bg-[#0B0B0F] text-white w-full">
        <div className="flex w-full justify-center">
          {/* Before Check-In: Focused Mode */}
          {!checkedIn && (
            <div className="flex justify-center items-center min-h-screen w-full">
              <div className="max-w-lg w-full px-4">
                <HeroStreakCard
                  currentStreak={currentStreak}
                  checkedInToday={checkedIn}
                  onCheckIn={handleCheckIn}
                />
              </div>
            </div>
          )}

          {/* After Check-In: Engagement Mode with enhanced transitions */}
          {checkedIn && (
            <div className="flex w-full max-w-7xl mx-auto">
              {/* Main Feed Column */}
              <main className="flex-1 flex justify-center">
                <div
                  className={`w-full max-w-[680px] ${
                    showFeed ? 'slide-up-fade' : 'opacity-0'
                  }`}
                >
                  {/* Sticky Post CTA with smooth entrance */}
                  <div className="sticky top-0 z-20 bg-[#0B0B0F]/95 backdrop-blur-md flex flex-col gap-3 items-center w-full px-4 pt-6 pb-4">
                    <Button className="w-full py-4 mb-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg ring-1 ring-blue-500/40 text-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                      Post your Day {currentStreak} update
                    </Button>
                    <FeedSortBar />
                  </div>
                  
                  {/* Scrollable Feed */}
                  <div className="px-4 pb-6">
                    <ScrollArea className="w-full h-[75vh] rounded-xl shadow-xl border border-gray-800 bg-[#101017] hover:shadow-2xl transition-all duration-500">
                      <MiniFeedPreview />
                    </ScrollArea>
                  </div>
                </div>
              </main>

              {/* Right Sidebar with staggered animation */}
              <aside className="hidden lg:block w-[320px] flex-shrink-0 px-4">
                <div 
                  className={`sticky top-6 ${
                    showSidebar ? 'stagger-fade-in' : 'opacity-0'
                  }`}
                >
                  <RightSidebar />
                </div>
              </aside>
            </div>
          )}
        </div>

        {/* Enhanced Modals */}
        <MoodCheckIn show={showMoodCheckIn} onClose={handleMoodCheckInClose} />
        <MilestoneConfetti show={showMilestoneConfetti} streakDay={milestoneDay} onClose={() => setShowMilestoneConfetti(false)} />
      </div>
    </>
  );
}
