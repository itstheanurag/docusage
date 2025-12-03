"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ApiKeyManagerHeader } from "./api-key-manager/api-key-manager-header";
import { CreateApiKeyModal } from "./api-key-manager/create-api-key-modal";
import { EmptyState } from "./api-key-manager/empty-state";
import { ApiKeysTable } from "./api-key-manager/api-key-table";
import { ViewApiKeyModal } from "./api-key-manager/key-view-modal";
import { useApiKeyStore } from "@/store/apiKeyStore";

export function ApiKeyManager() {
  const { apiKeys, isLoading, selectedKey, fetchApiKeys } = useApiKeyStore();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return (
    <>
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <ApiKeyManagerHeader />
        </CardHeader>

        <CardContent className="px-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Loading keys...</p>
              </div>
            </div>
          ) : apiKeys.length === 0 ? (
            <EmptyState />
          ) : (
            <ApiKeysTable />
          )}
        </CardContent>
      </Card>

      {selectedKey && <ViewApiKeyModal />}

      <CreateApiKeyModal />
    </>
  );
}
