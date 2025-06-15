
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

  // Handle animation state for streak card fade & feed in
  const [showFeed, setShowFeed] = useState(false);

  React.useEffect(() => {
    if (checkedIn) {
      // Slight delay for smooth transition
      const timeout = setTimeout(() => setShowFeed(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [checkedIn]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white w-full">
      <div className="flex w-full justify-center">
        {/* Before Check-In: Focused Mode - Only Streak Card */}
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

        {/* After Check-In: Engagement Mode - Feed + Sidebar */}
        {checkedIn && (
          <div className="flex w-full max-w-7xl mx-auto">
            {/* Main Feed Column */}
            <main className="flex-1 flex justify-center">
              <div
                className={`w-full max-w-[680px] transition-all duration-700 ${
                  showFeed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Sticky Post CTA */}
                <div className="sticky top-0 z-20 bg-[#0B0B0F]/95 backdrop-blur-md flex flex-col gap-3 items-center w-full px-4 pt-6 pb-4">
                  <Button className="w-full py-4 mb-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg ring-1 ring-blue-500/40 text-lg hover:shadow-blue-500/25 transition-all">
                    Post your Day {currentStreak} update
                  </Button>
                  <FeedSortBar />
                </div>
                
                {/* Scrollable Feed */}
                <div className="px-4 pb-6">
                  <ScrollArea className="w-full h-[75vh] rounded-xl shadow-xl border border-gray-800 bg-[#101017] hover:shadow-2xl transition-shadow duration-300">
                    <MiniFeedPreview />
                  </ScrollArea>
                </div>
              </div>
            </main>

            {/* Right Sidebar - Only show after check-in */}
            <aside className="hidden lg:block w-[320px] flex-shrink-0 px-4">
              <div 
                className={`sticky top-6 transition-all duration-700 delay-300 ${
                  showFeed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
                <RightSidebar />
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Modals */}
      <MoodCheckIn show={showMoodCheckIn} onClose={() => setShowMoodCheckIn(false)} />
      <MilestoneConfetti show={showMilestoneConfetti} streakDay={milestoneDay} onClose={() => setShowMilestoneConfetti(false)} />
    </div>
  );
}
