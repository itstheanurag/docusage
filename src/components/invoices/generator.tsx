import { useState } from "react";
import { Button } from "../ui/button";
import InvoiceForm from "./form";
import InvoicePreview from "./preview";

export default function InvoiceGenerator() {
  const [view, setView] = useState<"form" | "preview">("form");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            Invoice Generator
          </h1>
          <div className="flex gap-3">
            <Button
              variant={view === "form" ? "default" : "outline"}
              onClick={() => setView("form")}
            >
              Edit
            </Button>
            <Button
              variant={view === "preview" ? "default" : "outline"}
              onClick={() => setView("preview")}
            >
              Preview
            </Button>
            <Button onClick={handlePrint} className="bg-neutral-900">
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Content */}
        {view === "form" ? <InvoiceForm /> : <InvoicePreview />}
      </div>
    </div>
  );
}
