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

const InvoiceDetails = () => {
  const invoice = useInvoiceStore();

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Invoice number */}
        <div>
          <label className="block text-sm mb-1">Invoice Number</label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) =>
              invoice.updateField("invoiceNumber", e.target.value)
            }
          />
        </div>

        {/* Invoice date */}
        <div>
          <label className="block text-sm mb-1">Invoice Date</label>
          <Input
            type="date"
            value={invoice.invoiceDate}
            onChange={(e) => invoice.updateField("invoiceDate", e.target.value)}
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm mb-1">Due Date</label>
          <Input
            type="date"
            value={invoice.dueDate}
            onChange={(e) => invoice.updateField("dueDate", e.target.value)}
          />
        </div>

        {/* Recurrence */}
        <div>
          <label className="block text-sm mb-1">Recurrence</label>
          <Select
            value={invoice.recurrence}
            onValueChange={(value) => invoice.updateField("recurrence", value)}
          >
            <SelectTrigger>
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
          <label className="block text-sm mb-1">Currency</label>
          <Select
            value={invoice.currency}
            onValueChange={(value) => invoice.updateField("currency", value)}
          >
            <SelectTrigger>
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
    </div>
  );
};

export default InvoiceDetails;
