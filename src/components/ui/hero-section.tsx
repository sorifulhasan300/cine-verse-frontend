import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Film, Play, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Cinematic overlay pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-6">
            <Film className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-400">Welcome to the Future of Cinema</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6">
            <span className="block">Experience</span>
            <span className="block bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              CineVerse
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Dive into an immersive world of movies, series, and entertainment.
            Discover, watch, and share your cinematic journey with fellow film enthusiasts.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-[0_0_25px_rgba(220,38,38,0.3)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] transition-all duration-300"
            asChild
          >
            <Link href="/register">
              <Play className="w-5 h-5 mr-2" />
              Start Watching
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg font-semibold"
            asChild
          >
            <Link href="/login">
              <Star className="w-5 h-5 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>

        {/* Stats or features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <div className="text-3xl font-bold text-red-500 mb-2">10K+</div>
            <div className="text-slate-400">Movies & Series</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <div className="text-3xl font-bold text-red-500 mb-2">HD</div>
            <div className="text-slate-400">4K Quality Streaming</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
            <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
            <div className="text-slate-400">Always Available</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}