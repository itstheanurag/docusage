import FromDetails from "./builder/from-details";
import InvoiceDetails from "./builder/invoice-details";
import ItemsSection from "./builder/items-section";
import NotesSection from "./builder/notes-section";
import SendToDetails from "./builder/send-to-details";
import TaxSection from "./builder/tax-section";

import { BuilderLayout, BuilderHeader, BuilderCanvas } from "../builders/shared/builder-layout";

const InvoiceFormBuilder = () => {
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
