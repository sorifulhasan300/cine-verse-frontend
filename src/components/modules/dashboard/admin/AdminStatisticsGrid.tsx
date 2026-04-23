import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Film, MessageSquare, CreditCard } from "lucide-react";

interface StatisticsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatisticsCard({ title, value, icon, color }: StatisticsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-red-500/20 hover:border-red-500/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
}

interface AdminStatisticsGridProps {
  users: number;
  movies: number;
  reviews: number;
  subscriptions: number;
}

export function AdminStatisticsGrid({ users, movies, reviews, subscriptions }: AdminStatisticsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatisticsCard
        title="Total Users"
        value={users}
        icon={<Users className="h-4 w-4" />}
        color="bg-blue-500/20 text-blue-400"
      />
      <StatisticsCard
        title="Total Movies"
        value={movies}
        icon={<Film className="h-4 w-4" />}
        color="bg-red-500/20 text-red-400"
      />
      <StatisticsCard
        title="Total Reviews"
        value={reviews}
        icon={<MessageSquare className="h-4 w-4" />}
        color="bg-yellow-500/20 text-yellow-400"
      />
      <StatisticsCard
        title="Total Subscriptions"
        value={subscriptions}
        icon={<CreditCard className="h-4 w-4" />}
        color="bg-green-500/20 text-green-400"
      />
    </div>
  );
}