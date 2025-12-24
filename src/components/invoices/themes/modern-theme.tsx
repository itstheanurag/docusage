import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewNotes from "../preview/notes";
import PreviewTotals from "../preview/preview-total";
import { formatCurrency } from "@/lib/format-currency";
interface ThemeProps {
  invoice: InvoiceStore;
}

export const ModernTheme: React.FC<ThemeProps> = ({ invoice }) => {
  const accentColor = invoice.accentColor || "#000000";

  return (
    <div className="font-sans text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 min-h-[1000px] h-full relative flex flex-col">
       {/* Modern Header with Color Strip */}
      <div 
        className="h-4 w-full"
        style={{ backgroundColor: accentColor }}
      />
      
      <div className="p-8 md:p-12 flex-1">
        <header className="flex justify-between items-start mb-16">
          <div className="flex flex-col gap-2">
            {invoice.fromLogo ? (
               // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={invoice.fromLogo} 
                alt="Company Logo" 
                className="h-16 w-auto object-contain mb-4"
              />
            ) : (
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: accentColor }}>
                {invoice.fromName || "Company Name"}
              </h1>
            )}
            <div className="text-sm text-neutral-500 dark:text-neutral-400 max-w-[250px] leading-relaxed">
              {invoice.fromAddress || "Company Address"}
              <br />
              {invoice.fromEmail}
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-6xl font-black text-neutral-100 dark:text-neutral-800 uppercase tracking-tighter mb-4 select-none">
              Invoice
            </h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between gap-8 border-b border-neutral-100 dark:border-neutral-800 pb-1">
                <span className="text-neutral-500 dark:text-neutral-400">Invoice No.</span>
                <span className="font-semibold font-mono">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between gap-8 border-b border-neutral-100 dark:border-neutral-800 pb-1 pt-1">
                 <span className="text-neutral-500 dark:text-neutral-400">Date Issued</span>
                <span>{invoice.invoiceDate}</span>
              </div>
               <div className="flex justify-between gap-8 pt-1">
                 <span className="text-neutral-500 dark:text-neutral-400">Due Date</span>
                <span>{invoice.dueDate}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex gap-16 mb-16 bg-neutral-50/50 dark:bg-neutral-900/50 p-8 rounded-xl border border-neutral-100 dark:border-neutral-800">
           <div className="flex-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
              Billed To
            </h3>
            <div className="font-medium text-lg mb-1">{invoice.toName || "Client Name"}</div>
             <div className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2">
               {invoice.toAddress || "Client Address"}
            </div>
             <div className="text-sm text-neutral-500 dark:text-neutral-400">{invoice.toEmail}</div>
           </div>
           
           <div className="flex-1 border-l border-neutral-200 dark:border-neutral-800 pl-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                Total Due
              </h3>
              <div 
                className="text-4xl font-bold tracking-tight"
                style={{ color: accentColor }}
              >
                {formatCurrency(invoice.calculateTotal(), invoice.currency)}
              </div>
              <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                Please pay by {invoice.dueDate}
              </div>
           </div>
        </div>

        <div className="mb-12">
            <PreviewItems invoice={invoice} />
        </div>

        <div className="flex justify-end mb-12">
            <div className="w-1/2 md:w-5/12">
                 <PreviewTotals invoice={invoice} />
            </div>
        </div>

        {invoice.notes && (
          <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg border border-neutral-100 dark:border-neutral-800 border-l-4" style={{ borderLeftColor: accentColor }}>
            <h3 className="text-sm font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Notes & Terms</h3>
            <PreviewNotes notes={invoice.notes} />
          </div>
        )}
      </div>
      
       <div 
        className="h-2 w-full mt-auto"
        style={{ backgroundColor: accentColor, opacity: 0.1 }}
      />
    </div>
  );
};
