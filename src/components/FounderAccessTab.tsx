
import { useState } from "react";
import { Check, ArrowLeft, X, ChevronDown, ChevronUp } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { Button } from "@/components/ui/button";

type BadgeType = "founder" | "investor" | "influencer";

export function FounderAccessTab() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [selectedBadge, setSelectedBadge] = useState<BadgeType>("founder");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const badgeOptions = [
    {
      type: "founder" as const,
      name: "Founder Access",
      monthlyPrice: 3,
      yearlyPrice: 32,
      description: "For consistent builders",
      features: [
        "🔵 Blue Verified Badge",
        "📈 Priority Leaderboard Ranking", 
        "💬 Comment + Reply Access",
        "📎 Post Richer Updates",
        "⏩ Early Access to New Features",
        "❤️ Support the Community"
      ]
    },
    {
      type: "investor" as const,
      name: "Investor Access",
      monthlyPrice: 10,
      yearlyPrice: 108,
      description: "For funding the future",
      features: [
        "🟡 Gold Verified Badge",
        "👑 VIP Leaderboard Status",
        "💼 Investor-Only Community",
        "📊 Advanced Analytics Access",
        "🚀 Beta Feature Priority",
        "🤝 Direct Founder Connect"
      ]
    },
    {
      type: "influencer" as const,
      name: "Influencer Access", 
      monthlyPrice: 5,
      yearlyPrice: 54,
      description: "For inspiring consistency",
      features: [
        "🟣 Purple Verified Badge",
        "📢 Amplified Post Reach",
        "🎯 Audience Insights",
        "📱 Content Creation Tools",
        "⭐ Featured Creator Status",
        "💜 Exclusive Creator Events"
      ]
    }
  ];

  const selectedBadgeData = badgeOptions.find(badge => badge.type === selectedBadge)!;

  const handleUpgrade = () => {
    console.log(`Upgrade to ${selectedBadge} clicked`);
    // This would integrate with Stripe or payment provider
  };

  const handleBack = () => {
    // This will trigger the parent component to change tabs
    window.history.back();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "Can I still use FoundrStreak for free?",
      answer: "Yes. But premium access unlocks key visibility and community tools."
    },
    {
      question: "Will I lose my streak if I don't subscribe?", 
      answer: "No. Everyone keeps their streak — this is about showing up with extra support."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards through our secure Stripe integration."
    },
    {
      question: "Can I switch between badge types?",
      answer: "Yes, you can upgrade or change your badge type at any time from your account settings."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 bg-black z-10">
        <button 
          onClick={handleBack}
          className="p-2 hover:bg-gray-900 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Founder Access</h1>
        <button 
          onClick={handleBack}
          className="p-2 hover:bg-gray-900 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6 lg:mb-8 shadow-lg shadow-blue-500/30">
            <UserBadge type={selectedBadge} className="w-8 h-8 lg:w-10 lg:h-10" />
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
            Choose Your <span className="text-blue-400">Verified Badge</span>
          </h1>
          <p className="text-lg lg:text-2xl text-gray-300 mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Unlock exclusive features, get visibility, and join the verified community.
          </p>
        </div>

        {/* Badge Selection */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12">Choose Your Badge</h2>
          <div className="grid gap-4 lg:gap-6 mb-8 lg:mb-12">
            {badgeOptions.map((badge) => (
              <div 
                key={badge.type}
                onClick={() => setSelectedBadge(badge.type as BadgeType)}
                className={`bg-gray-900/50 rounded-2xl p-4 lg:p-6 cursor-pointer transition-all hover:bg-gray-900/70 border-2 ${
                  selectedBadge === badge.type ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <UserBadge type={badge.type} className="w-10 h-10 lg:w-12 lg:h-12" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg lg:text-xl font-semibold mb-1">{badge.name}</h3>
                    <p className="text-gray-400 text-sm lg:text-base mb-2">{badge.description}</p>
                    <div className="text-xl lg:text-2xl font-bold">
                      ${selectedPlan === "monthly" ? badge.monthlyPrice : badge.yearlyPrice}
                      <span className="text-sm text-gray-400 font-normal">
                        /{selectedPlan === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Breakdown Section */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12">What's included with {selectedBadgeData.name}:</h2>
          <div className="grid gap-4 lg:gap-6">
            {selectedBadgeData.features.map((feature, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl p-4 lg:p-6 text-center hover:bg-gray-900/70 transition-colors">
                <p className="text-base lg:text-lg font-medium text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Selection */}
        <div className="bg-gray-900/50 rounded-3xl p-6 lg:p-8 mb-12 lg:mb-16 max-w-2xl mx-auto">
          {/* Plan Toggle */}
          <div className="flex bg-gray-800 rounded-full p-1 mb-6 lg:mb-8">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`flex-1 py-3 px-4 lg:px-6 rounded-full text-sm lg:text-base font-medium transition-all ${
                selectedPlan === "monthly"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`flex-1 py-3 px-4 lg:px-6 rounded-full text-sm lg:text-base font-medium transition-all relative ${
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

          {/* Selected Badge Info */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="mb-4 flex justify-center">
              <UserBadge type={selectedBadge} className="w-12 h-12 lg:w-16 lg:h-16" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold mb-2">{selectedBadgeData.name}</h3>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-3xl lg:text-5xl font-bold">
                ${selectedPlan === "monthly" ? selectedBadgeData.monthlyPrice : selectedBadgeData.yearlyPrice}
              </span>
              <span className="text-gray-400 text-base lg:text-lg">
                / {selectedPlan === "monthly" ? "month" : "year"}
              </span>
            </div>
            {selectedPlan === "yearly" && (
              <p className="text-green-400 text-sm">
                Save ${(selectedBadgeData.monthlyPrice * 12) - selectedBadgeData.yearlyPrice} per year
              </p>
            )}
          </div>

          {/* Subscribe Button */}
          <Button
            onClick={handleUpgrade}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 lg:py-4 rounded-full text-base lg:text-lg h-auto transition-all shadow-lg hover:shadow-xl"
          >
            Get {selectedBadgeData.name} – ${selectedPlan === "monthly" ? selectedBadgeData.monthlyPrice : selectedBadgeData.yearlyPrice}/{selectedPlan === "monthly" ? "month" : "year"}
          </Button>

          {/* Security Badge */}
          <div className="text-center mt-4 lg:mt-6">
            <p className="text-gray-500 text-sm">🔒 Powered by Stripe</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 lg:p-6 text-left flex items-center justify-between hover:bg-gray-900/70 transition-colors"
                >
                  <span className="text-base lg:text-lg font-semibold text-white pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
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
