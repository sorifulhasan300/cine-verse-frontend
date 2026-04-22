import React from "react";
import { Sidebar } from "@/components/modules/dashboard/Sidebar";
import { Topbar } from "@/components/modules/dashboard/Topbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
