"use client";

import { useInvoiceStore } from "@/store";
import { Input } from "@/components/ui/input";

const TaxSection = () => {
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
        Tax
      </h2>

      <div className="space-y-4">
        {/* Tax Label */}
        <div>
          <label
            className="
              block text-sm font-medium mb-1
              text-neutral-700 dark:text-neutral-300
            "
          >
            Tax Label
          </label>
          <Input
            value={invoice.taxLabel}
            onChange={(e) => invoice.updateField("taxLabel", e.target.value)}
            placeholder="VAT, GST, etc."
          />
        </div>

        {/* Tax Rate */}
        <div>
          <label
            className="
              block text-sm font-medium mb-1
              text-neutral-700 dark:text-neutral-300
            "
          >
            Rate (%)
          </label>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={invoice.tax}
              onChange={(e) =>
                invoice.updateField("tax", parseFloat(e.target.value) || 0)
              }
              placeholder="0"
              min="0"
              max="100"
              step="0.1"
            />

            <span
              className="
                text-neutral-700 
                dark:text-neutral-300
              "
            >
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSection;
