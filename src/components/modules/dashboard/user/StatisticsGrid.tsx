import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Heart, MessageSquare, Eye } from "lucide-react";

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

interface StatisticsGridProps {
  watchList: number;
  likes: number;
  reviews: number;
  comments: number;
}

export function StatisticsGrid({ watchList, likes, reviews, comments }: StatisticsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatisticsCard
        title="Watchlist"
        value={watchList}
        icon={<Film className="h-4 w-4" />}
        color="bg-red-500/20 text-red-400"
      />
      <StatisticsCard
        title="Likes"
        value={likes}
        icon={<Heart className="h-4 w-4" />}
        color="bg-pink-500/20 text-pink-400"
      />
      <StatisticsCard
        title="Reviews"
        value={reviews}
        icon={<MessageSquare className="h-4 w-4" />}
        color="bg-blue-500/20 text-blue-400"
      />
      <StatisticsCard
        title="Comments"
        value={comments}
        icon={<Eye className="h-4 w-4" />}
        color="bg-green-500/20 text-green-400"
      />
    </div>
  );
}