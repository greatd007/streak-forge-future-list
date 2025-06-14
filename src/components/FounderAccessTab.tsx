
import { useState } from "react";
import { Check, Shield, Star, Users, Zap, Heart } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { Button } from "@/components/ui/button";

export function FounderAccessTab() {
  const [showFaq, setShowFaq] = useState(false);

  const benefits = [
    {
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      text: "Verified streaks (blue badge in feed & leaderboard)"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-400" />,
      text: "Comment and reply access in the founder feed"
    },
    {
      icon: <Star className="w-5 h-5 text-blue-400" />,
      text: "Share richer updates (screenshots, links)"
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      text: "Priority visibility on the leaderboard"
    },
    {
      icon: <Heart className="w-5 h-5 text-blue-400" />,
      text: "Early access to new features"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-400" />,
      text: "Support the FoundrStreak community"
    }
  ];

  const handleUpgrade = () => {
    console.log("Upgrade to Founder Access clicked");
    // This would integrate with Stripe or payment provider
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full mb-4 relative">
              <UserBadge type="founder" className="w-12 h-12" />
              <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Unlock Founder Access
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <UserBadge type="founder" />
            <span className="text-xl font-semibold text-blue-400">Get the Blue Badge</span>
          </div>
          
          <p className="text-xl text-gray-300 mb-2">Show up consistently.</p>
          <p className="text-xl text-gray-300">Stand out as a committed founder.</p>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center">
              🔓 What you unlock with Founder Access:
            </h2>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                  <span className="text-gray-200">{benefit.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-6 italic">
              💡 $3/month helps keep this app clean, focused, and free of noise.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-2xl p-8 border border-blue-500/20 text-center">
            <Button
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 mb-4"
            >
              Get Founder Access → $3/month
            </Button>
            
            <p className="text-gray-400 text-sm mb-2">Cancel anytime</p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowFaq(!showFaq)}
            className="w-full text-left bg-gray-900/30 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-200">Questions & Trust</span>
              <span className="text-gray-400">{showFaq ? '−' : '+'}</span>
            </div>
          </button>
          
          {showFaq && (
            <div className="mt-4 space-y-4 bg-gray-900/20 rounded-lg p-6 border border-gray-800">
              <div>
                <h4 className="font-medium text-gray-200 mb-2">
                  Q: Can I still use FoundrStreak for free?
                </h4>
                <p className="text-gray-400 text-sm">
                  A: Yes. Posting, check-ins, and leaderboard viewing are all free.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-200 mb-2">
                  Q: Is this just cosmetic?
                </h4>
                <p className="text-gray-400 text-sm">
                  A: No. Blue badge users unlock real tools and visibility for their startup journey.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Join committed founders building in public
          </p>
          <Button
            onClick={handleUpgrade}
            variant="outline"
            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
          >
            Start Your Founder Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
