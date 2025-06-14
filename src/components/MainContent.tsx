
import { useState } from "react";
import { Menu, ArrowLeft } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { HomeFeed } from "./HomeFeed";
import { StreakTab } from "./StreakTab";
import { IdeaBankTab } from "./IdeaBankTab";
import { LeaderboardTab } from "./LeaderboardTab";
import { ProfileTab } from "./ProfileTab";
import { SettingsTab } from "./SettingsTab";
import { FounderAccessTab } from "./FounderAccessTab";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MainContent() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const getTabTitle = () => {
    switch (activeTab) {
      case "home":
        return "Home";
      case "streak":
        return "Streak";
      case "idea-bank":
        return "Idea Bank";
      case "leaderboard":
        return "Leaderboard";
      case "founder-access":
        return "Founder Access";
      case "profile":
        return "Profile";
      case "settings":
        return "Settings";
      default:
        return "Home";
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleBackToHome = () => {
    setActiveTab("home");
  };

  return (
    <div className="flex w-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Mobile Navigation Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-black/80 hover:bg-black text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-black border-gray-800 p-0">
          <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        </SheetContent>
      </Sheet>

      <main className="flex-1 min-h-screen border-r border-gray-800">
        {/* Mobile Header */}
        {activeTab !== "home" && (
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-black sticky top-0 z-40">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToHome}
              className="text-white hover:bg-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-white">{getTabTitle()}</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        )}

        {activeTab === "home" ? (
          <div className="flex justify-center">
            {renderActiveTab()}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-2xl mx-auto px-6">
              {renderActiveTab()}
            </div>
          </div>
        )}
      </main>

      {/* Desktop Right Panel */}
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
    </div>
  );
}
