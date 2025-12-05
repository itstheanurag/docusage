"use client";

import { Badge } from "@/components/ui/badge";

const InvoiceStatusBadge = ({ status }: { status: string }) => {
  const variant =
    status === "Paid"
      ? "default"
      : status === "Sent"
        ? "secondary"
        : status === "Overdue"
          ? "destructive"
          : "outline";

  return <Badge variant={variant}>{status}</Badge>;
};

export default InvoiceStatusBadge;
