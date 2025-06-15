
import React, { useState, useEffect } from "react";
import WhoToFollowCard from "./WhoToFollowCard";
import IdeaBankHighlightsCard from "./IdeaBankHighlightsCard";
import CommunityStatsCard from "./CommunityStatsCard";

export default function RightSidebar() {
  const [showWidgets, setShowWidgets] = useState([false, false, false]);

  useEffect(() => {
    // Staggered reveal of sidebar widgets
    const timeouts = [
      setTimeout(() => setShowWidgets(prev => [true, prev[1], prev[2]]), 200),
      setTimeout(() => setShowWidgets(prev => [prev[0], true, prev[2]]), 400),
      setTimeout(() => setShowWidgets(prev => [prev[0], prev[1], true]), 600),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @keyframes widgetSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .widget-animate {
          animation: widgetSlideIn 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      
      <div className="flex flex-col gap-6">
        <div className={showWidgets[0] ? 'widget-animate' : 'opacity-0'}>
          <WhoToFollowCard />
        </div>
        <div className={showWidgets[1] ? 'widget-animate' : 'opacity-0'}>
          <IdeaBankHighlightsCard />
        </div>
        <div className={showWidgets[2] ? 'widget-animate' : 'opacity-0'}>
          <CommunityStatsCard />
        </div>
      </div>
    </>
  );
}
