"use client";

import { useState, useMemo } from "react";
import DocumentsHeader from "./documents/document-header";
import DocumentsFilters from "./documents/document-filters";
import DocumentGrid from "./documents/document-grid";
import DocumentList from "./documents/document-list-wrapper";

export function DocumentsManager() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const documents = [
    {
      id: 1,
      name: "Project Proposal - ABC Corp",
      type: "Proposal",
      status: "Draft",
      lastModified: "2024-01-15",
      size: "2.4 MB",
      tags: ["Business", "Proposal"],
    },
    {
      id: 2,
      name: "Marketing Strategy 2024",
      type: "Report",
      status: "Completed",
      lastModified: "2024-01-14",
      size: "1.8 MB",
      tags: ["Marketing", "Strategy"],
    },
    // ...rest
  ];

  const filteredDocuments = useMemo(() => {
    return documents.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery, documents]);

  return (
    <div className="space-y-6">
      <DocumentsHeader />

      <DocumentsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === "grid" ? (
        <DocumentGrid documents={filteredDocuments} />
      ) : (
        <DocumentList documents={filteredDocuments} />
      )}
    </div>
  );
}
