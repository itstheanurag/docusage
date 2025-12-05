"use client";
import React from "react";

const PreviewNotes = React.memo(({ notes }: { notes: string }) => (
  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
    <h3 className="text-sm font-semibold dark:text-neutral-100 mb-2">NOTES</h3>
    <p className="text-sm dark:text-neutral-400 whitespace-pre-line">{notes}</p>
  </div>
));

export default PreviewNotes;
