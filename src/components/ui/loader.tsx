"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

export function Loader({
  fullScreen = false,
  text = "CineVerse",
  className,
}: LoaderProps) {
  const letters = Array.from(text);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullScreen
          ? "fixed inset-0 z-50 bg-[#020204] text-white"
          : "w-full min-h-[400px] bg-transparent text-white py-12",
        className,
      )}
    >
      {/* Visual Animation Box */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Glow effect background */}
        <div className="absolute w-24 h-24 rounded-full bg-red-600/10 blur-xl animate-pulse" />

        {/* Outer rotating neon-red gradient border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-20 h-20 rounded-full border-2 border-transparent border-t-red-600 border-r-red-600/40 border-b-red-600/10 border-l-red-600/40 flex items-center justify-center"
        />

        {/* Inner reverse-rotating Film reel icon */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute p-3 bg-slate-900 border border-white/5 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.2)] text-red-500"
        >
          <Film className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Pulsing movie brand subtitle/loading text */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-0.5 select-none">
          {letters.map((char, index) => {
            // "Cine" (0-3) is white, "Verse" (4-8) is red
            const isVerse = index >= 4;
            return (
              <motion.span
                key={index}
                initial={{ y: 0 }}
                animate={{ y: [-4, 0, -4] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.08,
                  ease: "easeInOut",
                }}
                className={cn(
                  "text-lg font-black tracking-widest uppercase italic",
                  isVerse ? "text-red-600" : "text-white",
                )}
              >
                {char}
              </motion.span>
            );
          })}
        </div>

        {/* Decorative blinking neon loading subtitle */}
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]"
        >
          Loading cinematic experience
        </motion.p>
      </div>
    </div>
  );
}
