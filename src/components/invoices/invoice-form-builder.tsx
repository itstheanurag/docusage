import FromDetails from "./builder/from-details";
import InvoiceDetails from "./builder/invoice-details";
import ItemsSection from "./builder/items-section";
import NotesSection from "./builder/notes-section";
import SendToDetails from "./builder/send-to-details";
import TaxSection from "./builder/tax-section";

import { BuilderLayout, BuilderHeader, BuilderCanvas } from "../builders/shared/builder-layout";
import InvoiceBuilderDock from "./invoice-builder-dock";

const InvoiceFormBuilder = () => {
  return (
    <BuilderLayout
      header={
        <div className="flex flex-col">
          <BuilderHeader 
            title="Invoice Builder" 
            backHref="/dashboard/invoices" 
          />
          
          {/* Dock Toolbar */}
          <div className="bg-background/20 backdrop-blur-md border-t border-border/40 p-1.5 flex justify-center shadow-sm z-10">
            <InvoiceBuilderDock
              onPreview={() => console.log("Preview invoice")}
              onSave={() => console.log("Save invoice")}
              onDownload={() => console.log("Download PDF")}
              onSend={() => console.log("Send invoice")}
              onPrint={() => window.print()}
            />
          </div>
        </div>
      }
    >
      <BuilderCanvas>
        <div className="space-y-6 max-w-4xl w-full">
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
      </BuilderCanvas>
    </BuilderLayout>
  );
};

export default InvoiceFormBuilder;

