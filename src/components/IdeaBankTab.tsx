
import { useState } from "react";
import { Heart, Bookmark, Plus, Search, Filter } from "lucide-react";

const mockIdeas = [
  {
    id: 1,
    title: "AI-powered code review assistant",
    description: "A tool that automatically reviews pull requests and suggests improvements based on best practices.",
    tags: ["AI", "Developer Tools", "B2B"],
    upvotes: 23,
    author: "@techfounder",
    timestamp: "2d ago",
    saved: false,
  },
  {
    id: 2,
    title: "Local business discovery app",
    description: "Help people find and support local businesses with AR integration and community reviews.",
    tags: ["Mobile", "Local", "Community"],
    upvotes: 18,
    author: "@localbuilder",
    timestamp: "3d ago",
    saved: true,
  },
  {
    id: 3,
    title: "Subscription cancellation service",
    description: "Automated service that helps users cancel unwanted subscriptions with one click.",
    tags: ["Fintech", "Automation", "Consumer"],
    upvotes: 41,
    author: "@financegeek",
    timestamp: "1w ago",
    saved: false,
  },
];

export function IdeaBankTab() {
  const [ideas, setIdeas] = useState(mockIdeas);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

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

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Idea Bank</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Submit Idea
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex gap-3 mb-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-gray-300 hover:text-white hover:border-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {["all", "AI", "B2B", "Mobile", "Fintech", "Developer Tools"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {filter === "all" ? "All" : `#${filter}`}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas List */}
      <div className="divide-y divide-gray-800">
        {ideas.map((idea) => (
          <div key={idea.id} className="p-6 hover:bg-gray-900/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => toggleUpvote(idea.id)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors group"
                >
                  <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                </button>
                <span className="text-sm font-medium text-gray-300">{idea.upvotes}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white hover:text-blue-400 cursor-pointer">
                    {idea.title}
                  </h3>
                  <button
                    onClick={() => toggleSave(idea.id)}
                    className={`p-2 rounded-full transition-colors ${
                      idea.saved
                        ? "text-yellow-500 bg-yellow-500/10"
                        : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/10"
                    }`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-300 mb-3 leading-relaxed">{idea.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  {idea.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>by {idea.author}</span>
                  <span>·</span>
                  <span>{idea.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
