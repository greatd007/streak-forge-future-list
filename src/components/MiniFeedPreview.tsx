
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

const sampleFeed: FeedItem[] = [
  {
    id: '1',
    user: {
      name: 'Alex',
      username: '@alexbuilds',
      avatar: 'https://avatar.vercel.sh/api/alex',
    },
    streakDay: 15,
    content: 'Just shipped a new feature! Feeling productive.',
    likes: 12,
    comments: 3,
  },
  {
    id: '2',
    user: {
      name: 'Sarah',
      username: '@sarahcodes',
      avatar: 'https://avatar.vercel.sh/api/sarah',
    },
    streakDay: 8,
    content: 'Learning React hooks today. Small wins count.',
    likes: 8,
    comments: 2,
  },
  {
    id: '3',
    user: {
      name: 'Mike',
      username: '@mikeship',
      avatar: 'https://avatar.vercel.sh/api/mike',
    },
    streakDay: 23,
    content: 'Another day, another commit. Consistency is key.',
    likes: 15,
    comments: 5,
  },
];

export function MiniFeedPreview() {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
      <h3 className="text-lg font-bold mb-4 text-white">Recent Check-ins</h3>
      
      <div className="space-y-3 mb-4">
        {sampleFeed.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
            <img
              src={item.user.avatar}
              alt={item.user.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-white text-sm">{item.user.name}</span>
                <span className="text-xs text-orange-400 font-bold">Day {item.streakDay}</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-1">{item.content}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {item.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {item.comments}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors py-2 text-center">
        See more →
      </button>
    </div>
  );
}
