"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { subscriptionService } from "@/services/subscription.service";
import { Check, Crown, Zap } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    id: "MONTHLY",
    name: "Monthly Plan",
    price: 10,
    period: "month",
    description: "Perfect for casual viewers",
    features: [
      "Access to all movies and series",
      "HD streaming quality",
      "Watch on any device",
      "Cancel anytime",
      "No ads",
    ],
    popular: false,
  },
  {
    id: "YEARLY",
    name: "Yearly Plan",
    price: 100,
    period: "year",
    description: "Best value for serious movie lovers",
    features: [
      "Everything in Monthly Plan",
      "4K Ultra HD streaming",
      "Offline downloads",
      "Early access to new releases",
      "Priority customer support",
      "Save $20 compared to monthly",
    ],
    popular: true,
    savings: "Save $20/year",
  },
];

export function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSubscribe = async (planId: "MONTHLY" | "YEARLY") => {
    if (!user) {
      toast.error("Please login to subscribe");
      return;
    }

    setLoading(planId);

    try {
      const { data, error, success } =
        await subscriptionService.createCheckoutSession({
          plan: planId,
        });

      if (!success) {
        toast.error(error || "Failed to start subscription. Please try again.");
        return;
      }

      const checkoutUrl = data;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error(error || "No checkout URL received");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to start subscription. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  if (isPending) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-800 rounded-lg max-w-md mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-slate-800 rounded-2xl p-8 h-96"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-red-600/10 text-red-400 border-red-600/20"
          >
            💎 Premium Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Unlock unlimited access to CineVerse&apos;s extensive library of
            movies and series. Cancel or change your plan anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 ${
                plan.popular
                  ? "ring-2 ring-red-600/50 shadow-2xl shadow-red-600/10"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-600 text-white px-4 py-1">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-black text-white">
                    ${plan.price}
                  </span>
                  <span className="text-slate-400">/{plan.period}</span>
                </div>
                <p className="text-slate-400">{plan.description}</p>
                {plan.savings && (
                  <Badge
                    variant="outline"
                    className="mt-2 border-green-600 text-green-400"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    {plan.savings}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() =>
                    handleSubscribe(plan.id as "MONTHLY" | "YEARLY")
                  }
                  disabled={loading === plan.id}
                  className={`w-full mt-6 ${
                    plan.popular
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                  size="lg"
                >
                  {loading === plan.id ? (
                    "Processing..."
                  ) : (
                    <>
                      Subscribe Now
                      {plan.popular && <Crown className="w-4 h-4 ml-2" />}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            30-day money-back guarantee • No hidden fees • Secure payment
          </p>
          <p className="text-sm text-slate-500">
            Questions? Contact our support team at support@cineverse.com
          </p>
        </div>
      </div>
    </section>
  );
}
