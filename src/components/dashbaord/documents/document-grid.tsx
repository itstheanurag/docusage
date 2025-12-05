"use client";

import React from "react";
import DocumentGridItem from "./document-grid-item";

const DocumentGrid = ({ documents }: { documents: any[] }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <DocumentGridItem key={doc.id} doc={doc} />
      ))}
    </div>
  );
};



export default React.memo(DocumentGrid);
