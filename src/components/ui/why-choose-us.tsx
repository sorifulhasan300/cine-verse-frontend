import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Zap,
  Globe,
  Users,
  Smartphone,
  Award,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Streaming",
    description: "Bank-level encryption ensures your viewing experience is completely secure and private.",
    highlight: "256-bit SSL"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience seamless streaming with our optimized servers and CDN technology.",
    highlight: "4K Ultra HD"
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Watch from anywhere in the world with our extensive server network.",
    highlight: "190+ Countries"
  },
  {
    icon: Users,
    title: "Social Features",
    description: "Connect with fellow movie enthusiasts, share reviews, and build your watchlist.",
    highlight: "Community Driven"
  },
  {
    icon: Smartphone,
    title: "Multi-Device",
    description: "Stream on any device - TV, laptop, tablet, or smartphone without limitations.",
    highlight: "All Platforms"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in streaming technology and user experience.",
    highlight: "Industry Leader"
  }
];

const benefits = [
  "No ads or interruptions",
  "Offline viewing available",
  "Personalized recommendations",
  "Parental controls",
  "Multiple user profiles",
  "Regular content updates"
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-red-600/10 text-red-400 border-red-600/20">
            ✨ Why Choose CineVerse
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Ultimate Streaming Experience
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Join millions of viewers who trust CineVerse for their entertainment needs.
            Here&apos;s what makes us the premier choice for movie lovers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-slate-900 border-slate-800 hover:border-red-600/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-red-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400 mb-3 text-sm">{feature.description}</p>
                      <Badge variant="secondary" className="bg-red-600/10 text-red-400 border-red-600/20">
                        {feature.highlight}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits List */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Everything You Need</h3>
            <p className="text-slate-400">Premium features included with every subscription</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-red-600/10 border border-red-600/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-slate-400 mb-6">
              Join CineVerse today and unlock unlimited access to the world&apos;s best movies and series.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Free Trial
              </button>
              <button className="border border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}