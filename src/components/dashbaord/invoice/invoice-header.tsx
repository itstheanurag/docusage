"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const InvoiceHeader = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">
          Manage your invoices & track payments
        </p>
      </div>

      <Button onClick={() => router.push("/invoice")}>
        <Plus className="mr-2 h-4 w-4" />
        Create Invoice
      </Button>
    </div>
  );
};

export default React.memo(InvoiceHeader);
