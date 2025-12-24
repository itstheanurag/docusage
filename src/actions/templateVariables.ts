"use server";

import { getDb } from "@/lib/db";
import { templateVariables } from "@/lib/db/schema/documents-schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import type {
  TemplateVariable,
  CreateVariableInput,
  UpdateVariableInput,
} from "@/types/actions/documents";

export type { TemplateVariable, CreateVariableInput, UpdateVariableInput };

/**
 * List all template variables for a document
 */
export async function listVariables(
  documentId: string
): Promise<TemplateVariable[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(templateVariables)
    .where(eq(templateVariables.documentId, documentId));

  return result as TemplateVariable[];
}

/**
 * Get a single variable by ID
 */
export async function getVariable(
  id: string
): Promise<TemplateVariable | null> {
  const db = getDb();
  const result = await db
    .select()
    .from(templateVariables)
    .where(eq(templateVariables.id, id))
    .limit(1);

  return (result[0] as TemplateVariable) ?? null;
}

/**
 * Create a new template variable
 */
export async function createVariable(
  data: CreateVariableInput
): Promise<TemplateVariable> {
  const db = getDb();
  const id = nanoid();
  const now = new Date();

  const newVariable = {
    id,
    documentId: data.documentId,
    name: data.name,
    label: data.label,
    type: data.type ?? "text",
    defaultValue: data.defaultValue ?? null,
    createdAt: now,
  };

  await db.insert(templateVariables).values(newVariable);

  return newVariable;
}

/**
 * Update a template variable
 */
export async function updateVariable(
  id: string,
  data: UpdateVariableInput
): Promise<TemplateVariable | null> {
  const db = getDb();

  const existing = await getVariable(id);
  if (!existing) return null;

  const updateData: Partial<TemplateVariable> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.label !== undefined) updateData.label = data.label;
  if (data.type !== undefined) updateData.type = data.type;
  if (data.defaultValue !== undefined)
    updateData.defaultValue = data.defaultValue;

  await db
    .update(templateVariables)
    .set(updateData)
    .where(eq(templateVariables.id, id));

  return getVariable(id);
}

/**
 * Delete a template variable
 */
export async function deleteVariable(id: string): Promise<boolean> {
  const db = getDb();
  const result = await db
    .delete(templateVariables)
    .where(eq(templateVariables.id, id));

  if (!result.rowCount) {
    return false;
  }

  return true;
}
