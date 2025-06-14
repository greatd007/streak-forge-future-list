
import { Bell, Shield, Palette, Moon, Globe, User } from "lucide-react";

export function SettingsTab() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Settings Sections */}
      <div className="divide-y divide-gray-800">
        {/* Account */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Account
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Username</p>
                <p className="text-sm text-gray-400">@yourhandle</p>
              </div>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                Change
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-400">your@email.com</p>
              </div>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily streak reminders</p>
                <p className="text-sm text-gray-400">Get notified to maintain your streak</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New followers</p>
                <p className="text-sm text-gray-400">When someone follows you</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors">
                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mentions and replies</p>
                <p className="text-sm text-gray-400">When someone mentions or replies to you</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Safety
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Private account</p>
                <p className="text-sm text-gray-400">Only followers can see your posts</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors">
                <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show in leaderboard</p>
                <p className="text-sm text-gray-400">Display your profile in public leaderboards</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-gray-400">Choose your preferred theme</p>
              </div>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                <option>Dark</option>
                <option>Light</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Data & Export
          </h2>
          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
              <p className="font-medium mb-1">Download your data</p>
              <p className="text-sm text-gray-400">Get a copy of all your FoundrStreak data</p>
            </button>
            <button className="w-full text-left p-4 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 rounded-lg transition-colors">
              <p className="font-medium mb-1 text-red-400">Delete account</p>
              <p className="text-sm text-gray-400">Permanently delete your account and data</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
