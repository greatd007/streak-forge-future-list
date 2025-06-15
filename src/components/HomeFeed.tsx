
import React, { useState } from 'react';
import { HeroStreakCard } from './HeroStreakCard';
import { MiniFeedPreview } from './MiniFeedPreview';
import { MoodCheckIn } from './MoodCheckIn';
import { MilestoneConfetti } from './MilestoneConfetti';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import FeedSortBar from './FeedSortBar';
import RightSidebar from './RightSidebar';

export function HomeFeed() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [showMilestoneConfetti, setShowMilestoneConfetti] = useState(false);
  const [milestoneDay, setMilestoneDay] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(6);

  const handleCheckIn = () => {
    if (!checkedIn) {
      setCheckedIn(true);
      setCurrentStreak(prev => prev + 1);
      setShowMoodCheckIn(true);

      const newStreak = currentStreak + 1;
      if (newStreak === 7 || newStreak === 30 || newStreak === 100) {
        setShowMilestoneConfetti(true);
        setMilestoneDay(newStreak);
      }
    }
  };

  // Enhanced animation states
  const [showFeed, setShowFeed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  React.useEffect(() => {
    if (checkedIn) {
      // Staggered reveal: feed first, then sidebar
      const feedTimeout = setTimeout(() => setShowFeed(true), 800);
      const sidebarTimeout = setTimeout(() => setShowSidebar(true), 1200);
      return () => {
        clearTimeout(feedTimeout);
        clearTimeout(sidebarTimeout);
      };
    }
  }, [checkedIn]);

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
        <MoodCheckIn show={showMoodCheckIn} onClose={() => setShowMoodCheckIn(false)} />
        <MilestoneConfetti show={showMilestoneConfetti} streakDay={milestoneDay} onClose={() => setShowMilestoneConfetti(false)} />
      </div>
    </>
  );
}
