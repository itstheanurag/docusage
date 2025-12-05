"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DocumentActions from "./document-actions";

const DocumentGridItem = ({ doc }: { doc: any }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <Badge variant={doc.status === "Completed" ? "default" : "outline"}>
            {doc.status}
          </Badge>
        </div>

        <CardTitle className="text-lg line-clamp-2">{doc.name}</CardTitle>
        <CardDescription>
          {doc.type} • {doc.size}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {doc.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Modified {doc.lastModified}
          </p>

          <DocumentActions />
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentGridItem;
