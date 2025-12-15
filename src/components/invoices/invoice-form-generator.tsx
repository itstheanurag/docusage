"use client";

import { useState } from "react";
import FromDetails from "./builder/from-details";
import InvoiceDetails from "./builder/invoice-details";
import ItemsSection from "./builder/items-section";
import NotesSection from "./builder/notes-section";
import SendToDetails from "./builder/send-to-details";
import TaxSection from "./builder/tax-section";
import InvoicePreview from "./invoice-form-preview";
import InvoiceBuilderDock from "./invoice-builder-dock";

import { BuilderLayout, BuilderHeader, BuilderCanvas } from "../builders/shared/builder-layout";

interface InvoiceGeneratorProps {
  onBack?: () => void;
}

export default function InvoiceFormGenerator({
  onBack,
}: InvoiceGeneratorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <BuilderLayout
      header={
        <BuilderHeader 
          title="Invoice Builder" 
          backHref="/dashboard/invoices"
        />
      }
    >
      <BuilderCanvas>
        {isPreviewMode ? (
          <InvoicePreview />
        ) : (
          <div className="space-y-6 max-w-4xl w-full pb-24">
            <InvoiceDetails />
            <div className="grid grid-cols-2 gap-6">
              <FromDetails />
              <SendToDetails />
            </div>
            <ItemsSection />
            <div className="grid grid-cols-2 gap-6">
              <TaxSection />
              <NotesSection />
            </div>
          </div>
        )}
      </BuilderCanvas>

      {/* Dock Toolbar - Fixed at bottom */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <InvoiceBuilderDock
            onPreview={() => setIsPreviewMode(!isPreviewMode)}
            onSave={() => console.log("Save invoice")}
            onDownload={() => console.log("Download PDF")}
            onSend={() => alert("Sending email functionality coming soon!")}
            onPrint={handlePrint}
          />
        </div>
      </div>
    </BuilderLayout>
  );
}

