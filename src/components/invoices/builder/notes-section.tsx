"use client";

import { useInvoiceStore } from "@/store";
import { Textarea } from "@/components/ui/textarea";

const NotesSection = () => {
  const invoice = useInvoiceStore();

  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200">
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Notes</h2>

      <Textarea
        rows={3}
        value={invoice.notes}
        onChange={(e) => invoice.updateField("notes", e.target.value)}
        placeholder="Additional notes or payment terms"
      />
    </div>
  );
};

export default NotesSection;
