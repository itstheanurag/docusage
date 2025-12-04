"use client";

import { useInvoiceStore } from "@/store";
import { Input } from "@/components/ui/input";

const TaxSection = () => {
  const invoice = useInvoiceStore();

  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200">
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Tax</h2>

      <div className="space-y-4">
        {/* Tax Label */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
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
          <label className="block text-sm font-medium text-neutral-700 mb-1">
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
            <span className="text-neutral-700">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSection;
