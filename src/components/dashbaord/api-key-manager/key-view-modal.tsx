import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { copyToClipboard, formatDate } from "@/lib/utils/apiKey";
import { DisplayApiKey } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Key } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useApiKeyStore } from "@/store/apiKeyStore";

export function ViewApiKeyModal() {
  const { selectedKey, setSelectedKey, updateApiKey, deleteApiKey } =
    useApiKeyStore();
  const [editing, setEditing] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(false);
  const [rateLimitMax, setRateLimitMax] = useState<number | null>(null);
  const [rateLimitWindowHours, setRateLimitWindowHours] = useState<number>(1);
  const [refillIntervalHours, setRefillIntervalHours] = useState<number | null>(
    null
  );
  const [refillAmount, setRefillAmount] = useState<number | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  // when modal opens, seed form with apiKey values
  React.useEffect(() => {
    if (!selectedKey) return;
    setName(selectedKey.name ?? "");
    setEnabled(selectedKey.enabled);
    setRateLimitEnabled(selectedKey.rateLimitEnabled ?? false);
    setRateLimitMax(selectedKey.rateLimitMax ?? null);
    setRateLimitWindowHours(
      Math.max(
        1,
        Math.round((selectedKey.rateLimitTimeWindow ?? 3600000) / 3600000)
      )
    );
    setRefillIntervalHours(
      selectedKey.refillInterval
        ? Math.round(selectedKey.refillInterval / 3600000)
        : null
    );
    setRefillAmount(selectedKey.refillAmount ?? null);
    setExpiresAt(
      selectedKey.expiresAt
        ? new Date(selectedKey.expiresAt).toISOString().slice(0, 16)
        : null
    );
    // permissions: store as array of strings if comma or array
    if (!selectedKey.permissions) setPermissions([]);
    else if (typeof selectedKey.permissions === "string") {
      try {
        // try parse JSON array
        const p = JSON.parse(selectedKey.permissions);
        if (Array.isArray(p)) setPermissions(p.map(String));
        else
          setPermissions(
            selectedKey.permissions.split(",").map((s) => s.trim())
          );
      } catch {
        setPermissions(selectedKey.permissions.split(",").map((s) => s.trim()));
      }
    } else {
      setPermissions(
        Array.isArray(selectedKey.permissions)
          ? selectedKey.permissions
          : [String(selectedKey.permissions)]
      );
    }

    setEditing(false);
  }, [selectedKey]);

  if (!selectedKey) return null;

  const handleSave = async () => {
    const patch: Partial<DisplayApiKey> = {
      name: name || null,
      enabled,
      rateLimitEnabled,
      rateLimitMax: rateLimitMax ?? 0,
      rateLimitTimeWindow: rateLimitWindowHours * 3600000,
      refillInterval: refillIntervalHours
        ? refillIntervalHours * 3600000
        : null,
      refillAmount: refillAmount ?? null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      permissions: permissions.length ? JSON.stringify(permissions) : null,
    };

    try {
      await updateApiKey(selectedKey.id, patch);
      toast.success("Saved");
      setSelectedKey(null);
    } catch (err) {
      toast.error("Failed to save");
    }
  };

  const addPermission = (p: string) => {
    const clean = p.trim();
    if (!clean) return;
    if (!permissions.includes(clean)) setPermissions((s) => [...s, clean]);
  };

  const removePermission = (p: string) =>
    setPermissions((s) => s.filter((x) => x !== p));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setSelectedKey(null)}
      />
      <div className="relative z-10 w-full max-w-3xl bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-lg font-semibold">
                  {selectedKey.name || "Unnamed key"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedKey.prefix
                    ? `${selectedKey.prefix} ••• ${selectedKey.start || ""}`
                    : "No prefix"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm("Delete this key?")) {
                    deleteApiKey(selectedKey.id);
                    setSelectedKey(null);
                  }
                }}
                className="text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4">
          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label>Enabled</Label>
              <div className="flex items-center gap-3 mt-2">
                <Switch checked={enabled} onCheckedChange={setEnabled} />
                <span className="text-sm text-muted-foreground">
                  {enabled ? "Active" : "Disabled"}
                </span>
              </div>
            </div>

            <div>
              <Label>Created</Label>
              <div className="mt-2 text-sm">
                {formatDate(selectedKey.createdAt)}
              </div>
            </div>

            <div>
              <Label>Updated</Label>
              <div className="mt-2 text-sm">
                {formatDate(selectedKey.updatedAt)}
              </div>
            </div>
          </div>

          <Separator />

          {/* Rate limiting */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Rate Limiting</Label>
                <div className="text-xs text-muted-foreground">
                  Enable and configure token bucket limits
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Enabled</span>
                <Switch
                  checked={rateLimitEnabled}
                  onCheckedChange={setRateLimitEnabled}
                />
              </div>
            </div>

            {rateLimitEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
                <div className="flex flex-col gap-1">
                  <Label>Max Requests</Label>
                  <Input
                    className="mt-3"
                    type="number"
                    value={rateLimitMax ?? undefined}
                    onChange={(e) =>
                      setRateLimitMax(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Time Window (hours)</Label>
                  <Input
                    className="mt-3"
                    type="number"
                    value={rateLimitWindowHours}
                    onChange={(e) =>
                      setRateLimitWindowHours(
                        Math.max(1, Number(e.target.value))
                      )
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Refill (amount / hours)</Label>
                  <div className="flex gap-2">
                    <Input
                      className="mt-3"
                      type="number"
                      value={refillAmount ?? undefined}
                      onChange={(e) =>
                        setRefillAmount(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      placeholder="amount"
                    />
                    <Input
                      className="mt-3"
                      type="number"
                      value={refillIntervalHours ?? undefined}
                      onChange={(e) =>
                        setRefillIntervalHours(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      placeholder="hours"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Expiration */}
          <div>
            <Label>Expiration (optional)</Label>
            <Input
              className="mt-3"
              type="datetime-local"
              value={expiresAt ?? ""}
              onChange={(e) => setExpiresAt(e.target.value || null)}
            />
          </div>

          <Separator />

          {/* Permissions (Tag chips) */}
          <div>
            <Label>Permissions</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {permissions.map((p) => (
                <div
                  key={p}
                  className="inline-flex items-center gap-2 bg-muted/60 px-2 py-1 rounded text-sm"
                >
                  <span>{p}</span>
                  <button
                    onClick={() => removePermission(p)}
                    className="text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <PermissionAdder onAdd={addPermission} />
            </div>
          </div>

          {/* Read-only Metadata */}
          {selectedKey.metadata && (
            <div>
              <Label>Metadata</Label>
              <pre className="mt-3 rounded-md border bg-slate-100 dark:bg-slate-800 p-3 text-xs font-mono max-h-40 overflow-auto">
                {selectedKey.metadata}
              </pre>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex items-center justify-end gap-2">
          <Button variant="outline" onClick={() => setSelectedKey(null)}>
            Close
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}

function PermissionAdder({ onAdd }: { onAdd: (p: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(val);
        setVal("");
      }}
      className="inline-flex items-center"
    >
      <Input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="add permission"
        className="h-8"
      />
      <Button type="submit" size="sm" className="ml-2">
        Add
      </Button>
    </form>
  );
}
