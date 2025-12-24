import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewTotals from "../preview/preview-total";
import { formatCurrency } from "@/lib/format-currency";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const ProfessionalTheme: React.FC<ThemeProps> = ({ invoice }) => {
  const accentColor = invoice.accentColor || "#000000";

  return (
    <div className="font-sans text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 min-h-[1000px] h-full relative flex">
       {/* Sidebar */}
       <div className="w-1/3 bg-neutral-100 dark:bg-neutral-900 p-8 flex flex-col gap-12 border-r border-neutral-200 dark:border-neutral-800">
          <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">From</h3>
              {invoice.fromLogo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={invoice.fromLogo} alt="Logo" className="w-24 h-auto object-contain mb-4" />
              )}
              <div className="font-bold text-lg mb-1">{invoice.fromName || "Company Name"}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {invoice.fromAddress}
                  <br/>
                  {invoice.fromEmail}
              </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">Bill To</h3>
            <div className="font-bold text-lg mb-1">{invoice.toName || "Client Name"}</div>
             <div className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {invoice.toAddress}
                  <br/>
                  {invoice.toEmail}
              </div>
          </div>
          
          <div className="mt-auto">
             <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Total Amount</h3>
             <div className="text-3xl font-bold" style={{ color: accentColor }}>
                 {formatCurrency(invoice.calculateTotal(), invoice.currency)}
             </div>
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 p-8 md:p-12 flex flex-col">
          <header className="flex justify-end mb-12">
             <div className="text-right">
                <h1 className="text-4xl font-black uppercase tracking-tight text-neutral-200 dark:text-neutral-800">Invoice</h1>
                <div className="font-mono font-bold text-xl">#{invoice.invoiceNumber}</div>
             </div>
          </header>

          <div className="grid grid-cols-2 gap-8 mb-12 p-6 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
             <div>
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Date Issued</span>
                <span className="font-medium">{invoice.invoiceDate}</span>
             </div>
              <div>
                <span className="block text-xs text-neutral-500 dark:text-neutral-400 mb-1">Due Date</span>
                <span className="font-medium">{invoice.dueDate}</span>
             </div>
          </div>

          <div className="mb-8">
             <PreviewItems invoice={invoice} />
          </div>
          
          <div className="ml-auto w-1/2">
             <PreviewTotals invoice={invoice} />
          </div>

          {invoice.notes && (
            <div className="mt-auto pt-8 border-t border-neutral-100 dark:border-neutral-800">
               <h4 className="font-bold text-sm mb-2">Notes</h4>
               <p className="text-sm text-neutral-500 dark:text-neutral-400">{invoice.notes}</p>
            </div>
          )}
       </div>
    </div>
  );
};
