import React from "react";
import { InvoiceStore } from "@/types/invoice";
import PreviewFrom from "../preview/billed-by-section";
import PreviewBillTo from "../preview/billed-to-section";
import PreviewItems from "../preview/items-table";
import PreviewNotes from "../preview/notes";
import PreviewTotals from "../preview/preview-total";
import PreviewInoviceHeader from "../preview/preview-header";

interface ThemeProps {
  invoice: InvoiceStore;
}

export const CleanTheme: React.FC<ThemeProps> = ({ invoice }) => {
  return (
    <div className="space-y-8 font-sans text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-950 p-8 md:p-12 min-h-[1000px] h-full relative">
      <PreviewInoviceHeader invoice={invoice} />

      <div className="grid grid-cols-2 gap-12 mb-12">
        <PreviewFrom invoice={invoice} />
        <PreviewBillTo invoice={invoice} />
      </div>

      <PreviewItems invoice={invoice} />

      <div className="mt-8">
        <PreviewTotals invoice={invoice} />
      </div>

      {invoice.notes && (
        <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
           <PreviewNotes notes={invoice.notes} />
        </div>
      )}
    </div>
  );
};
