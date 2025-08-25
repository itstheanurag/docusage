"use client";

import { DashboardLayout } from "@/components/dashbaord/dashboard-layout";
import { DocumentsManager } from "@/components/dashbaord/documents-manager";

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <DocumentsManager />
    </DashboardLayout>
  );
}
