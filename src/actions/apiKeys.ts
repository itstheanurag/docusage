"use client";

import { client } from "@/lib/better-auth/client";
import { DisplayApiKey } from "@/types";

export async function listApiKeys() {
  const res = await client.apiKey.list({});
  if (res.error) throw new Error(res.error.message);
  const keys = res.data.map(normalizeApiKey) as DisplayApiKey[];
  return keys;
}

export async function createApiKey(payload: {
  name: string;
  permissions?: string[] | null;
  expiresAt?: Date | null;
  rateLimitEnabled?: boolean;
  rateLimitMax?: number;
  rateLimitTimeWindow?: number;
  refillInterval?: number | null;
  refillAmount?: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
}) {
  const cleanPayload = {
    ...payload,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    permissions: (payload.permissions ?? undefined) as any,
    expiresAt: payload.expiresAt ?? undefined,
    refillInterval: payload.refillInterval ?? undefined,
    refillAmount: payload.refillAmount ?? undefined,
  };
  const res = await client.apiKey.create(cleanPayload);
  if (res.error) throw new Error(res.error.message);
  return normalizeApiKey(res.data);
}

export async function deleteApiKey(id: string) {
  const res = await client.apiKey.delete({ keyId: id });
  if (res.error) throw new Error(res.error.message);
  return null;
}

type ApiKeyPatch = Partial<
  Pick<
    DisplayApiKey,
    "name" | "enabled" | "remaining" | "refillAmount" | "refillInterval"
  >
> & {
  refillInterval?: number | null;
};

export async function updateApiKey(id: string, patch: Partial<DisplayApiKey>) {
  const allowedFields: (keyof DisplayApiKey)[] = [
    "name",
    "enabled",
    "remaining",
    "refillAmount",
    "refillInterval",
    "permissions",
  ];

  const cleanedPatch: ApiKeyPatch = {};

  for (const key of allowedFields) {
    if (key in patch) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cleanedPatch as any)[key] =
        patch[key as keyof DisplayApiKey] ?? undefined;
    }
  }

  // Convert refillIntervalHours → refillInterval in ms
  if ("refillIntervalHours" in patch && patch.refillInterval != null) {
    cleanedPatch.refillInterval = patch.refillInterval * 60 * 60 * 1000;
  }

  // Ensure refillAmount is undefined if null
  if (cleanedPatch.refillAmount === null) {
    cleanedPatch.refillAmount = undefined;
  }

  if (cleanedPatch.name === null) {
    cleanedPatch.name = undefined;
  }

  // @ts-expect-error - name type mismatch
  const res = await client.apiKey.update({ keyId: id, ...cleanedPatch });

  if (res.error) throw new Error(res.error.message);
  return normalizeApiKey(res.data);
}

export async function toggleApiKeyEnabled(id: string, enabled: boolean) {
  const res = await client.apiKey.update({ keyId: id, enabled });
  if (res.error) throw new Error(res.error.message);
  return normalizeApiKey(res.data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeApiKey(item: any): DisplayApiKey {
  return {
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
    expiresAt: item.expiresAt ? new Date(item.expiresAt) : null,
    lastRefillAt: item.lastRefillAt ? new Date(item.lastRefillAt) : null,
    lastRequest: item.lastRequest ? new Date(item.lastRequest) : null,
  };
}
