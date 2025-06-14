
import React from "react";
import { Button } from "./ui/button";

const people = [
  {
    username: "@topbuilder",
    streak: 45,
    avatar: "https://avatar.vercel.sh/api/topbuilder",
  },
  {
    username: "@ideamaker",
    streak: 30,
    avatar: "https://avatar.vercel.sh/api/ideamaker",
  },
  {
    username: "@growthhacker",
    streak: 22,
    avatar: "https://avatar.vercel.sh/api/growthhacker",
  },
];

export default function WhoToFollowCard() {
  return (
    <>
      <style>{`
        @keyframes softBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        .hover-lift {
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
        }
        
        .person-hover:hover {
          animation: softBounce 0.6s ease-in-out;
        }
      `}</style>
      
      <div className="bg-[#18181B] rounded-2xl p-5 shadow-lg border border-gray-800 hover-lift">
        <h3 className="text-lg font-semibold mb-4 text-white">Who to follow</h3>
        <div className="space-y-4">
          {people.map((p, index) => (
            <div 
              key={p.username} 
              className="flex items-center gap-3 hover:bg-gray-800/30 rounded-lg p-2 -m-2 transition-all duration-300 person-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={p.avatar}
                alt={p.username}
                className="w-10 h-10 rounded-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="flex-1">
                <p className="font-medium text-white">{p.username}</p>
                <span className="text-sm text-orange-400 font-medium">🔥 {p.streak}-day streak</span>
              </div>
              <Button 
                size="sm" 
                className="rounded-full px-4 py-1 bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
