
import { useState } from "react";
import { Check, Shield, Star, Users, Zap, Heart, X } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { Button } from "@/components/ui/button";

export function FounderAccessTab() {
  const [showFaq, setShowFaq] = useState(false);

  const benefits = [
    "Verified streaks (blue badge in feed & leaderboard)",
    "Comment and reply access in the founder feed",
    "Share richer updates (screenshots, links)",
    "Priority visibility on the leaderboard",
    "Early access to new features",
    "Support the FoundrStreak community"
  ];

  const handleUpgrade = () => {
    console.log("Upgrade to Founder Access clicked");
    // This would integrate with Stripe or payment provider
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Choose your verification</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          
          {/* Badge Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-2xl mb-4">
              <UserBadge type="founder" className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Get verified</h2>
            <p className="text-gray-400">Subscribe to unlock new features and earn the blue badge</p>
          </div>

          {/* Plan Card */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Founder Access</h3>
                  <div className="flex items-center gap-2">
                    <UserBadge type="founder" />
                    <span className="text-sm text-gray-400">Get verified</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$3</div>
                <div className="text-sm text-gray-400">per month</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={handleUpgrade}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full text-base"
            >
              Subscribe & get verified
            </Button>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 text-center">
            <p className="text-gray-400 text-sm">
              By subscribing, you agree to our Purchaser Terms of Service. Subscriptions auto-renew until canceled, as described in the Terms. Cancel anytime.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-4">
              <Shield className="w-4 h-4" />
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <button
              onClick={() => setShowFaq(!showFaq)}
              className="w-full text-left p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Frequently asked questions</span>
                <span className="text-gray-400">{showFaq ? '−' : '+'}</span>
              </div>
            </button>
            
            {showFaq && (
              <div className="mt-4 space-y-4 bg-gray-900/20 rounded-lg p-6 border border-gray-800">
                <div>
                  <h4 className="font-medium mb-2">Can I still use FoundrStreak for free?</h4>
                  <p className="text-gray-400 text-sm">
                    Yes. Posting, check-ins, and leaderboard viewing are all free.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Is this just cosmetic?</h4>
                  <p className="text-gray-400 text-sm">
                    No. Blue badge users unlock real tools and visibility for their startup journey.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">How do I cancel?</h4>
                  <p className="text-gray-400 text-sm">
                    You can cancel anytime from your account settings. Your access continues until the end of your billing period.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
