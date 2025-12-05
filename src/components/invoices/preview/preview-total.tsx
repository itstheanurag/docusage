"use client";
import React from "react";

const PreviewTotals = React.memo(({ invoice }: any) => {
  const subtotal = invoice.calculateSubtotal();
  const taxAmount = invoice.calculateTax();
  const total = invoice.calculateTotal();

  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };
  const symbol = currencySymbols[invoice.currency];

  return (
    <div className="flex justify-end mb-8">
      <div className="w-64">
        <div className="flex justify-between py-2">
          <span className="dark:text-neutral-400">Subtotal</span>
          <span className="dark:text-neutral-100 font-medium">
            {symbol}
            {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span className="dark:text-neutral-400">
            {invoice.taxLabel || "Tax"} ({invoice.tax}%)
          </span>
          <span className="dark:text-neutral-100 font-medium">
            {symbol}
            {taxAmount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between py-3 border-t-2 border-neutral-900 dark:border-neutral-100">
          <span className="font-semibold dark:text-neutral-100">Total</span>
          <span className="font-bold text-xl dark:text-neutral-100">
            {symbol}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default PreviewTotals;
