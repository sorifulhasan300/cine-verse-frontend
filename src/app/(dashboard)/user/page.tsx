import React from "react";
import { StatisticsGrid } from "@/components/modules/dashboard/user/StatisticsGrid";
import { PersonalStatsBarChart } from "@/components/modules/dashboard/user/PersonalStatsBarChart";
import { ActivityPieChart } from "@/components/modules/dashboard/user/ActivityPieChart";
import { statisticsService } from "@/services/statistics.service";

export default async function UserDashboardPage() {
  const { data: statistics, error } =
    await statisticsService.getUserStatistics();

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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-slate-300">Track your activity and engagement</p>
        </div>

        {/* Statistics Cards */}
        <StatisticsGrid
          watchList={statistics.personalStats.raw.watchList}
          likes={statistics.personalStats.raw.likes}
          reviews={statistics.personalStats.raw.reviews}
          comments={statistics.personalStats.raw.comments}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PersonalStatsBarChart
            data={statistics.personalStats.barChart.chartData}
          />
          <ActivityPieChart
            data={statistics.activity.reviewsByMonth.chartData}
          />
        </div>
      </div>
    </div>
  );
}
