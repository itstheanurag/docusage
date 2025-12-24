import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewTotals from "../preview/preview-total";
import { formatCurrency } from "@/lib/format-currency";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const ElegantTheme: React.FC<ThemeProps> = ({ invoice }) => {
  const accentColor = invoice.accentColor || "#000000";

  return (
    <div className="font-serif text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 p-12 min-h-[1000px] h-full relative border-8 border-double border-neutral-100 dark:border-neutral-900 m-4">
      
      {/* Centered Header */}
      <header className="text-center mb-16">
        {invoice.fromLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
            src={invoice.fromLogo} 
            alt="Company Logo" 
            className="h-24 w-auto object-contain mx-auto mb-6"
            />
        ) : (
            <h1 className="text-4xl font-bold tracking-wide uppercase mb-2" style={{ color: accentColor }}>
                {invoice.fromName || "Company Name"}
            </h1>
        )}
        
        <div className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
             {invoice.fromAddress} • {invoice.fromEmail}
        </div>

        <div className="w-16 h-1 bg-neutral-200 dark:bg-neutral-800 mx-auto mt-8 mb-8" />
        
        <div className="text-2xl font-light uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
            Invoice
        </div>
      </header>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-12 mb-16 px-8">
        <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                Billed To
            </h3>
            <div className="text-xl mb-2">{invoice.toName || "Client Name"}</div>
            <div className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                {invoice.toAddress}
                <br/>
                {invoice.toEmail}
            </div>
        </div>

        <div className="text-right">
             <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2 flex justify-end">
                Reference
            </h3>
            <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-sm">
                <span className="text-neutral-400 dark:text-neutral-500 uppercase tracking-wider text-xs self-center">Number</span>
                <span className="font-mono text-lg">{invoice.invoiceNumber}</span>
                
                <span className="text-neutral-400 dark:text-neutral-500 uppercase tracking-wider text-xs self-center">Date</span>
                <span>{invoice.invoiceDate}</span>
                
                <span className="text-neutral-400 dark:text-neutral-500 uppercase tracking-wider text-xs self-center">Due</span>
                <span>{invoice.dueDate}</span>
            </div>
        </div>
      </div>

      <div className="px-8 mb-8">
         <PreviewItems invoice={invoice} />
      </div>

      <div className="px-8 flex justify-end mb-16">
         <div className="w-1/2 md:w-5/12">
            <PreviewTotals invoice={invoice} />
            <div className="mt-4 pt-4 border-t-2 border-double border-neutral-200 dark:border-neutral-800 flex justify-between items-baseline">
                <span className="text-lg font-bold">Total Due</span>
                <span className="text-3xl font-bold" style={{ color: accentColor }}>
                    {formatCurrency(invoice.calculateTotal(), invoice.currency)}
                </span>
            </div>
         </div>
      </div>

      {invoice.notes && (
        <div className="px-8 text-center mt-auto">
            <p className="text-sm italic text-neutral-500 dark:text-neutral-400 border-t border-b border-neutral-100 dark:border-neutral-900 py-6 max-w-lg mx-auto">
                 {invoice.notes}
            </p>
        </div>
      )}
      
      <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-neutral-300 dark:text-neutral-700 uppercase tracking-widest">
         Thank you for your business
      </div>

    </div>
  );
};
