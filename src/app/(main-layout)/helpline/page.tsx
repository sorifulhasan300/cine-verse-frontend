import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, Clock, MapPin, HelpCircle } from "lucide-react";

export default function HelplinePage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri: 9AM-6PM EST",
      color: "from-blue-600 to-blue-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions via email",
      contact: "support@cineverse.com",
      availability: "Response within 24 hours",
      color: "from-green-600 to-green-500"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help through our chat system",
      contact: "Available 24/7",
      availability: "Real-time assistance",
      color: "from-purple-600 to-purple-500"
    }
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password'. Enter your email and follow the instructions sent to your inbox."
    },
    {
      question: "Can I download movies for offline viewing?",
      answer: "Yes, premium subscribers can download movies for offline viewing on our mobile and desktop apps."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 7-day free trial for new users. No credit card required to sign up."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-red-600/10 text-red-400 border-red-600/20">
              🆘 Support Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Helpline & Support
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Need help? Our support team is here to assist you with any questions or issues you might have.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-slate-400">Choose the support method that works best for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-400 mb-4">{method.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-white font-semibold">{method.contact}</p>
                    <p className="text-sm text-slate-400">{method.availability}</p>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick FAQs */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <p className="text-slate-400">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-700 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">{faq.question}</h4>
                    <p className="text-slate-400">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-slate-600 hover:bg-slate-800 text-slate-300">
              View All FAQs
            </Button>
          </div>
        </div>

        {/* Office Info */}
        <div className="mt-12 text-center">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
            <MapPin className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Visit Our Office</h3>
            <p className="text-slate-400 mb-4">
              123 Movie Street, Hollywood, CA 90210<br />
              United States
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Mon-Fri: 9AM-6PM PST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}