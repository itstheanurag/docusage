import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewTotals from "../preview/preview-total";
import { formatCurrency } from "@/lib/format-currency";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const CompactTheme: React.FC<ThemeProps> = ({ invoice }) => {
  const accentColor = invoice.accentColor || "#000000";

  return (
    <div className="font-sans text-xs text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 min-h-[1000px] h-full relative p-6 md:p-8">
      
      <header className="flex justify-between items-start mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
         <div className="flex gap-4 items-center">
            {invoice.fromLogo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={invoice.fromLogo} alt="Logo" className="h-10 w-auto object-contain" />
            )}
            <div>
                <h1 className="text-lg font-bold leading-tight" style={{ color: accentColor }}>{invoice.fromName || "Company Name"}</h1>
                <div className="text-neutral-500 dark:text-neutral-400">
                    {invoice.fromAddress} | {invoice.fromEmail}
                </div>
            </div>
         </div>

         <div className="text-right">
             <div className="text-xl font-bold uppercase tracking-tight">Invoice #{invoice.invoiceNumber}</div>
             <div className="flex gap-4 justify-end text-neutral-500 dark:text-neutral-400">
                 <span>Issued: {invoice.invoiceDate}</span>
                 <span>Due: {invoice.dueDate}</span>
             </div>
         </div>
      </header>

      <div className="flex gap-8 mb-6">
         <div className="w-1/2">
             <h3 className="uppercase text-[10px] font-bold text-neutral-500 dark:text-neutral-400 mb-1">Bill To</h3>
             <div className="font-bold text-sm">{invoice.toName || "Client Name"}</div>
             <div className="text-neutral-500 dark:text-neutral-400">
                {invoice.toAddress} • {invoice.toEmail}
             </div>
         </div>
      </div>

      <div className="mb-4">
          <div className="[&_th]:py-1 [&_th]:text-[10px] [&_td]:py-1 [&_td]:text-xs [&_thead]:bg-neutral-100 dark:[&_thead]:bg-neutral-900">
             <PreviewItems invoice={invoice} />
          </div>
      </div>

      <div className="flex justify-end mb-6">
          <div className="w-1/3 text-right">
              <div className="flex justify-between py-1">
                  <span className="text-neutral-500 dark:text-neutral-400">Subtotal</span>
                  <span>{formatCurrency(invoice.calculateSubtotal(), invoice.currency)}</span>
              </div>
              <div className="flex justify-between py-1">
                  <span className="text-neutral-500 dark:text-neutral-400">Tax ({invoice.tax}%)</span>
                  <span>{formatCurrency(invoice.calculateTax(), invoice.currency)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-neutral-200 dark:border-neutral-800 font-bold text-lg mt-1">
                  <span>Total</span>
                  <span style={{ color: accentColor }}>{formatCurrency(invoice.calculateTotal(), invoice.currency)}</span>
              </div>
          </div>
      </div>

      {invoice.notes && (
          <div className="bg-neutral-50 dark:bg-neutral-900 p-3 rounded text-[10px] text-neutral-500 dark:text-neutral-400 border border-neutral-100 dark:border-neutral-800">
              <span className="font-bold mr-1">Notes:</span> {invoice.notes}
          </div>
      )}

      <div className="absolute bottom-4 left-6 right-6 text-[10px] text-neutral-400 dark:text-neutral-600 border-t border-neutral-100 dark:border-neutral-800 pt-2 flex justify-between">
           <span>Powerded by DocUsage</span>
           <span>Page 1 of 1</span>
      </div>

    </div>
  );
};
