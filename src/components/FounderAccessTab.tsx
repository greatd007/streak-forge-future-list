
import { useState } from "react";
import { Check, ArrowLeft, Sparkles } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { Button } from "@/components/ui/button";

export function FounderAccessTab() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const handleUpgrade = () => {
    console.log("Upgrade to Founder Access clicked");
    // This would integrate with Stripe or payment provider
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">Subscribe to get verified</h1>
          <div></div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8 relative">
            <UserBadge type="founder" className="w-12 h-12" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Get verified on FoundrStreak</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
            Subscribe to unlock verification and new features that help you build in public.
          </p>
        </div>

        {/* Plan Toggle */}
        <div className="bg-gray-900 rounded-full p-1 mb-8 flex">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`flex-1 py-3 px-6 rounded-full text-base font-medium transition-all ${
              selectedPlan === "monthly"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`flex-1 py-3 px-6 rounded-full text-base font-medium transition-all relative ${
              selectedPlan === "yearly"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
            <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs px-2 py-1 rounded-full font-bold">
              Save 12%
            </span>
          </button>
        </div>

        {/* Plan Card */}
        <div className="border border-gray-800 rounded-3xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <UserBadge type="founder" className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-semibold">Founder Access</h3>
                <p className="text-gray-400">Get verified</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                ${selectedPlan === "monthly" ? "3" : "32"}
              </div>
              <div className="text-gray-400">
                per {selectedPlan === "monthly" ? "month" : "year"}
              </div>
            </div>
          </div>

          <div className="space-y-5 mb-8">
            {[
              "Verified streaks with blue badge",
              "Priority visibility on leaderboards", 
              "Early access to new features",
              "Enhanced profile customization",
              "Direct support channel",
              "Help support FoundrStreak development"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-200">{benefit}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={handleUpgrade}
            className="w-full bg-white hover:bg-gray-100 text-black font-bold py-4 rounded-full text-lg h-auto transition-all"
          >
            Subscribe & get verified
          </Button>
        </div>

        {/* Terms */}
        <div className="text-center">
          <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
            By subscribing, you agree to our{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">Terms of Service</span>.
            Subscriptions auto-renew until canceled.{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">Cancel anytime</span>.
          </p>
        </div>

      </div>
    </div>
  );
}
