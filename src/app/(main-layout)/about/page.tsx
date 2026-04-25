import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Users, Award, Globe, Heart, Star, Play, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { icon: Film, label: "Movies", value: "10,000+", description: "In our library" },
    { icon: Users, label: "Users", value: "2M+", description: "Active members" },
    { icon: Award, label: "Awards", value: "25+", description: "Industry recognition" },
    { icon: Globe, label: "Countries", value: "50+", description: "Global reach" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Cinema",
      description: "We believe in the power of storytelling and the magic of cinema to connect people across cultures and generations."
    },
    {
      icon: Star,
      title: "Quality First",
      description: "We curate the best movies with the highest quality streaming, ensuring an exceptional viewing experience."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform thrives on user feedback and community engagement, helping us discover and share great content."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making world-class cinema accessible to everyone, everywhere, with multi-language support and global content."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      bio: "Former film industry executive with 15+ years of experience in digital media."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      bio: "Tech innovator specializing in streaming technology and user experience design."
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Content",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      bio: "Film critic and curator with expertise in international cinema and emerging filmmakers."
    },
    {
      name: "David Kim",
      role: "VP of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      bio: "Operations expert ensuring seamless global distribution and customer satisfaction."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-red-600/10 text-red-400 border-red-600/20">
              🎭 About CineVerse
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Bringing Cinema to Your Screen
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Founded in 2020, CineVerse is revolutionizing the way people discover, watch, and share movies.
              We&apos;re passionate about connecting film lovers with the stories that matter most to them.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Play className="w-5 h-5 mr-2" />
              Watch Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-300 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              To create the world&apos;s most comprehensive and accessible movie platform, where every film lover
              can discover their next favorite story, connect with fellow cinephiles, and experience cinema
              in its purest form.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-slate-400">The principles that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <CardTitle className="text-white">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-slate-400">The passionate people behind CineVerse</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 text-center">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <p className="text-red-400 font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-red-600/10 to-purple-600/10 border-red-600/20">
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Join the CineVerse Community</h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Be part of a growing community of film enthusiasts. Discover new movies, share your thoughts,
              and connect with fellow movie lovers from around the world.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}