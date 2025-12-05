"use client";

import { Button } from "@/components/ui/button";
import { Eye, Edit, Download, Send } from "lucide-react";

const InvoiceActions = ({ invoice }: { invoice: any }) => {
  return (
    <div className="flex space-x-1">
      <Button variant="ghost" size="icon">
        <Eye className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon">
        <Edit className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon">
        <Download className="h-4 w-4" />
      </Button>

      {invoice.status === "Draft" && (
        <Button variant="ghost" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default InvoiceActions;
