
import { useState } from "react";
import { Heart, Bookmark, Plus, Search, Filter, Lightbulb, TrendingUp, Clock } from "lucide-react";

const mockIdeas = [
  {
    id: 1,
    title: "AI-powered code review assistant",
    description: "A tool that automatically reviews pull requests and suggests improvements based on best practices.",
    tags: ["AI", "Developer Tools", "B2B"],
    upvotes: 23,
    author: "@techfounder",
    authorStreak: 45,
    timestamp: "2d ago",
    saved: false,
    trending: true,
  },
  {
    id: 2,
    title: "Local business discovery app",
    description: "Help people find and support local businesses with AR integration and community reviews.",
    tags: ["Mobile", "Local", "Community"],
    upvotes: 18,
    author: "@localbuilder",
    authorStreak: 22,
    timestamp: "3d ago",
    saved: true,
    trending: false,
  },
  {
    id: 3,
    title: "Subscription cancellation service",
    description: "Automated service that helps users cancel unwanted subscriptions with one click.",
    tags: ["Fintech", "Automation", "Consumer"],
    upvotes: 41,
    author: "@financegeek",
    authorStreak: 67,
    timestamp: "1w ago",
    saved: false,
    trending: true,
  },
  {
    id: 4,
    title: "Remote team wellness platform",
    description: "Track and improve team mental health with daily check-ins and anonymous feedback.",
    tags: ["HR", "Wellness", "SaaS"],
    upvotes: 15,
    author: "@wellnessbuilder",
    authorStreak: 12,
    timestamp: "5d ago",
    saved: false,
    trending: false,
  },
];

const trendingTags = ["AI", "SaaS", "Fintech", "Developer Tools", "Consumer"];

export function IdeaBankTab() {
  const [ideas, setIdeas] = useState(mockIdeas);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  const toggleUpvote = (ideaId: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === ideaId 
        ? { ...idea, upvotes: idea.upvotes + 1 }
        : idea
    ));
  };

  const toggleSave = (ideaId: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === ideaId 
        ? { ...idea, saved: !idea.saved }
        : idea
    ));
  };

  const filteredIdeas = ideas
    .filter(idea => selectedFilter === "all" || idea.tags.includes(selectedFilter))
    .filter(idea => idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   idea.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "trending") return b.upvotes - a.upvotes;
      if (sortBy === "recent") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      return 0;
    });

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h1 className="text-xl font-bold">Idea Bank</h1>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Submit Idea
          </button>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="p-4 border-b border-gray-800">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-400">{ideas.length}</p>
              <p className="text-xs text-gray-400">Total Ideas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">{ideas.filter(i => i.trending).length}</p>
              <p className="text-xs text-gray-400">Trending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">{ideas.filter(i => i.saved).length}</p>
              <p className="text-xs text-gray-400">Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search brilliant ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-full text-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="trending">🔥 Trending</option>
            <option value="recent">🕒 Recent</option>
          </select>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All Ideas
          </button>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === tag
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas List */}
      <div className="divide-y divide-gray-800">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="p-6 hover:bg-gray-900/30 transition-colors">
            <div className="flex items-start gap-4">
              {/* Upvote Section */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => toggleUpvote(idea.id)}
                  className="flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors group border border-gray-700 hover:border-red-500/50"
                >
                  <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </button>
                <span className="text-sm font-bold text-gray-300">{idea.upvotes}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white hover:text-blue-400 cursor-pointer">
                      {idea.title}
                    </h3>
                    {idea.trending && (
                      <div className="flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSave(idea.id)}
                    className={`p-2 rounded-full transition-colors ${
                      idea.saved
                        ? "text-yellow-500 bg-yellow-500/10 border border-yellow-500/30"
                        : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/10"
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">{idea.description}</p>
                
                {/* Tags */}
                <div className="flex items-center gap-2 mb-3">
                  {idea.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700 hover:border-blue-500/50 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {idea.author.slice(1, 2).toUpperCase()}
                      </div>
                      <span className="text-gray-400">by {idea.author}</span>
                      <span className="text-orange-500 font-medium">🔥 {idea.authorStreak}d</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{idea.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="p-6 border-t border-gray-800">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-2xl p-6 text-center">
          <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Got a brilliant idea?</h3>
          <p className="text-gray-300 mb-4">
            Share your startup idea with the community and get feedback from fellow builders.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 mx-auto">
            <Plus className="w-5 h-5" />
            Submit Your Idea
          </button>
        </div>
      </div>
    </div>
  );
}
