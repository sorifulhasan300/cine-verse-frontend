import React, { Suspense } from "react";
import { MoviesAdmin } from "@/components/modules/dashboard/admin/MoviesAdmin";

function MoviesLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400">Manage Movies</h2>
      </div>
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">Loading movies...</p>
      </div>
    </div>
  );
}

function MoviesPage() {
  return (
    <Suspense fallback={<MoviesLoading />}>
      <MoviesAdmin />
    </Suspense>
  );
}

export default MoviesPage;
