import { useInvoiceStore } from "@/store";

const InvoicePreview: React.FC = () => {
  const invoice = useInvoiceStore();
  const subtotal = invoice.calculateSubtotal();
  const taxAmount = invoice.calculateTax();
  const total = invoice.calculateTotal();

  return (
    <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">INVOICE</h1>
          <p className="text-neutral-600">#{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-600">Invoice Date</p>
          <p className="font-medium text-neutral-900">{invoice.invoiceDate}</p>
          <p className="text-sm text-neutral-600 mt-2">Due Date</p>
          <p className="font-medium text-neutral-900">{invoice.dueDate}</p>
        </div>
      </div>

      {/* From/To Section */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-2">FROM</h3>
          <p className="font-medium text-neutral-900">
            {invoice.fromName || "Your Name"}
          </p>
          <p className="text-sm text-neutral-600">{invoice.fromEmail}</p>
          <p className="text-sm text-neutral-600 whitespace-pre-line">
            {invoice.fromAddress}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-2">
            BILL TO
          </h3>
          <p className="font-medium text-neutral-900">
            {invoice.toName || "Client Name"}
          </p>
          <p className="text-sm text-neutral-600">{invoice.toEmail}</p>
          <p className="text-sm text-neutral-600 whitespace-pre-line">
            {invoice.toAddress}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-300">
              <th className="text-left py-3 text-sm font-semibold text-neutral-900">
                Description
              </th>
              <th className="text-right py-3 text-sm font-semibold text-neutral-900 w-20">
                Qty
              </th>
              <th className="text-right py-3 text-sm font-semibold text-neutral-900 w-24">
                Rate
              </th>
              <th className="text-right py-3 text-sm font-semibold text-neutral-900 w-28">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-neutral-200">
                <td className="py-3 text-neutral-700">
                  {item.description || "Item description"}
                </td>
                <td className="text-right py-3 text-neutral-700">
                  {item.quantity}
                </td>
                <td className="text-right py-3 text-neutral-700">
                  ${item.rate.toFixed(2)}
                </td>
                <td className="text-right py-3 text-neutral-900 font-medium">
                  ${item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span className="text-neutral-600">Subtotal</span>
            <span className="text-neutral-900 font-medium">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-neutral-600">Tax ({invoice.tax}%)</span>
            <span className="text-neutral-900 font-medium">
              ${taxAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-neutral-900">
            <span className="font-semibold text-neutral-900">Total</span>
            <span className="font-bold text-xl text-neutral-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-sm font-semibold text-neutral-900 mb-2">NOTES</h3>
          <p className="text-sm text-neutral-600 whitespace-pre-line">
            {invoice.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
