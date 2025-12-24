import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewTotals from "../preview/preview-total";
import { formatCurrency } from "@/lib/format-currency";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const ClassicTheme: React.FC<ThemeProps> = ({ invoice }) => {
  return (
    <div className="font-serif text-neutral-900 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 min-h-[1000px] h-full relative p-8 md:p-12 m-4">
      
      {/* Top Header Box */}
      <div className="border border-neutral-400 dark:border-neutral-600 flex mb-8">
           <div className="flex-1 p-6 border-r border-neutral-400 dark:border-neutral-600">
               {invoice.fromLogo ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={invoice.fromLogo} alt="Logo" className="h-20 w-auto object-contain mb-4" />
               ) : (
                   <h1 className="text-3xl font-bold uppercase mb-2">{invoice.fromName || "Company Name"}</h1>
               )}
               <div className="text-sm text-neutral-600 dark:text-neutral-400">
                   {invoice.fromAddress}<br/>
                   {invoice.fromEmail}
               </div>
           </div>
           <div className="w-1/3 p-6 bg-neutral-100 dark:bg-neutral-800 flex flex-col justify-center">
               <h2 className="text-2xl font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2">Invoice</h2>
               <div className="flex justify-between border-b border-neutral-300 dark:border-neutral-600 pb-1 mb-1 text-sm dark:text-neutral-300">
                   <span>Invoice No:</span>
                   <span className="font-bold">{invoice.invoiceNumber}</span>
               </div>
               <div className="flex justify-between border-b border-neutral-300 dark:border-neutral-600 pb-1 mb-1 text-sm dark:text-neutral-300">
                   <span>Date:</span>
                   <span>{invoice.invoiceDate}</span>
               </div>
               <div className="flex justify-between text-sm dark:text-neutral-300">
                   <span>Due Date:</span>
                   <span>{invoice.dueDate}</span>
               </div>
           </div>
      </div>

      {/* Bill To Box */}
      <div className="border border-neutral-400 dark:border-neutral-600 p-6 mb-8 flex">
           <div className="flex-1">
               <h3 className="uppercase text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-2">Bill To</h3>
               <div className="text-lg font-bold mb-1 dark:text-white">{invoice.toName || "Client Name"}</div>
               <div className="text-neutral-600 dark:text-neutral-400">
                   {invoice.toAddress}<br/>
                   {invoice.toEmail}
               </div>
           </div>
      </div>

      {/* Items Table Grid Style */}
      <div className="border border-neutral-400 dark:border-neutral-600 px-6 py-4 mb-8 min-h-[300px]">
           <div className="[&_table]:w-full [&_thead]:border-b-2 [&_thead]:border-neutral-800 dark:[&_thead]:border-neutral-200 [&_th]:text-left [&_th]:uppercase [&_th]:text-xs [&_th]:py-2 [&_td]:py-3 [&_td]:border-b [&_td]:border-neutral-200 dark:[&_td]:border-neutral-700">
               <PreviewItems invoice={invoice} />
           </div>
      </div>

      {/* Totals Section */}
      <div className="flex justify-end mb-12">
           <div className="w-1/2 border border-neutral-400 dark:border-neutral-600 p-4 bg-neutral-50 dark:bg-neutral-800">
                <div className="flex justify-between mb-2 text-sm dark:text-neutral-300">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(invoice.calculateSubtotal(), invoice.currency)}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm dark:text-neutral-300">
                    <span>Tax ({invoice.tax}%):</span>
                    <span>{formatCurrency(invoice.calculateTax(), invoice.currency)}</span>
                </div>
                <div className="border-t border-neutral-400 dark:border-neutral-600 pt-2 flex justify-between font-bold text-lg dark:text-white">
                    <span>Total Due:</span>
                    <span>{formatCurrency(invoice.calculateTotal(), invoice.currency)}</span>
                </div>
           </div>
      </div>

      {invoice.notes && (
          <div className="border border-neutral-400 dark:border-neutral-600 p-4 bg-neutral-50 dark:bg-neutral-800 text-sm">
              <span className="font-bold dark:text-white">Note:</span> <span className="text-neutral-600 dark:text-neutral-400">{invoice.notes}</span>
          </div>
      )}

      <div className="absolute bottom-12 left-0 right-0 text-center text-xs text-neutral-500 dark:text-neutral-400">
          Payment is due within 30 days. Thank you for your business.
      </div>

    </div>
  );
};
