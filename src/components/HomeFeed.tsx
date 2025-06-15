
import React, { useState, useEffect } from 'react';
import { HeroStreakCard } from './HeroStreakCard';
import { MiniFeedPreview } from './MiniFeedPreview';
import { CompactStatsCards } from './CompactStatsCards';
import { MoodCheckIn } from './MoodCheckIn';
import { MilestoneConfetti } from './MilestoneConfetti';
import { SocialShoutout } from './SocialShoutout';
import { FounderAccessUpgrade } from './FounderAccessUpgrade';

export function HomeFeed() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const [showMilestoneConfetti, setShowMilestoneConfetti] = useState(false);
  const [milestoneDay, setMilestoneDay] = useState(0);
  const [showSocialShoutout, setShowSocialShoutout] = useState(false);
  const [socialStreakDay, setSocialStreakDay] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(6);
  const [showFounderAccessUpgrade, setShowFounderAccessUpgrade] = useState(false);
  const [upgradeTriggger, setUpgradeTrigger] = useState<"milestone" | "badge-unlock" | "streak-achievement">("milestone");

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
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Hero Streak Card - Main Focus */}
          <HeroStreakCard
            currentStreak={currentStreak}
            checkedInToday={checkedIn}
            onCheckIn={handleCheckIn}
          />

          {/* Compact Stats Cards */}
          <CompactStatsCards
            longestStreak={28}
            totalCheckIns={125}
            weeklyRank={3}
          />

          {/* Mini Feed Preview - Compact */}
          <MiniFeedPreview />
        </div>
      </div>

      {/* Modals */}
      <MoodCheckIn 
        show={showMoodCheckIn} 
        onClose={() => setShowMoodCheckIn(false)} 
      />

      <MilestoneConfetti 
        show={showMilestoneConfetti} 
        streakDay={milestoneDay} 
        onClose={() => setShowMilestoneConfetti(false)} 
      />

      <SocialShoutout 
        show={showSocialShoutout} 
        streakDay={socialStreakDay} 
        onClose={() => setShowSocialShoutout(false)} 
      />

      <FounderAccessUpgrade
        show={showFounderAccessUpgrade}
        trigger={upgradeTriggger}
        onClose={() => setShowFounderAccessUpgrade(false)}
        onUpgrade={handleFounderAccessUpgrade}
      />
    </div>
  );
}
