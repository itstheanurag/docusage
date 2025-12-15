"use client";

import { useInvoiceStore } from "@/store";
import { Textarea } from "@/components/ui/textarea";
import { BuilderPanel } from "@/components/builders/shared/builder-panel";
import { StickyNote } from "lucide-react";

const NotesSection = () => {
  const invoice = useInvoiceStore();

  return (
    <BuilderPanel title="Notes" icon={StickyNote}>
      <Textarea
        rows={3}
        value={invoice.notes}
        onChange={(e) => invoice.updateField("notes", e.target.value)}
        placeholder="Additional notes or payment terms"
        className="bg-background/50"
      />
    </BuilderPanel>
  );
};

export default NotesSection;

