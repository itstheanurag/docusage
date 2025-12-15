"use client";

import { useInvoiceStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BuilderPanel } from "@/components/builders/shared/builder-panel";
import { ShoppingCart, Plus } from "lucide-react";

const ItemsSection = () => {
  const invoice = useInvoiceStore();

  return (
    <BuilderPanel
      title="Items"
      icon={ShoppingCart}
      headerAction={
        <Button
          variant="ghost"
          size="sm"
          onClick={invoice.addItem}
          className="h-7 text-xs gap-1.5 hover:bg-primary/10 hover:text-primary"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Item
        </Button>
      }
    >
      <div className="space-y-3">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <div className="col-span-5">Description</div>
          <div className="col-span-2">Qty</div>
          <div className="col-span-2">Rate</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-1"></div>
        </div>

        {invoice.items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-3">
            {/* Description */}
            <Input
              className="col-span-5 bg-background/50"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                invoice.updateItem(item.id, "description", e.target.value)
              }
            />

            {/* Quantity */}
            <Input
              className="col-span-2 bg-background/50"
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                invoice.updateItem(item.id, "quantity", Number(e.target.value))
              }
            />

            {/* Rate */}
            <Input
              className="col-span-2 bg-background/50"
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) =>
                invoice.updateItem(item.id, "rate", Number(e.target.value))
              }
            />

            {/* Amount (read-only) */}
            <Input
              className="col-span-2 bg-muted/50 text-muted-foreground"
              disabled
              value={item.amount.toFixed(2)}
            />

            {/* Remove Item */}
            <Button
              className="col-span-1"
              variant="ghost"
              size="icon"
              onClick={() => invoice.removeItem(item.id)}
            >
              ×
            </Button>
          </div>
        ))}

        {invoice.items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No items added yet. Click &quot;Add Item&quot; to get started.
          </div>
        )}
      </div>
    </BuilderPanel>
  );
};

export default ItemsSection;

