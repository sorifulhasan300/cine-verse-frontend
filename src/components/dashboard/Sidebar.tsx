"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { getRoutesForRole } from "./Dashboard.Routes";
import { Film } from "lucide-react";
import { User } from "@/types/user.types";

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        console.log("user session client", session);
        if (session.data?.user) {
          setUser(session.data.user as unknown as User);
        }
      } catch (error) {
        console.error("Failed to get session:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  if (loading) {
    return (
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-red-500" />
            <span className="text-white font-bold text-lg">CineVerse</span>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userRoutes = getRoutesForRole(user.role);

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Film className="w-6 h-6 text-red-500" />
          <span className="text-white font-bold text-lg">CineVerse</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {userRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.path;

            return (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{route.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user.email.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.email}
            </p>
            <p className="text-xs text-slate-400 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
