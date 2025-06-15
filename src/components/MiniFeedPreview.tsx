
import { MessageCircle, Heart } from 'lucide-react';

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
}));

export function MiniFeedPreview() {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-bold mb-4 text-white px-2 pt-2">Recent Check-ins</h3>
      
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
        {sampleFeed.map((item) => (
          <div key={item.id} className="flex items-start gap-3 px-2 py-3 border-b border-[#222] hover:bg-gray-900/60 transition rounded-lg">
            <img
              src={item.user.avatar}
              alt={item.user.name}
              className="w-9 h-9 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-white text-sm">{item.user.name}</span>
                <span className="text-xs text-orange-400 font-bold">Day {item.streakDay}</span>
                <span className="text-xs text-gray-400">{item.user.username}</span>
              </div>
              <p className="text-sm text-gray-200 break-words">{item.content}</p>
              <div className="flex items-center gap-5 mt-1 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" />{item.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />{item.comments}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 pb-1 px-2 bg-gradient-to-t from-black via-black/60 to-transparent sticky bottom-0 z-10">
        <button className="w-full text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors py-2 rounded-lg text-center bg-black/30 border border-gray-800">
          See more →
        </button>
      </div>
    </div>
  );
}

