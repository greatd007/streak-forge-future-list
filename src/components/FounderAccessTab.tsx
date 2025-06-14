
import { useState } from "react";
import { Check, ArrowLeft, X } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { Button } from "@/components/ui/button";

export function FounderAccessTab() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const handleUpgrade = () => {
    console.log("Upgrade to Founder Access clicked");
    // This would integrate with Stripe or payment provider
  };

  return (
    <div className="bg-black text-white min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <X className="w-6 h-6 mr-2" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Main Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Upgrade to <span className="text-blue-400">Founder Access</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Subscribe to unlock verification and new features
          </p>
          
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8">
            <UserBadge type="founder" className="w-12 h-12" />
          </div>
        </div>

        {/* Plan Selection */}
        <div className="bg-gray-900/50 rounded-3xl p-8 mb-8">
          {/* Plan Toggle */}
          <div className="flex bg-gray-800 rounded-full p-1 mb-8">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`flex-1 py-3 px-6 rounded-full text-base font-medium transition-all ${
                selectedPlan === "monthly"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`flex-1 py-3 px-6 rounded-full text-base font-medium transition-all relative ${
                selectedPlan === "yearly"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                Save 12%
              </span>
            </button>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold">
                ${selectedPlan === "monthly" ? "3" : "32"}
              </span>
              <span className="text-gray-400 text-lg">
                / {selectedPlan === "monthly" ? "month" : "year"}
              </span>
            </div>
            {selectedPlan === "yearly" && (
              <p className="text-green-400 text-sm">Save $4 per year</p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {[
              "Verified streaks with blue badge",
              "Priority visibility on leaderboards",
              "Early access to new features",
              "Enhanced profile customization",
              "Direct support channel",
              "Help support FoundrStreak development"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-200 text-lg">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Subscribe Button */}
          <Button
            onClick={handleUpgrade}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full text-lg h-auto transition-all shadow-lg hover:shadow-xl"
          >
            Subscribe & get verified
          </Button>
        </div>

        {/* Terms */}
        <div className="text-center">
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            By subscribing, you agree to our{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">Terms of Service</span>{" "}
            and{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">Privacy Policy</span>.
            Subscriptions auto-renew until canceled.{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">Cancel anytime</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
