
import { useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { HomeFeed } from "./HomeFeed";
import { StreakTab } from "./StreakTab";
import { IdeaBankTab } from "./IdeaBankTab";
import { LeaderboardTab } from "./LeaderboardTab";
import { ProfileTab } from "./ProfileTab";
import { SettingsTab } from "./SettingsTab";
import { FounderAccessTab } from "./FounderAccessTab";

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

  return (
    <div className="flex w-full min-h-screen bg-black">
      <main className="w-full flex flex-col">
        {/* Sidebar trigger for mobile/desktop */}
        <div className="p-4">
          <SidebarTrigger />
        </div>
        {renderActiveTab()}
      </main>
    </div>
  );
}
