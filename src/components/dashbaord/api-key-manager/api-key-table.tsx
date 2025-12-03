"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Key } from "lucide-react";

import { formatDate } from "@/lib/utils/apiKey";
import { useApiKeyStore } from "@/store/apiKeyStore";

export function ApiKeysTable() {
  const { apiKeys, setSelectedKey, toggleApiKey, deleteApiKey } =
    useApiKeyStore();

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requests</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {apiKeys.map((k) => (
            <TableRow key={k.id}>
              {/* Name */}
              <TableCell className="max-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 shrink-0">
                    <Key className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">
                      {k.name || "Unnamed Key"}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Redacted Key */}
              <TableCell>
                <span className="font-mono text-sm text-muted-foreground">
                  {"***********"}
                </span>
              </TableCell>

              {/* Status */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Badge variant={k.enabled ? "default" : "secondary"}>
                    {k.enabled ? "Active" : "Disabled"}
                  </Badge>
                  <Switch
                    checked={k.enabled}
                    onCheckedChange={(val) => toggleApiKey(k.id, val)}
                  />
                </div>
              </TableCell>

              {/* Requests + Remaining */}
              <TableCell>{k.requestCount.toLocaleString()}</TableCell>
              <TableCell>{k.remaining ?? "-"}</TableCell>

              {/* Created / Expiry */}
              <TableCell>{formatDate(k.createdAt)}</TableCell>
              <TableCell>
                {k.expiresAt ? formatDate(k.expiresAt) : "Never"}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedKey(k)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteApiKey(k.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
