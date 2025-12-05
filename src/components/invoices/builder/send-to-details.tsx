"use client";

import { useInvoiceStore } from "@/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SendToDetails = () => {
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
        Bill To
      </h2>

      <div className="space-y-4">
        {/* Logo URL */}
        <div>
          <label
            className="
              block text-sm font-medium mb-1
              text-neutral-700 dark:text-neutral-300
            "
          >
            Logo URL
          </label>
          <Input
            value={invoice.toLogo || ""}
            onChange={(e) => invoice.updateField("toLogo", e.target.value)}
            placeholder="https://example.com/client-logo.png"
          />
        </div>

        {/* Name */}
        <div>
          <label
            className="
              block text-sm font-medium mb-1
              text-neutral-700 dark:text-neutral-300
            "
          >
            Name
          </label>
          <Input
            value={invoice.toName}
            onChange={(e) => invoice.updateField("toName", e.target.value)}
            placeholder="Client name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            className="
              block text-sm font-medium mb-1
              text-neutral-700 dark:text-neutral-300
            "
          >
            Email
          </label>
          <Input
            type="email"
            value={invoice.toEmail}
            onChange={(e) => invoice.updateField("toEmail", e.target.value)}
            placeholder="client@email.com"
          />
        </div>

        {/* Address */}
        <div>
          <label
            className="
              block text-sm font-medium mb-1
              text-neutral-700 dark:text-neutral-300
            "
          >
            Address
          </label>
          <Textarea
            rows={3}
            value={invoice.toAddress}
            onChange={(e) => invoice.updateField("toAddress", e.target.value)}
            placeholder="Client address"
            className="
              dark:bg-neutral-800 
              dark:text-neutral-100 
              dark:border-neutral-700
            "
          />
        </div>
      </div>
    </div>
  );
};

export default SendToDetails;
