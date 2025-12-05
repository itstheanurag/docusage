"use client";

import React from "react";

const PreviewInoviceHeader = React.memo(({ invoice }: any) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
          INVOICE
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400">
          #{invoice.invoiceNumber}
        </p>

        {invoice.recurrence !== "one-time" && (
          <span
            className="inline-block mt-2 px-2 py-1 text-xs rounded-full capitalize
            bg-neutral-100 text-neutral-600
            dark:bg-neutral-800 dark:text-neutral-300"
          >
            {invoice.recurrence}
          </span>
        )}
      </div>

      <div className="text-right">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Invoice Date
        </p>
        <p className="font-medium text-neutral-900 dark:text-neutral-100">
          {invoice.invoiceDate}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          Due Date
        </p>
        <p className="font-medium text-neutral-900 dark:text-neutral-100">
          {invoice.dueDate}
        </p>
      </div>
    </div>
  );
});

export default PreviewInoviceHeader;
