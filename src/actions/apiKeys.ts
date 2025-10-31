"use client";

import { client } from "@/lib/better-auth";

export async function listApiKeys() {
  const res = await client.apiKey.list();
  return res.data;
}

export async function createApiKey() {
  const res = await client.apiKey.create();
  return res.data;
}

export async function revokeApiKey(id: string) {
  await client.apiKey.update({
    keyId: id,
    enabled: false,
  });
}
