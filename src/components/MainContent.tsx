
import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
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
    <div className="flex w-full">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 min-h-screen border-r border-gray-800">
        {renderActiveTab()}
      </main>
      {activeTab === "home" && (
        <div className="w-80 p-4 hidden lg:block">
          <div className="bg-gray-900 rounded-2xl p-4">
            <h3 className="text-lg font-bold mb-3">Who to follow</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">@topbuilder</p>
                  <p className="text-sm text-gray-400">🔥 45-day streak</p>
                </div>
                <button className="px-4 py-1 bg-white text-black rounded-full text-sm font-medium">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
