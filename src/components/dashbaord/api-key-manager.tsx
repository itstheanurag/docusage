"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { ApiKeyManagerHeader } from "./api-key-manager/api-key-manager-header";
import { CreateApiKeyModal } from "./api-key-manager/create-api-key-modal";
import { EmptyState } from "./api-key-manager/empty-state";

import { DisplayApiKey } from "@/types";
import { ApiKeysTable } from "./api-key-manager/api-key-table";
import {
  listApiKeys,
  createApiKey,
  deleteApiKey,
  updateApiKey,
  toggleApiKeyEnabled,
} from "@/actions/apiKeys";
import { ViewApiKeyModal } from "./api-key-manager/key-view-modal";

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<DisplayApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<DisplayApiKey | null>(
    null
  );

  const [selectedKey, setSelectedKey] = useState<DisplayApiKey | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const apiKeys = await listApiKeys();
      console.log(JSON.stringify(apiKeys));
      setApiKeys(apiKeys);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for your API key");
      return;
    }

    setIsCreating(true);
    try {
      const apiKey = await createApiKey(newKeyName.trim());
      setApiKeys((prev) => [apiKey, ...prev]);
      setNewlyCreatedKey(apiKey);
      setNewKeyName("");
      toast.success("API key created successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setNewKeyName("");
    setNewlyCreatedKey(null);
  };

  const handleDeleteKey = async (id: string) => {
    try {
      await deleteApiKey(id);
      await refreshKeys();
      toast.success("API key deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleToggleApiKey = async (id: string, enabled: boolean) => {
    try {
      const updatedKey = await toggleApiKeyEnabled(id, enabled);
      setApiKeys((prev) =>
        prev.map((key) => (key.id === id ? { ...key, enabled } : updatedKey))
      );

      toast.success(`API key ${enabled ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error("Failed to update API key");
    }
  };

  const handleViewKey = (key: DisplayApiKey) => {
    setSelectedKey(key);
  };

  const refreshKeys = async () => await fetchApiKeys();

  const handleCopyPrefix = (prefix: string | null) => {
    if (!prefix) return;
    navigator.clipboard.writeText(prefix);
    toast.success("Prefix copied!");
  };

  const handleUpdateApiKey = async (
    id: string,
    patch: Partial<DisplayApiKey>
  ) => {
    try {
      const updatedKey = await updateApiKey(id, patch);
      setApiKeys((prev) =>
        prev.map((key) => (key.id === id ? { ...key, ...patch } : updatedKey))
      );
      toast.success("API key updated successfully.");
    } catch (err) {
      toast.error("Failed to update API key");
    }
  };

  return (
    <>
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <ApiKeyManagerHeader onCreateNew={() => setIsCreateModalOpen(true)} />
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
            <EmptyState onCreateNew={() => setIsCreateModalOpen(true)} />
          ) : (
            <ApiKeysTable
              apiKeys={apiKeys}
              onDelete={handleDeleteKey}
              onToggleEnabled={handleToggleApiKey}
              onView={handleViewKey}
            />
          )}
        </CardContent>
      </Card>

      {selectedKey && (
        <ViewApiKeyModal
          isOpen={!!selectedKey}
          apiKey={selectedKey}
          onClose={() => setSelectedKey(null)}
          onSave={handleUpdateApiKey}
          onDelete={handleDeleteKey}
        />
      )}

      <CreateApiKeyModal
        isOpen={isCreateModalOpen}
        isCreating={isCreating}
        newKeyName={newKeyName}
        newlyCreatedKey={newlyCreatedKey}
        onClose={handleCloseModal}
        onCreate={handleCreateApiKey}
        setNewKeyName={setNewKeyName}
      />
    </>
  );
}
