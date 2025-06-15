
import { useState } from "react";
import { HomeFeed } from "./HomeFeed";
import { StreakTab } from "./StreakTab";
import { IdeaBankTab } from "./IdeaBankTab";
import { LeaderboardTab } from "./LeaderboardTab";
import { ProfileTab } from "./ProfileTab";
import { SettingsTab } from "./SettingsTab";
import { FounderAccessTab } from "./FounderAccessTab";
import RightSidebar from "./RightSidebar";

export function MainContent() {
  const [activeTab, setActiveTab] = useState("home");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeFeed />;
      case "streak":
        return <StreakTab />;
      case "idea-bank":
        return <IdeaBankTab />;
      case "leaderboard":
        return <LeaderboardTab />;
      case "founder-access":
        return <FounderAccessTab />;
      case "profile":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <HomeFeed />;
    }
  };

  // For this Twitter/X layout, hide the sidebar (left) and mobile menu logic for now.

  return (
    <div className="flex w-full min-h-screen bg-black justify-center">
      {/* Main Feed Column */}
      <main className="flex-1 flex flex-col items-center lg:items-end border-r border-gray-800">
        {renderActiveTab()}
      </main>
      {/* Right Sticky Sidebar (desktop/tablet) */}
      <aside className="hidden lg:block w-[320px] flex-shrink-0 px-4">
        <div className="sticky top-0 pt-10">
          <RightSidebar />
        </div>
      </aside>
    </div>
  );
}
