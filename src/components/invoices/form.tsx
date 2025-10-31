import { useInvoiceStore } from "@/stores";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const InvoiceForm: React.FC = () => {
  const invoice = useInvoiceStore();

  return (
    <div className="space-y-6">
      {/* Invoice Details */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Invoice Details
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Invoice Number
            </label>
            <Input
              value={invoice.invoiceNumber}
              onChange={(e) =>
                invoice.updateField("invoiceNumber", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Invoice Date
            </label>
            <Input
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) =>
                invoice.updateField("invoiceDate", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Due Date
            </label>
            <Input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => invoice.updateField("dueDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* From/To Information */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">From</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Name
              </label>
              <Input
                value={invoice.fromName}
                onChange={(e) =>
                  invoice.updateField("fromName", e.target.value)
                }
                placeholder="Your name or company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={invoice.fromEmail}
                onChange={(e) =>
                  invoice.updateField("fromEmail", e.target.value)
                }
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Address
              </label>
              <Textarea
                rows={3}
                value={invoice.fromAddress}
                onChange={(e) =>
                  invoice.updateField("fromAddress", e.target.value)
                }
                placeholder="Your address"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Bill To
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Name
              </label>
              <Input
                value={invoice.toName}
                onChange={(e) => invoice.updateField("toName", e.target.value)}
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={invoice.toEmail}
                onChange={(e) => invoice.updateField("toEmail", e.target.value)}
                placeholder="client@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Address
              </label>
              <Textarea
                rows={3}
                value={invoice.toAddress}
                onChange={(e) =>
                  invoice.updateField("toAddress", e.target.value)
                }
                placeholder="Client address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Items</h2>
          <Button onClick={invoice.addItem} variant="outline">
            + Add Item
          </Button>
        </div>
        <div className="space-y-4">
          {invoice.items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-3 items-start">
              <div className="col-span-5">
                <Input
                  value={item.description}
                  onChange={(e) =>
                    invoice.updateItem(item.id, "description", e.target.value)
                  }
                  placeholder="Item description"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    invoice.updateItem(
                      item.id,
                      "quantity",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="Qty"
                  min="0"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    invoice.updateItem(
                      item.id,
                      "rate",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="Rate"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="col-span-2">
                <Input
                  value={`$${item.amount.toFixed(2)}`}
                  disabled
                  className="bg-neutral-50"
                />
              </div>
              <div className="col-span-1">
                <Button
                  onClick={() => invoice.removeItem(item.id)}
                  variant="ghost"
                  className="w-full text-neutral-600 hover:text-red-600"
                  disabled={invoice.items.length === 1}
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax & Notes */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Tax</h2>
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

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Notes</h2>
          <Textarea
            rows={3}
            value={invoice.notes}
            onChange={(e) => invoice.updateField("notes", e.target.value)}
            placeholder="Additional notes or payment terms"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
