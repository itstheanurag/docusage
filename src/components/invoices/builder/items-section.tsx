"use client";

import { useInvoiceStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ItemsSection = () => {
  const invoice = useInvoiceStore();

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Items</h2>
        <Button variant="outline" onClick={invoice.addItem}>
          + Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {invoice.items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-3">
            <Input
              className="col-span-5"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                invoice.updateItem(item.id, "description", e.target.value)
              }
            />
            <Input
              className="col-span-2"
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                invoice.updateItem(item.id, "quantity", Number(e.target.value))
              }
            />
            <Input
              className="col-span-2"
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) =>
                invoice.updateItem(item.id, "rate", Number(e.target.value))
              }
            />
            <Input
              className="col-span-2 bg-neutral-50"
              disabled
              value={item.amount.toFixed(2)}
            />
            <Button
              className="col-span-1"
              variant="ghost"
              onClick={() => invoice.removeItem(item.id)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsSection;
