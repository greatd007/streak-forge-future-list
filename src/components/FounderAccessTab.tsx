
import { useState } from "react";
import { Check, ArrowLeft, X, ChevronDown, ChevronUp, Star } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BadgeType = "founder" | "investor" | "influencer";

export function FounderAccessTab() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const badgeOptions = [
    {
      type: "influencer" as const,
      name: "Influencer Access",
      monthlyPrice: 5,
      yearlyPrice: 54,
      description: "For inspiring consistency",
      status: "coming-soon",
      features: [
        "📢 Boosted visibility in feed",
        "🔗 Link post support", 
        "💬 Creator community access",
        "🎯 Audience insights",
        "⭐ Featured creator status"
      ]
    },
    {
      type: "founder" as const,
      name: "Founder Access",
      monthlyPrice: 3,
      yearlyPrice: 32,
      description: "For consistent builders",
      status: "active",
      features: [
        "🔵 Blue Verified Badge",
        "💬 Comment + Reply Access",
        "📈 Priority Leaderboard Ranking",
        "📎 Post Richer Updates", 
        "⏩ Early Access to New Features"
      ]
    },
    {
      type: "investor" as const,
      name: "Investor Access",
      monthlyPrice: 10,
      yearlyPrice: 108,
      description: "For funding the future",
      status: "invite-only",
      features: [
        "🟡 Gold Verified Badge",
        "🧠 View startup ideas",
        "📊 Track top builders", 
        "🏆 VIP community access",
        "🤝 Direct founder connect"
      ]
    }
  ];

  const handleUpgrade = (badgeType: BadgeType) => {
    console.log(`Upgrade to ${badgeType} clicked`);
    // This would integrate with Stripe or payment provider
  };

  const handleBack = () => {
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

      <div className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
            Upgrade to <span className="text-blue-400">Founder Access</span>
          </h1>
          <p className="text-lg lg:text-2xl text-gray-300 mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Choose your badge and unlock exclusive features
          </p>
        </div>

        {/* Plan Selection Toggle */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <div className="bg-gray-900/50 rounded-full p-1 max-w-sm mx-auto">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedPlan === "monthly"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all relative ${
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
        </div>

        {/* 3-Card Pricing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {badgeOptions.map((badge, index) => (
            <Card 
              key={badge.type}
              className={`relative bg-gray-900/50 border-2 transition-all hover:bg-gray-900/70 ${
                badge.type === 'founder' 
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/20' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {/* Most Popular Badge */}
              {badge.type === 'founder' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <UserBadge type={badge.type} className="w-12 h-12" />
                </div>
                <CardTitle className="text-xl font-bold text-white mb-2">
                  {badge.name}
                </CardTitle>
                <p className="text-gray-400 text-sm mb-4">{badge.description}</p>
                
                {/* Price */}
                <div className="mb-4">
                  {badge.status === "invite-only" ? (
                    <div className="text-2xl font-bold text-yellow-400">Invite Only</div>
                  ) : badge.status === "coming-soon" ? (
                    <div className="text-2xl font-bold text-purple-400">Coming Soon</div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-white">
                        ${selectedPlan === "monthly" ? badge.monthlyPrice : badge.yearlyPrice}
                      </div>
                      <div className="text-gray-400 text-sm">
                        /{selectedPlan === "monthly" ? "month" : "year"}
                      </div>
                      {selectedPlan === "yearly" && (
                        <div className="text-green-400 text-xs mt-1">
                          Save ${(badge.monthlyPrice * 12) - badge.yearlyPrice}/year
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {badge.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleUpgrade(badge.type)}
                  disabled={badge.status !== "active"}
                  className={`w-full py-3 rounded-full font-semibold transition-all ${
                    badge.type === 'founder'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                      : badge.status === "invite-only"
                      ? 'bg-yellow-900 text-yellow-400 cursor-not-allowed'
                      : badge.status === "coming-soon"
                      ? 'bg-purple-900 text-purple-400 cursor-not-allowed'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {badge.status === "invite-only" 
                    ? "Invite Only" 
                    : badge.status === "coming-soon"
                    ? "Coming Soon"
                    : `Get ${badge.name}`
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm">🔒 Secured checkout via Stripe · Cancel anytime</p>
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
