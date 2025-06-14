
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
    <div className="bg-black text-white p-4 w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">Subscribe to get verified</h1>
          <div className="w-9"></div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6 relative">
            <UserBadge type="founder" className="w-10 h-10" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-3">Get verified on FoundrStreak</h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Subscribe to unlock verification and new features that help you build in public.
          </p>
        </div>

        {/* Plan Toggle */}
        <div className="bg-gray-900 rounded-full p-1 mb-6 flex">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
              selectedPlan === "monthly"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all relative ${
              selectedPlan === "yearly"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly
            <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
              Save 12%
            </span>
          </button>
        </div>

        {/* Plan Card */}
        <div className="border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <UserBadge type="founder" className="w-7 h-7" />
              <div>
                <h3 className="text-lg font-semibold">Founder Access</h3>
                <p className="text-gray-400 text-sm">Get verified</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                ${selectedPlan === "monthly" ? "3" : "32"}
              </div>
              <div className="text-gray-400 text-sm">
                per {selectedPlan === "monthly" ? "month" : "year"}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {[
              "Verified streaks with blue badge",
              "Priority visibility on leaderboards", 
              "Early access to new features",
              "Enhanced profile customization",
              "Direct support channel",
              "Help support FoundrStreak development"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-200 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={handleUpgrade}
            className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-full text-base h-auto transition-all"
          >
            Subscribe & get verified
          </Button>
        </div>

        {/* Terms */}
        <div className="text-center">
          <p className="text-gray-500 text-xs leading-relaxed">
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
