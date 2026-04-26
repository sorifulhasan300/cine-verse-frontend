import React, { Suspense } from "react";
import { CategoryAdmin } from "@/components/modules/dashboard/admin/CategoryAdmin";

function CategoryLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400">Manage Categories</h2>
      </div>
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">Loading categories...</p>
      </div>
    </div>
  );
}

function CategoryPage() {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryAdmin />
    </Suspense>
  );
}

export default CategoryPage;
