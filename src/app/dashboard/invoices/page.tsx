"use client";

import { DashboardLayout } from "@/components/dashbaord/dashboard-layout";
import { InvoicesManager } from "@/components/dashbaord/invoices-manager";

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <InvoicesManager />
    </DashboardLayout>
  );
}
