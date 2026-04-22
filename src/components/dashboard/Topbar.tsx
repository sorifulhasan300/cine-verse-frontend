"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut, Menu, User } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession();
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

  const handleLogout = async () => {
    try {
      const toastId = toast.loading("Logging out...");
      await authClient.signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-slate-400 hover:text-white"
        onClick={onMenuClick}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Spacer for mobile */}
      <div className="md:hidden"></div>

      {/* User section */}
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
          </div>
        ) : user ? (
          <>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">{user.email}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 capitalize">{user.role}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </>
        ) : null}
      </div>
    </header>
  );
}
