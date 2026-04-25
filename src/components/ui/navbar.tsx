"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Film, LogOut, User, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/user.types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as unknown as UserType | null;
  const [mounted, setMounted] = useState(false);

  const isPremium = user?.plan && user?.currentPeriodEnd;
  const endDate = user?.currentPeriodEnd
    ? new Date(user.currentPeriodEnd).toLocaleDateString()
    : null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <nav className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      {/* Left side - Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="p-2 bg-red-600 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:scale-110 transition-transform">
          <Film className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-black tracking-widest text-white uppercase italic">
          Cine<span className="text-red-600">Verse</span>
        </span>
      </Link>

      {/* Right side - User menu or login */}
      <div className="flex items-center gap-4">
        {isPending || !mounted ? (
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
          </div>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative h-8 w-8 rounded-full hover:bg-slate-800/50 transition-colors cursor-pointer">
                <Avatar className="h-8 w-8 border-2 border-red-600/20">
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback className="bg-red-950 text-red-500 font-bold">
                    {user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isPremium && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center border border-slate-950">
                    <Crown className="w-2.5 h-2.5 text-slate-950" />
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-slate-900 border-slate-700"
              align="end"
            >
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-white">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-slate-400">{user.email}</p>
                {isPremium && (
                  <div className="flex items-center gap-1 mt-1">
                    <Crown className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-yellow-400">
                      Premium {user.plan} • Valid until {endDate}
                    </span>
                  </div>
                )}
              </div>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    (user.role as string) === "admin" ? "/admin" : "/user",
                  )
                }
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <User className="mr-2 h-4 w-4" />
                Go to Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 hover:bg-red-950/50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white hover:bg-slate-800"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              asChild
            >
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
