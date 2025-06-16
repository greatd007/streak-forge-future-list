
import { MessageCircle, Heart, Share2, Bookmark } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

interface FeedItem {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  streakDay: number;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

// Generate more items for scrolling demonstration
const users = [
  { name: 'Alex', username: '@alexbuilds', avatar: 'https://avatar.vercel.sh/api/alex' },
  { name: 'Sarah', username: '@sarahcodes', avatar: 'https://avatar.vercel.sh/api/sarah' },
  { name: 'Mike', username: '@mikeship', avatar: 'https://avatar.vercel.sh/api/mike' },
  { name: 'Jane', username: '@janedev', avatar: 'https://avatar.vercel.sh/api/jane' },
  { name: 'Emma', username: '@emmak', avatar: 'https://avatar.vercel.sh/api/emma' },
];

const contents = [
  "Just shipped a new feature! Feeling productive.",
  "Learning React hooks today. Small wins count.",
  "Another day, another commit. Consistency is key.",
  "Set up my project boilerplate, ready for launch 🚀",
  "Daily check-in... let's keep building!",
  "Debugged a tricky issue, feeling accomplished.",
  "Collaborated with a new developer today.",
  "Finally reached a 2-week streak! 🔥",
  "Started exploring Recharts for data viz.",
  "Designs are coming together nicely!",
];

const sampleFeed: FeedItem[] = Array.from({length: 20}).map((_, idx) => ({
  id: String(idx + 1),
  user: users[idx % users.length],
  streakDay: 10 + ((idx * 2) % 30),
  content: contents[idx % contents.length],
  likes: 4 + (idx * 3) % 25,
  comments: idx % 5,
  timestamp: `${idx + 1}h`,
}));

export function MiniFeedPreview() {
  const { toast } = useToast();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  const handleSeeMore = () => {
    toast({
      title: "Loading more posts...",
      description: "Fetching the latest community updates.",
    });
  };

  const handleLike = (itemId: string) => {
    if (likedPosts.includes(itemId)) {
      setLikedPosts(prev => prev.filter(id => id !== itemId));
      toast({
        title: "Unliked",
        description: "Removed like from post.",
      });
    } else {
      setLikedPosts(prev => [...prev, itemId]);
      toast({
        title: "Liked!",
        description: "You liked this post.",
      });
    }
  };

  const handleComment = (itemId: string) => {
    toast({
      title: "Comment",
      description: "Opening comment thread...",
    });
  };

  const handleShare = (itemId: string) => {
    toast({
      title: "Shared",
      description: "Post link copied to clipboard!",
    });
  };

  const handleBookmark = (itemId: string) => {
    if (bookmarkedPosts.includes(itemId)) {
      setBookmarkedPosts(prev => prev.filter(id => id !== itemId));
      toast({
        title: "Removed bookmark",
        description: "Post removed from bookmarks.",
      });
    } else {
      setBookmarkedPosts(prev => [...prev, itemId]);
      toast({
        title: "Bookmarked",
        description: "Post saved to bookmarks!",
      });
    }
  };

  const handleUserClick = (user: FeedItem['user']) => {
    toast({
      title: "Profile",
      description: `Viewing ${user.name}'s profile`,
    });
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-white px-2 pt-2">Recent Check-ins</h3>
      
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
        {sampleFeed.map((item) => (
          <div key={item.id} className="flex items-start gap-3 px-2 py-3 border-b border-[#222] hover:bg-gray-900/60 transition rounded-lg">
            <button
              onClick={() => handleUserClick(item.user)}
              className="hover:scale-105 transition-transform duration-200"
            >
              <img
                src={item.user.avatar}
                alt={item.user.name}
                className="w-9 h-9 rounded-full flex-shrink-0"
              />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <button
                  onClick={() => handleUserClick(item.user)}
                  className="font-medium text-white text-sm hover:text-orange-400 transition-colors"
                >
                  {item.user.name}
                </button>
                <span className="text-xs text-orange-400 font-bold">Day {item.streakDay}</span>
                <button
                  onClick={() => handleUserClick(item.user)}
                  className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {item.user.username}
                </button>
                <span className="text-xs text-gray-500">• {item.timestamp}</span>
              </div>
              <p className="text-sm text-gray-200 break-words mb-2">{item.content}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <button 
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1 transition-colors hover:scale-105 ${
                    likedPosts.includes(item.id) ? 'text-red-400' : 'hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${likedPosts.includes(item.id) ? 'fill-current' : ''}`} />
                  {item.likes + (likedPosts.includes(item.id) ? 1 : 0)}
                </button>
                <button 
                  onClick={() => handleComment(item.id)}
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5" />{item.comments}
                </button>
                <button 
                  onClick={() => handleShare(item.id)}
                  className="flex items-center gap-1 hover:text-green-400 transition-colors hover:scale-105"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleBookmark(item.id)}
                  className={`flex items-center gap-1 transition-colors hover:scale-105 ${
                    bookmarkedPosts.includes(item.id) ? 'text-yellow-400' : 'hover:text-yellow-400'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarkedPosts.includes(item.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 pb-1 px-2 bg-gradient-to-t from-black via-black/60 to-transparent sticky bottom-0 z-10">
        <button 
          onClick={handleSeeMore}
          className="w-full text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors py-2 rounded-lg text-center bg-black/30 border border-gray-800 hover:bg-black/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          See more →
        </button>
      </div>
    </div>
  );
}
