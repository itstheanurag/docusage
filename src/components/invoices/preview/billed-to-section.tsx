"use client";
import React from "react";
import Image from "next/image";

const PreviewBillTo = React.memo(({ invoice }: any) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        BILL TO
      </h3>

      {invoice.toLogo && (
        <Image
          src={invoice.toLogo}
          alt="To Logo"
          width={100}
          height={100}
          className="h-12 w-auto object-contain mb-3"
        />
      )}

      <p className="font-medium text-neutral-900 dark:text-neutral-100">
        {invoice.toName || "Client Name"}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {invoice.toEmail}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
        {invoice.toAddress}
      </p>
    </div>
  );
});

export default PreviewBillTo;
