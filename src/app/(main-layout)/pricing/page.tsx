import React from "react";
import { Badge } from "@/components/ui/badge";
import { PricingSection } from "@/components/ui/pricing-section";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-red-600/10 text-red-400 border-red-600/20"
            >
              🎯 Upgrade Your Experience
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Unlock Premium Content
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Get unlimited access to our entire movie library, exclusive content,
              and premium features. Choose the plan that&apos;s right for you.
            </p>
          </div>
        </div>
      </div>

      <PricingSection />
    </div>
  );
}