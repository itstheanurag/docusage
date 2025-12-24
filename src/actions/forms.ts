"use server";

import { getDb } from "@/lib/db";
import { forms, formAnalytics } from "@/lib/db/schema/forms-schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import type {
  Form,
  CreateFormInput,
  UpdateFormInput,
} from "@/types/actions/forms";

export type { Form, CreateFormInput, UpdateFormInput };

/**
 * List all forms for a user
 */
export async function listForms(userId: string): Promise<Form[]> {
  const db = getDb();
  const result = await db.select().from(forms).where(eq(forms.userId, userId));

  return result as Form[];
}

/**
 * Get a single form by ID
 */
export async function getForm(
  id: string,
  userId: string
): Promise<Form | null> {
  const db = getDb();
  const result = await db
    .select()
    .from(forms)
    .where(and(eq(forms.id, id), eq(forms.userId, userId)))
    .limit(1);

  return (result[0] as Form) ?? null;
}

/**
 * Get a form by share URL (public access)
 */
export async function getFormByShareUrl(
  shareUrl: string
): Promise<Form | null> {
  const db = getDb();
  const result = await db
    .select()
    .from(forms)
    .where(eq(forms.shareUrl, shareUrl))
    .limit(1);

  const form = result[0] as Form | undefined;
  if (!form) return null;

  // Check if form is public and accepting responses
  if (!form.isPublic) return null;
  if (!form.isAcceptingResponses) return null;
  if (form.closesAt && new Date() > form.closesAt) return null;

  return form;
}

/**
 * Create a new form
 */
export async function createForm(
  data: CreateFormInput,
  userId: string
): Promise<Form> {
  const db = getDb();
  const id = nanoid();
  const shareUrl = nanoid(10);
  const now = new Date();

  const newForm = {
    id,
    title: data.title,
    description: data.description ?? null,
    userId,
    shareUrl,
    isPublic: data.isPublic ?? false,
    isAcceptingResponses: data.isAcceptingResponses ?? true,
    password: data.password ?? null,
    maxResponses: data.maxResponses ?? null,
    closesAt: data.closesAt ?? null,
    logoUrl: data.logoUrl ?? null,
    themeSettings: data.themeSettings ?? null,
    successMessage: data.successMessage ?? null,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(forms).values(newForm);

  // Create analytics entry for the form
  await db.insert(formAnalytics).values({
    id: nanoid(),
    formId: id,
    totalViews: 0,
    totalSubmissions: 0,
    completionRate: "0",
    averageTime: 0,
    lastUpdated: now,
  });

  return newForm;
}

/**
 * Update a form
 */
export async function updateForm(
  id: string,
  data: UpdateFormInput,
  userId: string
): Promise<Form | null> {
  const db = getDb();

  // Verify ownership
  const existing = await getForm(id, userId);
  if (!existing) return null;

  const updateData: Partial<Form> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.isPublic !== undefined) updateData.isPublic = data.isPublic;
  if (data.isAcceptingResponses !== undefined)
    updateData.isAcceptingResponses = data.isAcceptingResponses;
  if (data.password !== undefined) updateData.password = data.password;
  if (data.maxResponses !== undefined)
    updateData.maxResponses = data.maxResponses;
  if (data.closesAt !== undefined) updateData.closesAt = data.closesAt;
  if (data.logoUrl !== undefined) updateData.logoUrl = data.logoUrl;
  if (data.themeSettings !== undefined)
    updateData.themeSettings = data.themeSettings;
  if (data.successMessage !== undefined)
    updateData.successMessage = data.successMessage;

  await db
    .update(forms)
    .set(updateData)
    .where(and(eq(forms.id, id), eq(forms.userId, userId)));

  return getForm(id, userId);
}

/**
 * Delete a form
 */
export async function deleteForm(id: string, userId: string): Promise<boolean> {
  const db = getDb();

  // Verify ownership
  const existing = await getForm(id, userId);
  if (!existing) return false;

  await db.delete(forms).where(and(eq(forms.id, id), eq(forms.userId, userId)));

  return true;
}
