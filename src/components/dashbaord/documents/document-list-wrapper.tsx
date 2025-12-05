"use client";

import React from "react";
import DocumentListItem from "./document-list-item";

const DocumentList = ({ documents }: { documents: any[] }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      {documents.map((doc) => (
        <DocumentListItem key={doc.id} doc={doc} />
      ))}
    </div>
  );
};

export default React.memo(DocumentList);
