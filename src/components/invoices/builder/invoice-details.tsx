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
    <div
      className="
        p-6 rounded-lg border
        bg-white border-neutral-200
        dark:bg-neutral-900 dark:border-neutral-700
      "
    >
      <h2
        className="
          text-lg font-semibold mb-4
          text-neutral-900 dark:text-neutral-100
        "
      >
        Invoice Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Invoice number */}
        <div>
          <label
            className="block text-sm mb-1
              text-neutral-700 dark:text-neutral-300"
          >
            Invoice Number
          </label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) =>
              invoice.updateField("invoiceNumber", e.target.value)
            }
          />
        </div>

        {/* Invoice date */}
        <div>
          <label
            className="block text-sm mb-1
              text-neutral-700 dark:text-neutral-300"
          >
            Invoice Date
          </label>
          <Input
            type="date"
            value={invoice.invoiceDate}
            onChange={(e) => invoice.updateField("invoiceDate", e.target.value)}
          />
        </div>

        {/* Due date */}
        <div>
          <label
            className="block text-sm mb-1
              text-neutral-700 dark:text-neutral-300"
          >
            Due Date
          </label>
          <Input
            type="date"
            value={invoice.dueDate}
            onChange={(e) => invoice.updateField("dueDate", e.target.value)}
          />
        </div>

        {/* Recurrence */}
        <div>
          <label
            className="block text-sm mb-1
              text-neutral-700 dark:text-neutral-300"
          >
            Recurrence
          </label>
          <Select
            value={invoice.recurrence}
            onValueChange={(value) => invoice.updateField("recurrence", value)}
          >
            <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700">
              <SelectValue placeholder="Select recurrence" />
            </SelectTrigger>
            <SelectContent className="dark:bg-neutral-800 dark:text-neutral-100">
              <SelectItem value="one-time">One-time</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Currency */}
        <div>
          <label
            className="block text-sm mb-1
              text-neutral-700 dark:text-neutral-300"
          >
            Currency
          </label>
          <Select
            value={invoice.currency}
            onValueChange={(value) => invoice.updateField("currency", value)}
          >
            <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="dark:bg-neutral-800 dark:text-neutral-100">
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
