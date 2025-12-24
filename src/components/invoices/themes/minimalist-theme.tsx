import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewTotals from "../preview/preview-total";
import { formatCurrency } from "@/lib/format-currency";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const MinimalistTheme: React.FC<ThemeProps> = ({ invoice }) => {
  return (
    <div className="font-mono text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 p-8 md:p-12 min-h-[1000px] h-full relative">
      <header className="mb-16">
        <div className="flex justify-between items-end border-b-2 border-neutral-900 dark:border-neutral-100 pb-4 mb-4">
            <h1 className="text-4xl font-bold uppercase tracking-tight">Invoice</h1>
            <div className="text-right">
                <span className="text-lg font-bold">#{invoice.invoiceNumber}</span>
            </div>
        </div>
        <div className="flex justify-between text-sm">
             <div>
                <div className="font-bold">{invoice.fromName || "Company Name"}</div>
                <div className="text-neutral-500 dark:text-neutral-400">{invoice.fromEmail}</div>
             </div>
             <div className="text-right">
                <div className="text-neutral-500 dark:text-neutral-400">Date: {invoice.invoiceDate}</div>
                <div className="text-neutral-500 dark:text-neutral-400">Due: {invoice.dueDate}</div>
             </div>
        </div>
      </header>

      <div className="mb-16">
        <h3 className="text-xs font-bold uppercase mb-2 text-neutral-400 dark:text-neutral-500">Bill To</h3>
        <div className="text-xl font-bold mb-1">{invoice.toName || "Client Name"}</div>
        <div className="text-neutral-500 dark:text-neutral-400">{invoice.toAddress}</div>
        <div className="text-neutral-500 dark:text-neutral-400">{invoice.toEmail}</div>
      </div>

      <div className="mb-12">
        <PreviewItems invoice={invoice} />
      </div>

      <div className="flex justify-end mb-16">
        <div className="w-1/2 md:w-5/12">
            <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500 dark:text-neutral-400">Subtotal</span>
                <span>{formatCurrency(invoice.calculateSubtotal(), invoice.currency)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500 dark:text-neutral-400">{invoice.taxLabel} ({invoice.tax}%)</span>
                <span>{formatCurrency(invoice.calculateTax(), invoice.currency)}</span>
            </div>
            <div className="flex justify-between py-4 text-xl font-bold">
                <span>Total</span>
                <span>{formatCurrency(invoice.calculateTotal(), invoice.currency)}</span>
            </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="text-sm text-neutral-500 dark:text-neutral-400 border-l-2 border-neutral-200 dark:border-neutral-800 pl-4">
           {invoice.notes}
        </div>
      )}
    </div>
  );
};
