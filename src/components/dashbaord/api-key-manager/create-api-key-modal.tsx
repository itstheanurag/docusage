"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Key, AlertCircle } from "lucide-react";
import { useApiKeyStore } from "@/store/apiKeyStore";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch {
    toast.error("Failed to copy to clipboard");
  }
};

const formatDuration = (ms: number | null) => {
  if (!ms) return "-";
  const hours = Math.floor(ms / 3600000);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
  return `${hours} hour${hours > 1 ? "s" : ""}`;
};

export function CreateApiKeyModal() {
  const {
    isCreateModalOpen,
    isCreating,
    newKeyName,
    newlyCreatedKey,
    closeCreateModal,
    createApiKey,
    setNewKeyName,
    permissions,
    setPermissions,
    expiresAt,
    setExpiresAt,
    rateLimitEnabled,
    setRateLimitEnabled,
    rateLimitMax,
    setRateLimitMax,
    rateLimitWindowHours,
    setRateLimitWindowHours,
    refillIntervalHours,
    setRefillIntervalHours,
    refillAmount,
    setRefillAmount,
    metadata,
    setMetadata,
  } = useApiKeyStore();

  const handleCreate = () => {
    createApiKey({
      name: newKeyName,
      permissions: permissions
        ? permissions.split(",").map((p) => p.trim())
        : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      rateLimitEnabled,
      rateLimitMax,
      rateLimitTimeWindow: rateLimitWindowHours * 3600000,
      refillInterval: refillIntervalHours
        ? refillIntervalHours * 3600000
        : null,
      refillAmount: refillAmount ? Number(refillAmount) : null,
      metadata: metadata || null,
    });
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={closeCreateModal}>
      <DialogContent className="sm:max-w-[500px]">
        {newlyCreatedKey ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2">
                  <Key className="h-5 w-5 text-green-600 dark:text-green-500" />
                </div>
                API Key Created!
              </DialogTitle>
              <DialogDescription>
                Copy this key now — you will not be able to view it again.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Your API Key</Label>
                <div className="relative">
                  <div className="font-mono text-sm break-all bg-slate-100 dark:bg-slate-800 p-4 pr-12 rounded-md border">
                    {newlyCreatedKey.key}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-2"
                    onClick={() => copyToClipboard(newlyCreatedKey.key!)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{newlyCreatedKey.name}</span>
                </div>
                {newlyCreatedKey.rateLimitEnabled && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate Limit:</span>
                    <span className="font-medium">
                      {newlyCreatedKey.rateLimitMax} req /{" "}
                      {formatDuration(newlyCreatedKey.rateLimitTimeWindow)}
                    </span>
                  </div>
                )}
              </div>

              <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 border p-3">
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-700 dark:text-amber-400">
                    <p className="font-medium mb-1">
                      Important Security Notice
                    </p>
                    <p>
                      Store this key securely. Anyone with this key can access
                      your API.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={closeCreateModal} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Configure optional limits and permissions.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label>Key Name</Label>
                <Input
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Permissions (comma separated)</Label>
                <Input
                  value={permissions}
                  onChange={(e) => setPermissions(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Expiration (optional)</Label>
                <Input
                  type="datetime-local"
                  onChange={(e) => setExpiresAt(e.target.value || null)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Rate Limiting</Label>
                <Switch
                  checked={rateLimitEnabled}
                  onCheckedChange={setRateLimitEnabled}
                />
              </div>

              {rateLimitEnabled && (
                <>
                  <div className="space-y-2">
                    <Label>Max Requests</Label>
                    <Input
                      type="number"
                      value={rateLimitMax}
                      onChange={(e) => setRateLimitMax(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time Window (hours)</Label>
                    <Input
                      type="number"
                      value={rateLimitWindowHours}
                      onChange={(e) =>
                        setRateLimitWindowHours(Number(e.target.value))
                      }
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label>Refill Interval (hours, optional)</Label>
                <Input
                  type="number"
                  value={refillIntervalHours ?? ""}
                  onChange={(e) =>
                    setRefillIntervalHours(
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Refill Amount (optional)</Label>
                <Input
                  type="number"
                  value={refillAmount ?? ""}
                  onChange={(e) =>
                    setRefillAmount(
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Metadata (JSON or text)</Label>
                <Textarea
                  value={metadata}
                  onChange={(e) => setMetadata(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={closeCreateModal}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Key"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
