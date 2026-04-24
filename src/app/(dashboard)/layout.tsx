"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/modules/dashboard/Sidebar";
import { Topbar } from "@/components/modules/dashboard/Topbar";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onMenuClick={() => setDrawerOpen(true)} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
        <DrawerContent className="w-72 bg-[#050509]/95 backdrop-blur-xl border-r border-white/5">
          <Sidebar onClose={() => setDrawerOpen(false)} isInDrawer />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default DashboardLayout;
