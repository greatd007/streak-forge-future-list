
import { useState } from "react";
import { Check, Shield, X, ArrowLeft } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { Button } from "@/components/ui/button";

export function FounderAccessTab() {
  const [showFaq, setShowFaq] = useState(false);

  const benefits = [
    "Verified streaks with blue badge",
    "Priority visibility on leaderboards", 
    "Early access to new features",
    "Enhanced profile customization",
    "Direct support channel",
    "Help support FoundrStreak development"
  ];

  const handleUpgrade = () => {
    console.log("Upgrade to Founder Access clicked");
    // This would integrate with Stripe or payment provider
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-800">
          <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Subscribe to get verified</h1>
        </div>

        {/* Main Content */}
        <div className="p-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-6 shadow-lg shadow-blue-500/25">
              <UserBadge type="founder" className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Get verified on FoundrStreak</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
              Subscribe to unlock verification and new features that help you build in public.
            </p>
          </div>

          {/* Plan Card */}
          <div className="bg-gray-900 rounded-3xl border border-gray-700 p-8 mb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Founder Access</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <UserBadge type="founder" />
                        <span className="text-sm text-gray-400">Get verified</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">$3</div>
                  <div className="text-gray-400">per month</div>
                </div>
              </div>

              <div className="grid gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleUpgrade}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full text-lg h-auto shadow-lg shadow-blue-500/25 transition-all duration-200"
              >
                Subscribe & get verified
              </Button>
            </div>
          </div>

          {/* Terms */}
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
              By subscribing, you agree to our Terms of Service. Subscriptions auto-renew until canceled. Cancel anytime in your account settings.
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-3 text-gray-500 mb-8">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Secure checkout powered by Stripe</span>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800">
            <button
              onClick={() => setShowFaq(!showFaq)}
              className="w-full text-left p-6 hover:bg-gray-800/50 transition-colors rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Frequently asked questions</span>
                <span className="text-2xl text-gray-400 font-light">{showFaq ? '−' : '+'}</span>
              </div>
            </button>
            
            {showFaq && (
              <div className="px-6 pb-6 space-y-6">
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="font-semibold mb-3 text-white">Can I still use FoundrStreak for free?</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Absolutely. All core features like posting updates, maintaining streaks, and viewing leaderboards remain completely free.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-white">What exactly does verification give me?</h4>
                  <p className="text-gray-300 leading-relaxed">
                    The blue verified badge shows your commitment to building consistently. You'll also get priority placement on leaderboards and early access to new features.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-white">How do I cancel my subscription?</h4>
                  <p className="text-gray-300 leading-relaxed">
                    You can cancel anytime from your account settings. Your verification and features remain active until the end of your current billing period.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-white">Is this a one-time payment?</h4>
                  <p className="text-gray-300 leading-relaxed">
                    No, this is a monthly subscription that renews automatically. This helps us maintain and improve the platform continuously.
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
