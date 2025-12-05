"use client";
import React from "react";

const PreviewItems = React.memo(({ invoice }: any) => {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };

  const symbol = currencySymbols[invoice.currency];

  return (
    <div className="mb-8">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <th className="py-3 text-left text-sm font-semibold dark:text-neutral-100">
              Description
            </th>
            <th className="py-3 text-right text-sm font-semibold dark:text-neutral-100">
              Qty
            </th>
            <th className="py-3 text-right text-sm font-semibold dark:text-neutral-100">
              Rate
            </th>
            <th className="py-3 text-right text-sm font-semibold dark:text-neutral-100">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item: any) => (
            <tr
              key={item.id}
              className="border-b border-neutral-200 dark:border-neutral-700"
            >
              <td className="py-3 dark:text-neutral-300">{item.description}</td>
              <td className="py-3 text-right dark:text-neutral-300">
                {item.quantity}
              </td>
              <td className="py-3 text-right dark:text-neutral-300">
                {symbol}
                {item.rate}
              </td>
              <td className="py-3 text-right dark:text-neutral-100 font-medium">
                {symbol}
                {item.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PreviewItems;
