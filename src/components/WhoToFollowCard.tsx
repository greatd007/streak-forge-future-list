
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
    <div className="bg-[#18181B] rounded-2xl p-4 shadow-lg border border-gray-800">
      <h3 className="text-lg font-bold mb-3">Who to follow</h3>
      <div className="space-y-3">
        {people.map((p) => (
          <div key={p.username} className="flex items-center gap-3">
            <img
              src={p.avatar}
              alt={p.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{p.username}</p>
              <span className="text-sm text-orange-400">🔥 {p.streak}-day streak</span>
            </div>
            <Button size="sm" className="rounded-full px-4 py-1 bg-white text-black font-medium hover:bg-gray-200">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
