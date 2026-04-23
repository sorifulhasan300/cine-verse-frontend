import React from "react";
import { AdminStatisticsGrid } from "@/components/modules/dashboard/admin/AdminStatisticsGrid";
import { AdminBarChart } from "@/components/modules/dashboard/admin/AdminBarChart";
import { AdminPieChart } from "@/components/modules/dashboard/admin/AdminPieChart";
import { statisticsService } from "@/services/statistics.service";

export default async function AdminDashboardPage() {
  const { data: statistics, error } =
    await statisticsService.getAdminStatistics();

  if (error) {
    return (
      <div className="">
        <div className="container mx-auto">
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="">
        <div className="container mx-auto">
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">Loading statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto space-y-8">
        {/* Statistics Cards */}
        <AdminStatisticsGrid
          users={statistics.users.total}
          movies={statistics.movies.total}
          reviews={statistics.reviews.total}
          subscriptions={statistics.subscriptions.total}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminBarChart
            data={statistics.users.byRole.chartData}
            title="Users by Role"
            description="Distribution of users across different roles"
          />
          <AdminPieChart
            data={statistics.users.byStatus.chartData}
            title="Users by Status"
            description="Active and inactive user distribution"
          />
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminBarChart
            data={statistics.movies.byCategory.chartData}
            title="Movies by Category"
            description="Movie distribution across categories"
          />
          <AdminPieChart
            data={statistics.movies.byPricing.chartData}
            title="Movies by Pricing"
            description="Premium and free movie distribution"
          />
        </div>
      </div>
    </div>
  );
}
