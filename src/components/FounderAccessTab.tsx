
import { useState } from "react";
import { Check, ArrowLeft, X, ChevronDown, ChevronUp } from "lucide-react";
import { UserBadge } from "./UserBadge";
import { Button } from "@/components/ui/button";

export function FounderAccessTab() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleUpgrade = () => {
    console.log("Upgrade to Founder Access clicked");
    // This would integrate with Stripe or payment provider
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "Can I still use FoundrStreak for free?",
      answer: "Yes. But Founder Access unlocks key visibility and community tools."
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
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <X className="w-6 h-6 mr-2" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-8 shadow-lg shadow-blue-500/30">
            <UserBadge type="founder" className="w-10 h-10" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Upgrade to <span className="text-blue-400">Founder Access</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Unlock your blue badge. Get visibility, tools, and early access. All for $3/month.
          </p>
          
          <Button
            onClick={handleUpgrade}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-xl h-auto transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/30 mb-4"
          >
            Get Founder Access – $3/month
          </Button>
          <p className="text-gray-500 text-sm">Cancel anytime. You'll be billed monthly.</p>
        </div>

        {/* Feature Breakdown Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What's included:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔵",
                title: "Blue Verified Badge",
                description: "Show up with credibility"
              },
              {
                icon: "📈", 
                title: "Priority Leaderboard Ranking",
                description: "Get boosted visibility"
              },
              {
                icon: "💬",
                title: "Comment + Reply Access",
                description: "Engage in the founder feed"
              },
              {
                icon: "📎",
                title: "Post Richer Updates",
                description: "Images, links, and embeds"
              },
              {
                icon: "⏩",
                title: "Early Access to New Features",
                description: "Be first to try new tools"
              },
              {
                icon: "❤️",
                title: "Support the Community",
                description: "Help keep FoundrStreak ad-free"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl p-6 text-center hover:bg-gray-900/70 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Comparison Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Free vs Founder Access</h2>
          <div className="bg-gray-900/50 rounded-3xl p-8 max-w-3xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4 text-xl font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 text-xl font-semibold text-gray-400">Free</th>
                    <th className="text-center py-4 px-4 text-xl font-semibold text-blue-400">Founder Access</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {[
                    ["Daily Check-in", true, true],
                    ["Verified Badge", false, true],
                    ["Comment/Reply Access", false, true],
                    ["Leaderboard Boost", false, true],
                    ["Post Enhancements", false, true],
                    ["Early Feature Access", false, true]
                  ].map(([feature, free, founder], index) => (
                    <tr key={index} className="border-b border-gray-800 last:border-b-0">
                      <td className="py-4 px-4 text-gray-200">{feature}</td>
                      <td className="text-center py-4 px-4">
                        {free ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-500 mx-auto" />}
                      </td>
                      <td className="text-center py-4 px-4">
                        {founder ? <Check className="w-5 h-5 text-blue-500 mx-auto" /> : <X className="w-5 h-5 text-gray-500 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="bg-gray-900/50 rounded-3xl p-8 mb-16 max-w-2xl mx-auto">
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

          {/* Subscribe Button */}
          <Button
            onClick={handleUpgrade}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full text-lg h-auto transition-all shadow-lg hover:shadow-xl"
          >
            Subscribe & get verified
          </Button>

          {/* Security Badge */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">🔒 Powered by Stripe</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-900/70 transition-colors"
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
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
