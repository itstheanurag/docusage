import { useState } from "react";
import { Button } from "../ui/button";
import InvoiceForm from "./invoice-form-builder";
import InvoicePreview from "./invoice-form-preview";
import { ArrowLeft } from "lucide-react";

interface InvoiceGeneratorProps {
  onBack?: () => void;
}

export default function InvoiceFormGenerator({
  onBack,
}: InvoiceGeneratorProps) {
  const [view, setView] = useState<"form" | "preview">("form");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Invoice Generator
            </h1>
          </div>

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

            <Button onClick={handlePrint} variant="outline">
              Print / PDF
            </Button>

            <Button
              className="bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900"
              onClick={() => alert("Sending email functionality coming soon!")}
            >
              Send Email
            </Button>
          </div>
        </div>

        {view === "form" ? <InvoiceForm /> : <InvoicePreview />}
      </div>
    </div>
  );
}
