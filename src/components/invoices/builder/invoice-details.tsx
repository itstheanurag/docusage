"use client";

import { useInvoiceStore } from "@/store";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BuilderPanel } from "@/components/builders/shared/builder-panel";
import { FileText } from "lucide-react";

const InvoiceDetails = () => {
  const invoice = useInvoiceStore();

  return (
    <BuilderPanel title="Invoice Details" icon={FileText}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Invoice number */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Invoice Number
          </label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) =>
              invoice.updateField("invoiceNumber", e.target.value)
            }
            className="bg-background/50"
          />
        </div>

        {/* Invoice date */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Invoice Date
          </label>
          <Input
            type="date"
            value={invoice.invoiceDate}
            onChange={(e) => invoice.updateField("invoiceDate", e.target.value)}
            className="bg-background/50"
          />
        </div>

        {/* Due date */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Due Date
          </label>
          <Input
            type="date"
            value={invoice.dueDate}
            onChange={(e) => invoice.updateField("dueDate", e.target.value)}
            className="bg-background/50"
          />
        </div>

        {/* Recurrence */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Recurrence
          </label>
          <Select
            value={invoice.recurrence}
            onValueChange={(value) => invoice.updateField("recurrence", value)}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select recurrence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Currency
          </label>
          <Select
            value={invoice.currency}
            onValueChange={(value) => invoice.updateField("currency", value)}
          >
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
              <SelectItem value="INR">INR (₹)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BuilderPanel>
  );
};

export default InvoiceDetails;

