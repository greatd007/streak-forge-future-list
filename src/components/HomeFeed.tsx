
import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { UserBadge, BadgeType } from "./UserBadge";

const mockPosts = [
  {
    id: 1,
    user: "@johndoe",
    avatar: "JD",
    content: "Just shipped the authentication system for my SaaS! OAuth integration was trickier than expected but got it working. 💪",
    streak: 15,
    likes: 12,
    comments: 3,
    reposts: 1,
    timestamp: "2h",
    badge: "founder" as BadgeType,
  },
  {
    id: 2,
    user: "@sarahbuilds",
    avatar: "SB",
    content: "Day 30 of building in public! Reached 100 beta users today. The feedback has been incredible. Here's what I learned...",
    streak: 30,
    likes: 28,
    comments: 8,
    reposts: 5,
    timestamp: "4h",
    badge: "influencer" as BadgeType,
  },
  {
    id: 3,
    user: "@devmike",
    avatar: "DM",
    content: "Small win today: fixed that nasty bug that's been haunting me for 3 days. Sometimes you just need fresh eyes! 🐛✅",
    streak: 7,
    likes: 8,
    comments: 2,
    reposts: 0,
    timestamp: "6h",
  },
];

export function HomeFeed() {
  const [postContent, setPostContent] = useState("");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      {/* Post Composer */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
            YU
          </div>
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What did you build today?"
              className="w-full bg-transparent text-xl placeholder-gray-500 resize-none outline-none"
              rows={3}
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">
                🔥 Your streak: 12 days
              </span>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
                disabled={!postContent.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div>
        {mockPosts.map((post) => (
          <div key={post.id} className="border-b border-gray-800 p-4 hover:bg-gray-900/30 transition-colors">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{post.user}</span>
                  {post.badge && <UserBadge type={post.badge} />}
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500">{post.timestamp}</span>
                  <span className="text-orange-500 font-medium">🔥 Day {post.streak}</span>
                </div>
                <p className="text-gray-100 mb-3 leading-relaxed">{post.content}</p>
                <div className="flex items-center justify-between text-gray-500 max-w-md">
                  <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-green-500/10">
                      <Repeat2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{post.reposts}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-red-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-red-500/10">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="hover:text-blue-400 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                      <Share className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
