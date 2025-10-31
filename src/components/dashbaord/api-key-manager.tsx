"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "sonner";
import { client } from "@/lib/better-auth/client";
import {
  Copy,
  Key,
  Trash2,
  Clock,
  Shield,
  AlertCircle,
  Activity,
  RefreshCw,
  Zap,
  BarChart3,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

type DisplayApiKey = {
  id: string;
  name: string | null;
  key?: string;
  prefix: string | null;
  start: string | null;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
  expiresAt: Date | null;
  refillInterval: number | null;
  refillAmount: number | null;
  lastRefillAt: Date | null;
  rateLimitEnabled: boolean;
  rateLimitTimeWindow: number;
  rateLimitMax: number;
  requestCount: number;
  remaining: number | null;
  lastRequest: Date | null;
  permissions: string | null;
  metadata: string | null;
};

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<DisplayApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<DisplayApiKey | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const res = await client.apiKey.list();
      if (res.error) throw new Error("Failed to fetch API keys");

      setApiKeys(
        res.data.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          expiresAt: item.expiresAt ? new Date(item.expiresAt) : null,
          lastRefillAt: item.lastRefillAt ? new Date(item.lastRefillAt) : null,
          lastRequest: item.lastRequest ? new Date(item.lastRequest) : null,
        }))
      );
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
      const res = await client.apiKey.create({ name: newKeyName.trim() });
      if (res.error) throw new Error("Failed to generate API key");

      const newKeyData = res.data as any;
      const formattedKey: DisplayApiKey = {
        ...newKeyData,
        createdAt: new Date(newKeyData.createdAt),
        updatedAt: new Date(newKeyData.updatedAt),
        expiresAt: newKeyData.expiresAt ? new Date(newKeyData.expiresAt) : null,
        lastRefillAt: newKeyData.lastRefillAt ? new Date(newKeyData.lastRefillAt) : null,
        lastRequest: newKeyData.lastRequest ? new Date(newKeyData.lastRequest) : null,
      };
      
      setApiKeys((prev) => [formattedKey, ...prev]);
      setNewlyCreatedKey(formattedKey);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      const res = await client.apiKey.delete({ keyId: id });
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      setApiKeys((prev) => prev.filter((key) => key.id !== id));
      toast.success("API key deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const formatDate = (date: Date | null) =>
    date
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date)
      : "-";

  const formatDuration = (ms: number | null) => {
    if (!ms) return "-";
    const hours = Math.floor(ms / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  };

  const getUsagePercentage = (remaining: number | null, max: number) => {
    if (remaining === null) return 0;
    return ((max - remaining) / max) * 100;
  };

  return (
    <>
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">API Keys</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your API keys for secure access to your account
              </p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} size="lg">
              <Key className="mr-2 h-4 w-4" /> Create New Key
            </Button>
          </div>
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
            <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed rounded-lg">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Key className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No API Keys</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Create your first API key to get started with the API
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Key className="mr-2 h-4 w-4" /> Create Your First Key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
                >
                  <div className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                          <Key className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold truncate text-lg">
                            {apiKey.name || "Unnamed Key"}
                          </h3>
                          {apiKey.prefix && (
                            <p className="text-xs text-muted-foreground font-mono">
                              {apiKey.prefix}•••{apiKey.start || ""}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={apiKey.enabled ? "default" : "secondary"}>
                          {apiKey.enabled ? "Active" : "Disabled"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => deleteApiKey(apiKey.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Key Display */}
                    {apiKey.key && (
                      <div className="space-y-2">
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                          <p className="text-xs text-amber-700 dark:text-amber-400">
                            Save this key now - it won't be shown again!
                          </p>
                        </div>
                        <div className="relative">
                          <div className="font-mono text-sm break-all bg-slate-100 dark:bg-slate-800 p-3 pr-12 rounded-md border">
                            {apiKey.key}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-1 top-1 h-8 w-8 p-0"
                            onClick={() => copyToClipboard(apiKey.key!)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* Total Requests */}
                      <div className="rounded-lg border bg-muted/40 p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <BarChart3 className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">Total Requests</span>
                        </div>
                        <p className="text-xl font-bold">
                          {apiKey.requestCount.toLocaleString()}
                        </p>
                      </div>

                      {/* Remaining Quota */}
                      {apiKey.rateLimitEnabled && (
                        <div className="rounded-lg border bg-muted/40 p-3 space-y-1">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Zap className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Remaining</span>
                          </div>
                          <p className="text-xl font-bold">
                            {apiKey.remaining ?? 0}
                            <span className="text-sm text-muted-foreground font-normal">
                              /{apiKey.rateLimitMax}
                            </span>
                          </p>
                        </div>
                      )}

                      {/* Rate Limit Window */}
                      {apiKey.rateLimitEnabled && (
                        <div className="rounded-lg border bg-muted/40 p-3 space-y-1">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Time Window</span>
                          </div>
                          <p className="text-xl font-bold">
                            {formatDuration(apiKey.rateLimitTimeWindow)}
                          </p>
                        </div>
                      )}

                      {/* Refill Rate */}
                      {apiKey.refillInterval && apiKey.refillAmount && (
                        <div className="rounded-lg border bg-muted/40 p-3 space-y-1">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <RefreshCw className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Refill Rate</span>
                          </div>
                          <p className="text-xl font-bold">
                            {apiKey.refillAmount}
                            <span className="text-sm text-muted-foreground font-normal">
                              /{formatDuration(apiKey.refillInterval)}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Usage Progress Bar */}
                    {apiKey.rateLimitEnabled && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Usage</span>
                          <span className="font-medium">
                            {apiKey.rateLimitMax - (apiKey.remaining ?? 0)} / {apiKey.rateLimitMax} requests
                          </span>
                        </div>
                        <Progress
                          value={getUsagePercentage(apiKey.remaining, apiKey.rateLimitMax)}
                          className="h-2"
                        />
                      </div>
                    )}

                    <Separator />

                    {/* Metadata Section */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-3 w-3 flex-shrink-0" />
                          <span className="font-medium">Created:</span>
                          <span>{formatDate(apiKey.createdAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Activity className="h-3 w-3 flex-shrink-0" />
                          <span className="font-medium">Updated:</span>
                          <span>{formatDate(apiKey.updatedAt)}</span>
                        </div>

                        {apiKey.expiresAt && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Shield className="h-3 w-3 flex-shrink-0" />
                            <span className="font-medium">Expires:</span>
                            <span>{formatDate(apiKey.expiresAt)}</span>
                          </div>
                        )}

                        {apiKey.lastRequest && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Activity className="h-3 w-3 flex-shrink-0" />
                            <span className="font-medium">Last Request:</span>
                            <span>{formatDate(apiKey.lastRequest)}</span>
                          </div>
                        )}

                        {apiKey.lastRefillAt && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <RefreshCw className="h-3 w-3 flex-shrink-0" />
                            <span className="font-medium">Last Refill:</span>
                            <span>{formatDate(apiKey.lastRefillAt)}</span>
                          </div>
                        )}

                        {apiKey.permissions && (
                          <div className="flex items-start gap-2 text-muted-foreground col-span-full">
                            <Shield className="h-3 w-3 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Permissions:</span>
                            <span className="break-all">{apiKey.permissions}</span>
                          </div>
                        )}

                        {apiKey.metadata && (
                          <div className="flex items-start gap-2 text-muted-foreground col-span-full">
                            <span className="font-medium">Metadata:</span>
                            <span className="break-all font-mono text-[10px]">
                              {apiKey.metadata}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create API Key Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseModal}>
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
                  Your API key has been created successfully. Copy it now - you won't be
                  able to see it again.
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

                {/* Key Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{newlyCreatedKey.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate Limit:</span>
                    <span className="font-medium">
                      {newlyCreatedKey.rateLimitMax} requests per{" "}
                      {formatDuration(newlyCreatedKey.rateLimitTimeWindow)}
                    </span>
                  </div>
                  {newlyCreatedKey.refillInterval && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Refill Rate:</span>
                      <span className="font-medium">
                        {newlyCreatedKey.refillAmount} every{" "}
                        {formatDuration(newlyCreatedKey.refillInterval)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3">
                  <div className="flex gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-700 dark:text-amber-400">
                      <p className="font-medium mb-1">Important Security Notice</p>
                      <p>
                        Store this key securely. Anyone with this key can access your API.
                        Never share it or commit it to version control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleCloseModal} className="w-full">
                  Done, I've Saved My Key
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Give your API key a descriptive name to help you identify it later.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g., Production Server, Mobile App, Testing"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isCreating) {
                        handleCreateApiKey();
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Choose a name that describes where this key will be used
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateApiKey} disabled={isCreating}>
                  {isCreating ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Key className="mr-2 h-4 w-4" />
                      Create Key
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}