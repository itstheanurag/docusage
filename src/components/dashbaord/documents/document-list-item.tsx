"use client";

import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DocumentActions from "./document-actions";

const DocumentListItem = ({ doc }: { doc: any }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b hover:bg-muted/50 transition-colors gap-2">
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
          <FileText className="h-4 w-4 text-primary" />
        </div>

        <div>
          <p className="font-medium">{doc.name}</p>
          <p className="text-sm text-muted-foreground">
            {doc.type} • {doc.size} • Modified {doc.lastModified}
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {doc.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <Badge>{doc.status}</Badge>
        <DocumentActions />
      </div>
    </div>
  );
};

export default DocumentListItem;
