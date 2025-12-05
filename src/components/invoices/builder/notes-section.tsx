"use client";

import { useInvoiceStore } from "@/store";
import { Textarea } from "@/components/ui/textarea";

const NotesSection = () => {
  const invoice = useInvoiceStore();

  return (
    <div
      className="
        p-6 rounded-lg border
        bg-white border-neutral-200
        dark:bg-neutral-900 dark:border-neutral-700
      "
    >
      <h2
        className="
          text-lg font-semibold mb-4
          text-neutral-900 dark:text-neutral-100
        "
      >
        Notes
      </h2>

      <Textarea
        rows={3}
        value={invoice.notes}
        onChange={(e) => invoice.updateField("notes", e.target.value)}
        placeholder="Additional notes or payment terms"
        className="
          dark:bg-neutral-800 
          dark:text-neutral-100 
          dark:border-neutral-700
        "
      />
    </div>
  );
};

export default NotesSection;
