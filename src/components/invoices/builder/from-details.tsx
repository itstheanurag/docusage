"use client";

import { useInvoiceStore } from "@/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FromDetails = () => {
  const invoice = useInvoiceStore();

  return (
    <div
      className="p-6 rounded-lg border 
      bg-white border-neutral-200 
      dark:bg-neutral-900 dark:border-neutral-700"
    >
      <h2
        className="text-lg font-semibold 
        text-neutral-900 dark:text-neutral-100 mb-4"
      >
        From
      </h2>

      <div className="space-y-4">
        {/* Logo URL */}
        <div>
          <label
            className="block text-sm font-medium 
            text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Logo URL
          </label>
          <Input
            value={invoice.fromLogo || ""}
            onChange={(e) => invoice.updateField("fromLogo", e.target.value)}
            placeholder="https://example.com/logo.png"
          />
        </div>

        {/* Name */}
        <div>
          <label
            className="block text-sm font-medium 
            text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Name
          </label>
          <Input
            value={invoice.fromName}
            onChange={(e) => invoice.updateField("fromName", e.target.value)}
            placeholder="Your name or company"
          />
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-sm font-medium 
            text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Email
          </label>
          <Input
            type="email"
            value={invoice.fromEmail}
            onChange={(e) => invoice.updateField("fromEmail", e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        {/* Address */}
        <div>
          <label
            className="block text-sm font-medium 
            text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Address
          </label>
          <Textarea
            rows={3}
            value={invoice.fromAddress}
            onChange={(e) => invoice.updateField("fromAddress", e.target.value)}
            placeholder="Your address"
          />
        </div>
      </div>
    </div>
  );
};

export default FromDetails;
