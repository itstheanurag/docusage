import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewItems from "../preview/items-table";
import PreviewNotes from "../preview/notes";
import PreviewTotals from "../preview/preview-total";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const CreativeTheme: React.FC<ThemeProps> = ({ invoice }) => {
  const accentColor = invoice.accentColor || "#000000";

  return (
    <div className="font-serif text-neutral-800 dark:text-neutral-200 bg-[#fdfdfd] dark:bg-neutral-950 min-h-[1000px] h-full relative overflow-hidden flex flex-col items-center justify-center p-8 md:p-12">
      
      {/* Ambient Background Shapes */}
      <div 
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-10 dark:opacity-5 blur-3xl pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
      <div 
        className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-10 dark:opacity-5 blur-3xl pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-xl border border-white/20 dark:border-neutral-800/50 p-12 w-full h-full relative z-10 flex flex-col">
        <header className="text-center mb-16 relative">
             <div className="absolute top-0 left-0 text-xs font-mono text-neutral-400 dark:text-neutral-600 rotate-[-90deg] translate-y-8 origin-bottom-left">
                NO. {invoice.invoiceNumber}
            </div>

            {invoice.fromLogo ? (
               // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={invoice.fromLogo} 
                alt="Company Logo" 
                className="h-24 w-auto object-contain mx-auto mb-6"
              />
            ) : (
                <div 
                    className="text-6xl mb-4 font-normal" 
                    style={{ 
                        fontFamily: '"Brush Script MT", "Segoe Script", cursive',
                        color: accentColor 
                    }}
                >
                {invoice.fromName || "Company Name"}
                </div>
            )}
            
            <div className="flex justify-center gap-4 text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                <span>{invoice.fromAddress}</span>
                <span>•</span>
                <span>{invoice.fromEmail}</span>
            </div>
            
             <div className="h-px w-24 bg-neutral-300 dark:bg-neutral-700 mx-auto mt-8"></div>
        </header>

        <div className="grid grid-cols-2 gap-12 mb-16">
            <div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                    Invoice For
                </h3>
               <div className="text-xl font-medium mb-2">{invoice.toName || "Client Name"}</div>
               <div className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans text-sm">
                   {invoice.toAddress} <br/>
                   {invoice.toEmail}
               </div>
            </div>
            
            <div className="text-right">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2 flex justify-end">
                    Details
                </h3>
                 <div className="space-y-2 font-sans text-sm">
                    <div className="flex justify-end gap-4">
                        <span className="text-neutral-500 dark:text-neutral-400">Date:</span>
                        <span className="font-medium">{invoice.invoiceDate}</span>
                    </div>
                     <div className="flex justify-end gap-4">
                        <span className="text-neutral-500 dark:text-neutral-400">Due:</span>
                        <span className="font-medium">{invoice.dueDate}</span>
                    </div>
                 </div>
            </div>
        </div>

        <div className="mb-12 font-sans flex-grow">
             <PreviewItems invoice={invoice} />
        </div>

        <div className="flex justify-end mb-16">
             <div className="w-1/2 md:w-5/12 font-sans">
                <PreviewTotals invoice={invoice} />
            </div>
        </div>

        {invoice.notes && (
            <div className="text-center max-w-lg mx-auto">
                 <div className="text-2xl mb-4 opacity-20" style={{ color: accentColor }}>❝</div>
                 <div className="italic text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <PreviewNotes notes={invoice.notes} />
                 </div>
            </div>
        )}
        
        <div className="mt-16 text-center">
            <div 
                className="inline-block px-8 py-3 border border-neutral-900 dark:border-neutral-100 text-sm font-bold uppercase tracking-widest"
                style={{ borderColor: accentColor, color: accentColor }}
            >
                Thank You For Your Business
            </div>
        </div>
      </div>
    </div>
  );
};
