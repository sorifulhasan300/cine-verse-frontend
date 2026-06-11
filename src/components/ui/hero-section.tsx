import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Film, Play, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d1a]">
      {/* ── Background Video & Gradient Overlays ── */}
      <div className="absolute inset-0 z-0">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.02] filter brightness-[0.90] contrast-[1.1]"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback */}
          {/* <source src="https://assets.mixkit.co/videos/preview/mixkit-clapperboard-and-film-strips-under-lights-42220-large.mp4" type="video/mp4" /> */}
        </video>

        {/* Cinematic Layer 1: Dark Slate Gradient to preserve contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#11111c]/70 to-[#0d0d1a]/50" />

        {/* Cinematic Layer 2: Core Red Radial Light Drop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.15),transparent_65%)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Main heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 mb-6 backdrop-blur-md">
            <Film className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-sm font-medium text-red-400">Welcome to the Future of Cinema</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 select-none">
            <span className="block drop-shadow-md">Experience</span>
            <span className="block bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(220,38,38,0.2)]">
              CineVerse
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
            Dive into an immersive world of movies, series, and entertainment.
            Discover, watch, and share your cinematic journey with fellow film enthusiasts.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] transition-all duration-300 w-full sm:w-auto"
            asChild
          >
            <Link href="/register">
              <Play className="w-5 h-5 mr-2 fill-white" />
              Start Watching
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-slate-700 bg-[#11111c]/40 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-200 w-full sm:w-auto"
            asChild
          >
            <Link href="/login">
              <Star className="w-5 h-5 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>

        {/* Stats or features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#11111c]/40 backdrop-blur-md border border-slate-800/60 rounded-xl p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-red-500 mb-1 drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]">10K+</div>
            <div className="text-slate-400 text-sm font-medium">Movies & Series</div>
          </div>
          <div className="bg-[#11111c]/40 backdrop-blur-md border border-slate-800/60 rounded-xl p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-red-500 mb-1 drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]">4K UHD</div>
            <div className="text-slate-400 text-sm font-medium">Ultra Quality Streaming</div>
          </div>
          <div className="bg-[#11111c]/40 backdrop-blur-md border border-slate-800/60 rounded-xl p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1">
            <div className="text-3xl font-bold text-red-500 mb-1 drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]">24/7</div>
            <div className="text-slate-400 text-sm font-medium">Instant Availability</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 hidden sm:block">
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center bg-[#0d0d1a]/20 backdrop-blur-sm">
          <div className="w-1 h-2 bg-red-500 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}