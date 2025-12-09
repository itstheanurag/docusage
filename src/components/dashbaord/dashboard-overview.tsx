"use client";

import StatsGrid from "./overview/stats-grid";
import QuickActions from "./overview/quick-actions";
import RecentActivity from "./overview/recent-activities";



export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back! Here&apos;s a visual summary of your workspace.
          </p>
        </div>
      </div>

      <StatsGrid />

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <RecentActivity />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
