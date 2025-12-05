import { useInvoiceStore } from "@/store";
import PreviewFrom from "./preview/billed-by-section";
import PreviewBillTo from "./preview/billed-to-section";
import PreviewItems from "./preview/items-table";
import PreviewNotes from "./preview/notes";
import PreviewTotals from "./preview/preview-total";
import PreviewInoviceHeader from "./preview/preview-header";
const InvoicePreview = () => {
  const invoice = useInvoiceStore();

  return (
    <div
      className="
        p-8 rounded-lg border shadow-sm
        bg-white border-neutral-200 
        dark:bg-neutral-900 dark:border-neutral-700
      "
    >
      <PreviewInoviceHeader invoice={invoice} />

      <div className="grid grid-cols-2 gap-8 mb-8">
        <PreviewFrom invoice={invoice} />
        <PreviewBillTo invoice={invoice} />
      </div>

      <PreviewItems invoice={invoice} />

      <PreviewTotals invoice={invoice} />

      {invoice.notes && <PreviewNotes notes={invoice.notes} />}
    </div>
  );
};

export default InvoicePreview;
