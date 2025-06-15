
import React, { useState } from 'react';
import { HeroStreakCard } from './HeroStreakCard';
import { MiniFeedPreview } from './MiniFeedPreview';
import { MoodCheckIn } from './MoodCheckIn';
import { MilestoneConfetti } from './MilestoneConfetti';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import FeedSortBar from './FeedSortBar';

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
      const timeout = setTimeout(() => setShowFeed(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [checkedIn]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center w-full">
      <div className="flex flex-col gap-0 w-full items-center">
        {/* Streak Card: visible before check-in, fades out on check-in */}
        <div className={`w-full flex justify-center transition-all duration-500 ${checkedIn ? 'opacity-0 h-0 pointer-events-none' : 'opacity-100 h-auto'}`}>
          <div className="max-w-md w-full pt-12">
            <HeroStreakCard
              currentStreak={currentStreak}
              checkedInToday={checkedIn}
              onCheckIn={handleCheckIn}
            />
          </div>
        </div>
        
        {/* Feed: only reveal after check-in */}
        <div
          className={`w-full flex flex-col items-center transition-all duration-500 ${
            showFeed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          {/* Sticky post CTA */}
          <div className="sticky top-0 z-20 bg-[#0B0B0F]/95 backdrop-blur-md flex flex-col gap-3 items-center w-full max-w-2xl mx-auto px-4 pt-4">
            <Button className="w-full py-3 mb-2 rounded-xl bg-blue-700 hover:bg-blue-800 font-semibold shadow ring-1 ring-blue-500/40">
              Post your Day {currentStreak + 1} update
            </Button>
            <FeedSortBar />
          </div>
          {/* Scrollable feed */}
          <div className="mt-2 pb-4 w-full flex justify-center">
            <ScrollArea className="w-full max-w-2xl h-[70vh] rounded-xl shadow-lg border border-gray-800 bg-[#101017]">
              <MiniFeedPreview />
            </ScrollArea>
          </div>
        </div>
      </div>
      {/* Modals */}
      <MoodCheckIn show={showMoodCheckIn} onClose={() => setShowMoodCheckIn(false)} />
      <MilestoneConfetti show={showMilestoneConfetti} streakDay={milestoneDay} onClose={() => setShowMilestoneConfetti(false)} />
    </div>
  );
}
