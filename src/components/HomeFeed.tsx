import React, { useState, useEffect } from 'react';
import { HeroStreakCard } from './HeroStreakCard';
import { MiniFeedPreview } from './MiniFeedPreview';
import { MilestoneConfetti } from './MilestoneConfetti';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import FeedSortBar from './FeedSortBar';
import RightSidebar from './RightSidebar';
import { MoodCheckIn } from './MoodCheckIn';
import { toast } from "@/hooks/use-toast";
import { MotivationModal } from "./MotivationModal";

// Helper keys
const STREAK_COUNT_KEY = "fs_streak_count";
const CHECKED_IN_KEY = "fs_checked_in_today";

// Util: isToday helpers for check-in state
function isToday(dateString: string) {
  const todayStr = new Date().toISOString().slice(0, 10);
  return dateString === todayStr;
}

export function HomeFeed() {
  // main streak state
  const [checkedIn, setCheckedIn] = useState(false);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [showMilestoneConfetti, setShowMilestoneConfetti] = useState(false);
  const [milestoneDay, setMilestoneDay] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Animation reveal
  const [showFeed, setShowFeed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMotivationModal, setShowMotivationModal] = useState(false);

  // For "insane" onboarding animation synchronization:
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [playOnboardingAnim, setPlayOnboardingAnim] = useState(false);

  // -- 1. Load streak and checkin state, handle onboarding state
  useEffect(() => {
    const streakStored = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || "0", 10);
    const checkedInTodayStr = localStorage.getItem(CHECKED_IN_KEY);
    const checkedInToday = checkedInTodayStr && isToday(checkedInTodayStr);
    setCurrentStreak(isNaN(streakStored) ? 0 : streakStored);
    setCheckedIn(!!checkedInToday);

    // Show onboarding only if Day 0 and not checked in
    if ((isNaN(streakStored) || streakStored === 0) && !checkedInToday) {
      setShowOnboarding(true);
    }
  }, []);

  // Onboarding CTA
  const handleStartStreak = () => {
    // Play onboarding "insane" animation:
    setPlayOnboardingAnim(true);
    // Wait for core animation/effects, then trigger check-in flow...
    setTimeout(() => {
      setPlayOnboardingAnim(false);
      setShowOnboarding(false);
      handleCheckIn(); // This triggers Day 1, mood check, feed reveal, etc.
    }, 1800); // Should be a bit longer than streak orb + confetti animation
  };

  // -- 2. Standard check-in flow 
  const handleCheckIn = () => {
    if (!checkedIn) {
      const newStreak = currentStreak + 1;
      setCheckedIn(true);
      setCurrentStreak(newStreak);
      localStorage.setItem(STREAK_COUNT_KEY, String(newStreak));
      localStorage.setItem(CHECKED_IN_KEY, new Date().toISOString().slice(0, 10));
      setShowMoodCheckIn(true);
      if (newStreak === 7 || newStreak === 30 || newStreak === 100) {
        setShowMilestoneConfetti(true);
        setMilestoneDay(newStreak);
      }
      // Show motivation modal only for first check-in
      if (newStreak === 1) setShowMotivationModal(true);
      if (toast && newStreak === 1) {
        toast({
          title: "Day 1 secured.",
          description: "Congrats on starting your streak!",
        });
      }
    }
  };

  // -- 3. Mood Check-in logic 
  useEffect(() => {
    const moodCheckKey = "mood_checkin_date";
    const today = new Date().toISOString().slice(0, 10);
    const alreadyChecked = localStorage.getItem(moodCheckKey) === today;
    if (!checkedIn && !alreadyChecked) {
      const timer = setTimeout(() => {
        if (!checkedIn && localStorage.getItem(moodCheckKey) !== today) {
          setShowMoodCheckIn(true);
        }
      }, 5 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [checkedIn]);

  const handleMoodCheckInClose = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("mood_checkin_date", today);
    setShowMoodCheckIn(false);
  };

  // -- 4. Animate post check-in feed/sidebar
  useEffect(() => {
    if (checkedIn) {
      const feedTimeout = setTimeout(() => setShowFeed(true), 800);
      const sidebarTimeout = setTimeout(() => setShowSidebar(true), 1200);
      return () => {
        clearTimeout(feedTimeout);
        clearTimeout(sidebarTimeout);
      };
    }
  }, [checkedIn]);

  // OVERRIDE: after check-in, always fire onboarding toast if user just started
  useEffect(() => {
    if (checkedIn && currentStreak === 1) {
      // Show "Day 1 secured" toast only on first streak day (after onboarding card)
      if (toast) {
        toast({
          title: "🔥 Day 1 secured. You’re officially in.",
        });
      }
    }
  }, [checkedIn, currentStreak, toast]);

  // -- Render
  return (
    <>
      <MotivationModal
        show={showMotivationModal}
        onClose={() => setShowMotivationModal(false)}
      />

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
        @keyframes onboardingScalePop {
          0% { transform: scale(0.96) translateY(40px); opacity: 0 }
          60% { transform: scale(1.05) translateY(-8px); opacity: 1 }
          100% { transform: scale(1) translateY(0); opacity: 1 }
        }
        .onboarding-scale-pop { animation: onboardingScalePop 1s cubic-bezier(.7,.05,.4,1.2) forwards; }
      `}</style>

      <div className="min-h-screen bg-[#0B0B0F] text-white w-full">
        <div className="flex w-full justify-center">
          {/* --- ONBOARDING DAY 0 CARD --- */}
          {showOnboarding && (
            <div className="flex justify-center items-center min-h-screen w-full">
              <div className="max-w-md w-full px-6">
                <div className="bg-gradient-to-br from-orange-500/10 via-red-500/12 to-purple-600/8 border-2 border-orange-500/25 rounded-3xl p-9 text-center relative shadow-2xl onboarding-scale-pop">
                  {/* Animated FLAME and/or progress orb */}
                  <div className="mb-7 flex flex-col items-center gap-1">
                    {/* Use 3D orb w/ zero progress, play ignite/pulse if animating */}
                    <div className={`transition-transform duration-700 ${playOnboardingAnim ? "scale-110" : ""}`}>
                      <div className="relative">
                        <div className={`transition-all duration-800 ${playOnboardingAnim ? "animate-pulse" : ""}`}>
                          {/* Use StreakOrb3D, force progress 100 if animating */}
                          <div className="mb-2">
                            <span className="block text-[3.75rem] select-none drop-shadow-lg" style={{filter: 'blur(0.5px)'}} role="img">🔥</span>
                          </div>
                        </div>
                        {/* Confetti pop-on-CTA */}
                        {playOnboardingAnim && (
                          <div className="absolute inset-0 pointer-events-none z-20">
                            {[...Array(24)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute"
                                style={{
                                  left: `${50 + (Math.random() - 0.5) * 80}%`,
                                  top: `${48 + (Math.random() - 0.5) * 36}%`,
                                  animation: `confettiPop 1.6s cubic-bezier(.5,1.6,.32,1) both`,
                                  animationDelay: `${Math.random()*0.5}s`,
                                  fontSize: '1.4rem',
                                  filter: 'blur(0.2px)'
                                }}
                              >
                                {["🎉", "🔥", "✨", "⭐", "👑"][Math.floor(Math.random()*5)]}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Card Content */}
                  <div className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent select-none">
                    Day 0 — You haven’t started yet.
                  </div>
                  <div className="text-base text-gray-300 mb-8">
                    Show up once. That’s Day 1.
                  </div>
                  <button
                    className={`w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 transition-all hover:scale-105 active:scale-95 duration-300 shadow-lg shadow-orange-500/30 ring-1 ring-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-400/70 focus:ring-offset-2`}
                    disabled={playOnboardingAnim}
                    onClick={handleStartStreak}
                  >
                    {playOnboardingAnim ? (
                      <span className="animate-pulse">Starting…</span>
                    ) : (
                      "Start My Streak"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- LEGACY STREAK CARD LOGIC (for post-onboarding) --- */}
          {!showOnboarding && currentStreak === 0 && !checkedIn && (
            <div className="flex justify-center items-center min-h-screen w-full">
              <div className="max-w-lg w-full px-4">
                <HeroStreakCard
                  currentStreak={0}
                  checkedInToday={false}
                  onCheckIn={handleCheckIn}
                />
              </div>
            </div>
          )}

          {currentStreak > 0 && !checkedIn && (
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

          {/* Engagement Mode after check-in */}
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
