import React from "react";
import Link from "next/link";
import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-red-600 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:scale-110 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-widest text-white uppercase italic">
              Cine<span className="text-red-600">Verse</span>
            </span>
          </Link>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} CineVerse. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Your ultimate destination for movies and entertainment.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}