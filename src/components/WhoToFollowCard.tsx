
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
    <div className="bg-[#18181B] rounded-2xl p-5 shadow-lg border border-gray-800 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-4 text-white">Who to follow</h3>
      <div className="space-y-4">
        {people.map((p) => (
          <div key={p.username} className="flex items-center gap-3 hover:bg-gray-800/30 rounded-lg p-2 -m-2 transition-colors">
            <img
              src={p.avatar}
              alt={p.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-white">{p.username}</p>
              <span className="text-sm text-orange-400 font-medium">🔥 {p.streak}-day streak</span>
            </div>
            <Button size="sm" className="rounded-full px-4 py-1 bg-white text-black font-medium hover:bg-gray-200 transition-colors">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
