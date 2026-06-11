"use client";

import React from "react";
import { Film, AlertCircle } from "lucide-react";
import { YoutubeLogoIcon } from "@phosphor-icons/react";

interface MoviePlayerProps {
  url: string;
}

export function MoviePlayer({ url }: MoviePlayerProps) {
  console.log("MoviePlayer URL:", url);

  if (!url) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0d0d1a] border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-slate-400 p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
        <p className="text-[14px]">দুঃখিত, এই মুভির কোনো ভিডিও লিংক খুঁজে পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0d0d1a] border border-slate-800 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        <div className="w-12 h-12 bg-red-600/10 border border-red-600/20 rounded-full flex items-center justify-center mb-4">
          <Film className="w-5 h-5 text-red-500 animate-pulse" />
        </div>

        <h3 className="text-white text-[16px] font-semibold mb-1">In-App Player Coming Soon!</h3>
        <p className="text-slate-400 text-[13px] mb-6 leading-relaxed">
          We are currently developing our built-in video player to bring you a seamless viewing experience. In the meantime, please click the button below to watch the movie directly on YouTube.
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-[14px] font-medium px-5 py-2.5 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-200"
        >
          <YoutubeLogoIcon className="w-4 h-4 fill-white" />
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}