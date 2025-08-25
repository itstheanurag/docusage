"use client";

import { DashboardLayout } from "@/components/dashbaord/dashboard-layout";
import { DashboardOverview } from "@/components/dashbaord/dashboard-overview";
import { ProtectedRoute } from "@/lib/auth-provider";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardOverview />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
