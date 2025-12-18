"use client";

import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Receipt, TrendingUp, Users } from "lucide-react";
import { useManagementStore } from "@/store/managementStore";
import { useEffect, useMemo } from "react";


const StatsGrid = memo(() => {
  const { overviewStats, fetchData } = useManagementStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const statsWithIcons = useMemo(() => {
    const icons = {
      "Total Documents": { icon: FileText, color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-900/20" },
      "Invoices Created": { icon: Receipt, color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/20" },
      "Revenue Generated": { icon: TrendingUp, color: "text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-900/20" },
      "Active Clients": { icon: Users, color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-900/20" },
    };

    return overviewStats.map((stat) => ({
      ...stat,
      ...(icons[stat.title as keyof typeof icons] || icons["Total Documents"]),
    }));
  }, [overviewStats]);

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {statsWithIcons.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">{stat.change}</span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

StatsGrid.displayName = "StatsGrid";
export default StatsGrid;
