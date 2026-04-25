"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      title: "Account & Registration",
      icon: "👤",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the &apos;Sign Up&apos; button in the top right corner and fill out the registration form with your email, password, and basic information. You&apos;ll receive a verification email to activate your account."
        },
        {
          question: "I forgot my password. What should I do?",
          answer: "On the login page, click &apos;Forgot Password&apos;. Enter your email address and we&apos;ll send you a reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can update your email address in your account settings. You&apos;ll need to verify the new email address before it becomes active."
        },
        {
          question: "How do I delete my account?",
          answer: "Account deletion can be requested through the support team. Please contact our helpline for assistance with account deletion."
        }
      ]
    },
    {
      title: "Subscription & Billing",
      icon: "💳",
      questions: [
        {
          question: "What are the subscription plans?",
          answer: "We offer Monthly ($9.99/month) and Yearly ($99/year) plans. Both provide unlimited access to our movie library, HD streaming, and offline downloads."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription anytime from your account dashboard. Your access will continue until the end of your current billing period."
        },
        {
          question: "Can I change my subscription plan?",
          answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 7-day money-back guarantee for new subscriptions. Refund requests should be made within 7 days of purchase."
        }
      ]
    },
    {
      title: "Movies & Streaming",
      icon: "🎬",
      questions: [
        {
          question: "What devices can I watch on?",
          answer: "You can watch on web browsers, iOS and Android mobile apps, smart TVs, streaming devices (Roku, Fire TV), and gaming consoles."
        },
        {
          question: "Can I download movies for offline viewing?",
          answer: "Yes, premium subscribers can download movies for offline viewing on mobile and desktop apps. Downloads expire after 30 days."
        },
        {
          question: "What video quality is available?",
          answer: "We offer up to 4K Ultra HD streaming for compatible devices and premium subscribers. Standard definition is available for all users."
        },
        {
          question: "Are there parental controls?",
          answer: "Yes, you can set up parental controls and create separate profiles for family members with age-appropriate content restrictions."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: "🔧",
      questions: [
        {
          question: "The video won&apos;t play. What should I do?",
          answer: "Try refreshing the page, clearing your browser cache, or updating your browser. If the issue persists, try a different device or contact support."
        },
        {
          question: "Why is the video buffering?",
          answer: "Buffering can be caused by slow internet connection, network congestion, or device performance. Try lowering the video quality or connecting to a faster network."
        },
        {
          question: "Can I watch on multiple devices simultaneously?",
          answer: "Premium accounts allow up to 4 simultaneous streams. Free accounts are limited to 1 device at a time."
        },
        {
          question: "How do I update the app?",
          answer: "Mobile apps update automatically through your device&apos;s app store. Web browsers should work with the latest versions of Chrome, Firefox, Safari, and Edge."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-red-600/10 text-red-400 border-red-600/20">
              ❓ Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              FAQ
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              Find answers to common questions about CineVerse. Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-slate-400">Try adjusting your search terms or contact support for help.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openItems.has(globalIndex);

                    return (
                      <Card key={faqIndex} className="bg-slate-900 border-slate-700">
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full text-left p-6 hover:bg-slate-800 transition-colors group"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-white font-semibold pr-4">{faq.question}</h3>
                              {isOpen ? (
                                <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white flex-shrink-0" />
                              )}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-6 pb-6">
                              <div className="border-t border-slate-700 pt-4">
                                <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="bg-slate-900 border-slate-700 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <HelpCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
              <p className="text-slate-400 mb-6">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-red-600 hover:bg-red-700">
                  Contact Support
                </Button>
                <Button variant="outline" className="border-slate-600 hover:bg-slate-800 text-slate-300">
                  Visit Helpline
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}