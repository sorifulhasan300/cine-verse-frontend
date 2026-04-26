import React, { Suspense } from "react";
import { UsersAdmin } from "@/components/modules/dashboard/admin/UsersAdmin";

function UsersLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400">Manage Users</h2>
      </div>
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">Loading users...</p>
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<UsersLoading />}>
      <UsersAdmin />
    </Suspense>
  );
}
