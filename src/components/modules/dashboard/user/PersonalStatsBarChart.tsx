"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalStatsBarChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
}

export function PersonalStatsBarChart({ data }: PersonalStatsBarChartProps) {
  const colors = ["#ef4444", "#ec4899", "#3b82f6", "#10b981"];

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-red-500/20">
      <CardHeader>
        <CardTitle className="text-white">Personal Statistics</CardTitle>
        <CardDescription className="text-slate-300">
          Your activity overview across different categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="label"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #ef4444",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}