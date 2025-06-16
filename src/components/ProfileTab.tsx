import { Calendar, MapPin, Link, Edit } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { useToast } from "@/hooks/use-toast";

const userPosts = [
  {
    id: 1,
    content: "Just launched my new feature! User feedback has been amazing so far. 🚀",
    streak: 12,
    likes: 15,
    comments: 4,
    timestamp: "2h",
  },
  {
    id: 2,
    content: "Debugging session complete. Found the issue in the payment flow. Sometimes it's the smallest things! 🐛",
    streak: 11,
    likes: 8,
    comments: 2,
    timestamp: "1d",
  },
  {
    id: 3,
    content: "Weekly review: Shipped 3 features, fixed 12 bugs, learned React Query. Productive week! 💪",
    streak: 7,
    likes: 23,
    comments: 7,
    timestamp: "3d",
  },
];

export function ProfileTab() {
  const { toast } = useToast();

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Opening profile editor...",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/25">
            YU
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">Your Name</h2>
              <UserBadge type="founder" />
              <button 
                onClick={handleEditProfile}
                className="px-4 py-1 border border-gray-600 text-gray-300 rounded-full text-sm hover:bg-gray-800 transition-colors flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                Edit profile
              </button>
            </div>
            <p className="text-gray-400 mb-1">@yourhandle</p>
            <p className="text-gray-300 mb-3">Building in public • Founder • Always shipping 🚀</p>
            
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1">
                <Link className="w-4 h-4" />
                <a href="#" className="text-blue-400 hover:underline">yourwebsite.com</a>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined December 2024
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <span><strong className="text-white">127</strong> <span className="text-gray-400">Following</span></span>
              <span><strong className="text-white">1.2K</strong> <span className="text-gray-400">Followers</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-orange-500 mb-1">🔥 12</p>
            <p className="text-gray-400 text-sm">Current Streak</p>
          </div>
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-green-500 mb-1">28</p>
            <p className="text-gray-400 text-sm">Longest Streak</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-purple-500 mb-1">85%</p>
            <p className="text-gray-400 text-sm">Consistency</p>
          </div>
        </div>
      </div>

      {/* Posts Tab */}
      <div className="border-b border-gray-800">
        <div className="flex">
          <button className="flex-1 py-4 text-center font-medium text-white border-b-2 border-blue-500">
            Posts
          </button>
          <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-300 transition-colors">
            Replies
          </button>
          <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-300 transition-colors">
            Likes
          </button>
        </div>
      </div>

      {/* User Posts */}
      <div className="divide-y divide-gray-800">
        {userPosts.map((post) => (
          <div key={post.id} className="p-4 hover:bg-gray-900/30 transition-colors">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
                YU
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">@yourhandle</span>
                  <UserBadge type="founder" />
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500">{post.timestamp}</span>
                  <span className="text-orange-500 font-medium">🔥 Day {post.streak}</span>
                </div>
                <p className="text-gray-100 mb-3 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-6 text-gray-500 text-sm">
                  <span>{post.comments} replies</span>
                  <span>{post.likes} likes</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
