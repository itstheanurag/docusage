import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewTotals from "../preview/preview-total";
import { formatCurrency } from "@/lib/format-currency";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const TechTheme: React.FC<ThemeProps> = ({ invoice }) => {
  const accentColor = invoice.accentColor || "#000000";

  return (
    <div className="font-mono text-sm text-neutral-800 dark:text-neutral-300 bg-neutral-100 dark:bg-black p-8 md:p-12 min-h-[1000px] h-full relative border-2 border-dashed border-neutral-400 dark:border-neutral-700">
      
      {/* Top Bar Decoration */}
      <div className="flex justify-between items-center mb-12 text-xs opacity-50 select-none">
          <span>// SYSTEM.INVOICE_GENERATOR_V2</span>
          <span>ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
      </div>

      <header className="grid grid-cols-2 gap-8 mb-16 relative">
         <div className="absolute top-0 right-0 p-2 border border-neutral-800 dark:border-neutral-500 rounded text-xs px-4">
            STATUS: <span className="font-bold text-green-600 dark:text-green-400">ACTIVE</span>
         </div>

         <div>
            {invoice.fromLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={invoice.fromLogo} alt="Logo" className="h-16 w-auto object-contain mb-4 grayscale contrast-125" />
            ) : (
                <h1 className="text-2xl font-bold uppercase tracking-tighter mb-2" style={{ color: accentColor }}>
                    {invoice.fromName || "COMPANY_NAME"}
                </h1>
            )}
            <div className="text-xs leading-loose">
                 &gt; {invoice.fromAddress}<br/>
                 &gt; {invoice.fromEmail}
            </div>
         </div>

         <div className="text-right mt-12">
             <div className="text-4xl font-bold mb-2 tracking-tighter">[ INVOICE ]</div>
             <div className="text-xs space-y-1">
                 <div>REF_NO : <span className="font-bold">{invoice.invoiceNumber}</span></div>
                 <div>DATE_ISSUED : {invoice.invoiceDate}</div>
                 <div>DUE_DATE : {invoice.dueDate}</div>
             </div>
         </div>
      </header>

      <div className="mb-12 border-y-2 border-dashed border-neutral-300 dark:border-neutral-800 py-8">
          <div className="grid grid-cols-2">
             <div>
                 <div className="text-xs font-bold mb-2 opacity-50">BILL_TO_TARGET</div>
                 <div className="text-lg font-bold mb-1">{invoice.toName || "CLIENT_NAME"}</div>
                 <div className="text-xs opacity-80">
                    {invoice.toAddress}<br/>
                    {invoice.toEmail}
                 </div>
             </div>
          </div>
      </div>

      <div className="mb-12">
        {/* We might need to override styles for the table to fit the tech theme better, 
            but for now we wrap it to ensure font consistency */}
        <div className="[&_th]:font-normal [&_th]:opacity-50 [&_th]:text-xs [&_td]:py-4 [&_thead]:border-b-2 [&_thead]:border-neutral-300 dark:[&_thead]:border-neutral-700">
             <PreviewItems invoice={invoice} />
        </div>
      </div>

      <div className="flex justify-end mb-16">
          <div className="w-1/2 md:w-5/12 bg-neutral-200 dark:bg-neutral-900 p-4 rounded-sm border border-neutral-300 dark:border-neutral-800">
               <div className="flex justify-between mb-2 text-xs">
                   <span>SUBTOTAL</span>
                   <span>{formatCurrency(invoice.calculateSubtotal(), invoice.currency)}</span>
               </div>
               <div className="flex justify-between mb-4 text-xs">
                   <span>TAX ({invoice.tax}%)</span>
                   <span>{formatCurrency(invoice.calculateTax(), invoice.currency)}</span>
               </div>
               <div className="border-t-2 border-dashed border-neutral-400 dark:border-neutral-600 my-2" />
               <div className="flex justify-between font-bold text-xl">
                   <span>TOTAL</span>
                   <span style={{ color: accentColor }}>{formatCurrency(invoice.calculateTotal(), invoice.currency)}</span>
               </div>
          </div>
      </div>

      {invoice.notes && (
          <div className="font-mono text-xs border-l-4 p-4 bg-neutral-50 dark:bg-neutral-900/50" style={{ borderLeftColor: accentColor }}>
              <div className="font-bold mb-1 opacity-50">// NOTES</div>
              {invoice.notes}
          </div>
      )}

      {/* Barcode-like visual at bottom */}
      <div className="absolute bottom-8 left-8 right-8 h-4 flex gap-1 opacity-20 dark:opacity-40">
           {Array.from({ length: 40 }).map((_, i) => (
               <div 
                key={i} 
                className="bg-current h-full" 
                style={{ 
                    width: Math.random() > 0.5 ? '4px' : '1px', 
                    flexGrow: Math.random() > 0.7 ? 1 : 0 
                }} 
               />
           ))}
      </div>

    </div>
  );
};
