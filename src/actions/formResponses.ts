"use server";

import { getDb } from "@/lib/db";
import { formResponses, formAnalytics } from "@/lib/db/schema/forms-schema";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import type { FormResponse, SubmitResponseInput } from "@/types/actions/forms";

/**
 * List all responses for a form
 */
export async function listResponses(formId: string): Promise<FormResponse[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(formResponses)
    .where(eq(formResponses.formId, formId));

  return result as FormResponse[];
}

/**
 * Get a single response by ID
 */
export async function getResponse(id: string): Promise<FormResponse | null> {
  const db = getDb();
  const result = await db
    .select()
    .from(formResponses)
    .where(eq(formResponses.id, id))
    .limit(1);

  return (result[0] as FormResponse) ?? null;
}

/**
 * Submit a form response
 */
export async function submitResponse(
  data: SubmitResponseInput
): Promise<FormResponse> {
  const db = getDb();
  const id = nanoid();
  const now = new Date();

  const newResponse = {
    id,
    formId: data.formId,
    userId: data.userId ?? null,
    email: data.email,
    responseData: data.responseData,
    ipAddress: data.ipAddress ?? null,
    userAgent: data.userAgent ?? null,
    submittedAt: now,
  };

  await db.insert(formResponses).values(newResponse);

  // Update form analytics
  await db
    .update(formAnalytics)
    .set({
      totalSubmissions: sql`${formAnalytics.totalSubmissions} + 1`,
      lastUpdated: now,
    })
    .where(eq(formAnalytics.formId, data.formId));

  return newResponse;
}

/**
 * Delete a form response
 */
export async function deleteResponse(id: string): Promise<boolean> {
  const db = getDb();

  const existing = await getResponse(id);
  if (!existing) return false;

  await db.delete(formResponses).where(eq(formResponses.id, id));

  // Update form analytics
  await db
    .update(formAnalytics)
    .set({
      totalSubmissions: sql`GREATEST(${formAnalytics.totalSubmissions} - 1, 0)`,
      lastUpdated: new Date(),
    })
    .where(eq(formAnalytics.formId, existing.formId));

  return true;
}

/**
 * Increment form view count
 */
export async function incrementFormViews(formId: string): Promise<void> {
  const db = getDb();

  await db
    .update(formAnalytics)
    .set({
      totalViews: sql`${formAnalytics.totalViews} + 1`,
      lastUpdated: new Date(),
    })
    .where(eq(formAnalytics.formId, formId));
}

/**
 * Get form analytics
 */
export async function getFormAnalytics(formId: string) {
  const db = getDb();
  const result = await db
    .select()
    .from(formAnalytics)
    .where(eq(formAnalytics.formId, formId))
    .limit(1);

  return result[0] ?? null;
}
