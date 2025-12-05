"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const DocumentsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Manage and organize your documents
        </p>
      </div>

      <Link href="/document">
        <Button className="self-start sm:self-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </Link>
    </div>
  );
};

export default React.memo(DocumentsHeader);
