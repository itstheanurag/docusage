"use client";

import { Receipt, Calendar, User } from "lucide-react";
import InvoiceStatusBadge from "./shared/invoice-status-badge";
import InvoiceActions from "./shared/invoice-action";

const InvoiceListItem = ({ invoice }: { invoice: any }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 border-b last:border-b-0 hover:bg-muted/50 transition-colors gap-4">
      <div className="flex items-start gap-4 flex-1">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Receipt className="h-5 w-5 text-primary" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-medium truncate">{invoice.id}</p>

          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground gap-1">
            <span className="flex items-center truncate">
              <User className="mr-1 h-3 w-3" /> {invoice.client}
            </span>

            <span className="flex items-center truncate">
              <Calendar className="mr-1 h-3 w-3" /> Due {invoice.dueDate}
            </span>
          </div>

          <p className="text-sm text-muted-foreground truncate mt-1">
            {invoice.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="text-right">
          <p className="font-bold text-lg">
            ${invoice.amount.toLocaleString()}
          </p>
          <InvoiceStatusBadge status={invoice.status} />
        </div>

        <InvoiceActions invoice={invoice} />
      </div>
    </div>
  );
};

export default InvoiceListItem;
