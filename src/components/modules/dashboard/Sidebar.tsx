"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { getRoutesForRole } from "./Dashboard.Routes";
import { Film, LogOut, Settings, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserRole } from "@/types/role.types";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // লোডিং স্টেট (Skeleton Vibe)
  if (isPending) {
    return (
      <div className="w-72 bg-[#050509] border-r border-white/5 flex flex-col h-screen">
        <div className="p-8">
          <div className="h-8 w-32 bg-white/5 animate-pulse rounded-lg" />
        </div>
        <div className="flex-1 px-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-12 w-full bg-white/5 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userRoutes = getRoutesForRole(
    (user as { role?: string })?.role as UserRole,
  );

  return (
    <aside className="w-72 bg-[#050509]/95 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen sticky top-0">
      {/* --- LOGO SECTION --- */}
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-red-600 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:scale-110 transition-transform">
            <Film className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-widest text-white uppercase italic">
            Cine<span className="text-red-600">Verse</span>
          </span>
        </Link>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">
          Main Menu
        </p>

        {userRoutes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.path;

          return (
            <Link key={route.path} href={route.path}>
              <div
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 mb-1",
                  isActive
                    ? "bg-gradient-to-r from-red-600/20 to-transparent text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
                )}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full shadow-[2px_0_10px_rgba(220,38,38,0.8)]" />
                )}

                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform group-hover:scale-110",
                    isActive ? "text-red-500" : "text-slate-500",
                  )}
                />

                <span className="text-sm font-semibold tracking-wide">
                  {route.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* --- BOTTOM SECTION (User Profile) --- */}
      <div className="p-4 mt-auto">
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 border-2 border-red-600/20">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback className="bg-red-950 text-red-500 font-bold">
                {user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate leading-none mb-1">
                {user.name || "Cinema Fan"}
              </p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-tighter">
                {user.role} Account
              </p>
            </div>
          </div>

          <Separator className="bg-white/5 mb-3" />

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-white/5 h-9 rounded-lg"
              asChild
            >
              <Link
                href={
                  (user.role as unknown as UserRole) === UserRole.ADMIN
                    ? "/admin/settings"
                    : "/user/settings"
                }
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-red-500 hover:bg-red-500/10 h-9 rounded-lg"
              onClick={() => authClient.signOut()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
