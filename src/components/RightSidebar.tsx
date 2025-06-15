
import React from "react";
import WhoToFollowCard from "./WhoToFollowCard";
import IdeaBankHighlightsCard from "./IdeaBankHighlightsCard";
import CommunityStatsCard from "./CommunityStatsCard";

export default function RightSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <WhoToFollowCard />
      <IdeaBankHighlightsCard />
      <CommunityStatsCard />
    </div>
  );
}
