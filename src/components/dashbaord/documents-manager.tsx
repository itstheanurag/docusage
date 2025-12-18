"use client";

import { useState, useMemo, useEffect } from "react";
import DocumentsHeader from "./documents/document-header";
import DocumentsFilters from "./documents/document-filters";
import DocumentGrid from "./documents/document-grid";
import DocumentList from "./documents/document-list-wrapper";
import { useManagementStore } from "@/store/managementStore";

export function DocumentsManager() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const { documents, fetchData } = useManagementStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredDocuments = useMemo(() => {
    return documents.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags?.some((tag) =>
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
