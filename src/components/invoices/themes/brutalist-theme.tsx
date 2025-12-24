import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewTotals from "../preview/preview-total";
import { formatCurrency } from "@/lib/format-currency";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const BrutalistTheme: React.FC<ThemeProps> = ({ invoice }) => {
  const accentColor = invoice.accentColor || "#000000";

  return (
    <div className="font-sans text-neutral-900 bg-white dark:bg-neutral-900 min-h-[1000px] h-full relative p-8 md:p-12 border-4 border-black dark:border-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] m-4 mb-8">
      
      <header className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
         <div className="flex-1">
            {invoice.fromLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={invoice.fromLogo} alt="Logo" className="h-24 w-auto object-contain mb-8 border-2 border-black dark:border-white p-2" />
            ) : (
                <h1 className="text-5xl font-black uppercase leading-[0.8] mb-8" style={{ color: accentColor }}>
                    {invoice.fromName || "Company"}
                </h1>
            )}
            
            <div className="border-2 border-black dark:border-white p-4 font-bold inline-block bg-neutral-100 dark:bg-neutral-800 dark:text-white">
                {invoice.fromAddress}<br/>
                {invoice.fromEmail}
            </div>
         </div>

         <div className="text-right">
             <div className="text-6xl font-black uppercase outline-text tracking-tighter mb-4 opacity-100 dark:text-white">
                Invoice
             </div>
             <div className="bg-black text-white dark:bg-white dark:text-black inline-block p-4 font-mono font-bold text-xl transform -rotate-2">
                 #{invoice.invoiceNumber}
             </div>
         </div>
      </header>

      <div className="grid grid-cols-2 gap-8 mb-16">
          <div className="border-4 border-black dark:border-white p-6 bg-neutral-100 dark:bg-neutral-800 dark:text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <h3 className="font-black uppercase text-xl mb-4 underline decoration-4 underline-offset-4 decoration-black dark:decoration-white">Billed To</h3>
              <div className="text-2xl font-bold mb-2">{invoice.toName || "Client Name"}</div>
              <div className="font-medium text-lg">
                  {invoice.toAddress}<br/>
                  {invoice.toEmail}
              </div>
          </div>
          
          <div className="flex flex-col gap-4 justify-center items-end">
              <div className="flex justify-between w-full max-w-xs border-b-4 border-black dark:border-white pb-2">
                  <span className="font-bold uppercase">Date Issued</span>
                  <span className="font-mono font-bold">{invoice.invoiceDate}</span>
              </div>
              <div className="flex justify-between w-full max-w-xs border-b-4 border-black dark:border-white pb-2">
                  <span className="font-bold uppercase">Due Date</span>
                  <span className="font-mono font-bold" style={{ color: accentColor }}>{invoice.dueDate}</span>
              </div>
          </div>
      </div>

      <div className="mb-12 border-4 border-black dark:border-white">
          {/* Custom style wrapper for table to match brutalist theme */}
          <div className="[&_table]:w-full [&_thead]:bg-black [&_thead]:text-white dark:[&_thead]:bg-white dark:[&_thead]:text-black [&_th]:uppercase [&_th]:font-black [&_th]:p-4 [&_td]:p-4 [&_td]:border-b-2 [&_td]:border-black dark:[&_td]:border-white [&_td]:font-bold [&_tr:last-child_td]:border-b-0">
               <PreviewItems invoice={invoice} />
          </div>
      </div>

      <div className="flex justify-end mb-16">
          <div className="w-1/2 md:w-5/12">
               <div className="flex justify-between mb-4 font-bold border-b-2 border-black dark:border-white pb-2 dark:text-white">
                   <span>SUBTOTAL</span>
                   <span>{formatCurrency(invoice.calculateSubtotal(), invoice.currency)}</span>
               </div>
               <div className="flex justify-between mb-4 font-bold border-b-2 border-black dark:border-white pb-2 dark:text-white">
                   <span>TAX ({invoice.tax}%)</span>
                   <span>{formatCurrency(invoice.calculateTax(), invoice.currency)}</span>
               </div>
               <div className="flex justify-between bg-black text-white dark:bg-white dark:text-black p-4 text-2xl font-black shadow-[8px_8px_0px_0px_#888] transform hover:scale-105 transition-transform">
                   <span>TOTAL</span>
                   <span>{formatCurrency(invoice.calculateTotal(), invoice.currency)}</span>
               </div>
          </div>
      </div>

      {invoice.notes && (
          <div className="border-4 border-black dark:border-white p-6 bg-yellow-300 text-black font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rotate-1 max-w-lg mx-auto transform">
               <div className="uppercase mb-2 underline decoration-2">Notes</div>
               {invoice.notes}
          </div>
      )}

    </div>
  );
};
