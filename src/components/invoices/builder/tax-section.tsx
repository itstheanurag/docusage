"use client";

import { useInvoiceStore } from "@/store";
import { Input } from "@/components/ui/input";
import { BuilderPanel } from "@/components/builders/shared/builder-panel";
import { Percent } from "lucide-react";

const TaxSection = () => {
  const invoice = useInvoiceStore();

  return (
    <BuilderPanel title="Tax" icon={Percent}>
      <div className="space-y-4">
        {/* Tax Label */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Tax Label
          </label>
          <Input
            value={invoice.taxLabel}
            onChange={(e) => invoice.updateField("taxLabel", e.target.value)}
            placeholder="VAT, GST, etc."
            className="bg-background/50"
          />
        </div>

        {/* Tax Rate */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
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
              className="bg-background/50"
            />

            <span className="text-muted-foreground font-medium">%</span>
          </div>
        </div>
      </div>
    </BuilderPanel>
  );
};

export default TaxSection;

