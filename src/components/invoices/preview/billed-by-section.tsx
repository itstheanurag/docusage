"use client";
import React from "react";
import Image from "next/image";

const PreviewFrom = React.memo(({ invoice }: any) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        FROM
      </h3>

      {invoice.fromLogo && (
        <Image
          src={invoice.fromLogo}
          alt="From Logo"
          width={100}
          height={100}
          className="h-12 w-auto object-contain mb-3"
        />
      )}

      <p className="font-medium text-neutral-900 dark:text-neutral-100">
        {invoice.fromName || "Your Name"}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {invoice.fromEmail}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
        {invoice.fromAddress}
      </p>
    </div>
  );
});

export default PreviewFrom;
