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
import { OnboardingScreen } from "./OnboardingScreen";
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
  const [showMotivationModal, setShowMotivationModal] = useState(false);

  // -- 1. Load onboarding state, streak, checkin state
  useEffect(() => {
    // Load streak from storage
    const streakStored = parseInt(localStorage.getItem(STREAK_COUNT_KEY) || "0", 10);
    const checkedInTodayStr = localStorage.getItem(CHECKED_IN_KEY);
    const checkedInToday = checkedInTodayStr && isToday(checkedInTodayStr);
    setCurrentStreak(isNaN(streakStored) ? 0 : streakStored);
    setCheckedIn(!!checkedInToday);
    // Refactored: onboarding only true if streakStored is null, not if zero
    if (localStorage.getItem(STREAK_COUNT_KEY) === null) {
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

  // -- 3. Onboarding CTA: Start Day 1 (updated for new onboarding)
  const handleStartDay1 = () => {
    setOnboardingAnimating(true);
    setTimeout(() => {
      setOnboardingActive(false);
      setCheckedIn(true);
      setCurrentStreak(1);
      localStorage.setItem(STREAK_COUNT_KEY, "1");
      localStorage.setItem(CHECKED_IN_KEY, new Date().toISOString().slice(0, 10));
      setTimeout(() => {
        setOnboardingAnimating(false);
        setShowFeed(false);
        setShowSidebar(false);
        setTimeout(() => setShowFeed(true), 800);
        setTimeout(() => setShowSidebar(true), 1200);
        setShowMoodCheckIn(true);
        setShowMotivationModal(true);
        if (toast) {
          toast({
            title: "Day 1 secured.",
            description: "Congrats on starting your streak!",
          });
        }
      }, 1800); // Allow onboarding animation time
    }, 700); // Delay for button
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

  // -- 7. Render onboarding only if true AND not in zero streak state
  // (show onboarding only if explicitly active, not for day 0)
  if (onboardingActive) {
    return (
      <OnboardingScreen
        animating={onboardingAnimating}
        onStartDay1={handleStartDay1}
        buttonDisabled={onboardingAnimating}
      />
    );
  }

  // -- 8. Regular main homefeed UI 
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
      `}</style>

      <div className="min-h-screen bg-[#0B0B0F] text-white w-full">
        <div className="flex w-full justify-center">
          {/* BEFORE ANY CHECK-IN: Show 0 day streak card */}
          {currentStreak === 0 && !checkedIn && (
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

          {/* Before Check-In (Day 1 and onward): Focused Mode */}
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

          {/* After Check-In: Engagement Mode */}
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
