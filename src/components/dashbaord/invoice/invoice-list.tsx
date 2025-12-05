"use client";

import { Card, CardContent } from "@/components/ui/card";
import InvoiceListItem from "./invocie-list-item";

const InvoiceList = ({ invoices }: { invoices: any[] }) => {
  return (
    <Card>
      <CardContent className="p-0">
        {invoices.map((inv) => (
          <InvoiceListItem key={inv.id} invoice={inv} />
        ))}
      </CardContent>
    </Card>
  );
};

export default InvoiceList;
