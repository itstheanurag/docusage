"use server";

import { getDb } from "@/lib/db";
import { documentDataSets } from "@/lib/db/schema/documents-schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import type {
  DataSet,
  CreateDataSetInput,
  UpdateDataSetInput,
} from "@/types/actions/documents";

export type { DataSet, CreateDataSetInput, UpdateDataSetInput };

/**
 * List all data sets for a document
 */
export async function listDataSets(documentId: string): Promise<DataSet[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(documentDataSets)
    .where(eq(documentDataSets.documentId, documentId));

  return result as DataSet[];
}

/**
 * Get a single data set by ID
 */
export async function getDataSet(id: string): Promise<DataSet | null> {
  const db = getDb();
  const result = await db
    .select()
    .from(documentDataSets)
    .where(eq(documentDataSets.id, id))
    .limit(1);

  return (result[0] as DataSet) ?? null;
}

/**
 * Create a new data set
 */
export async function createDataSet(
  data: CreateDataSetInput
): Promise<DataSet> {
  const db = getDb();
  const id = nanoid();
  const now = new Date();

  const newDataSet = {
    id,
    documentId: data.documentId,
    name: data.name,
    data: data.data,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(documentDataSets).values(newDataSet);

  return newDataSet;
}

/**
 * Update a data set
 */
export async function updateDataSet(
  id: string,
  data: UpdateDataSetInput
): Promise<DataSet | null> {
  const db = getDb();

  const existing = await getDataSet(id);
  if (!existing) return null;

  const updateData: Partial<DataSet> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.data !== undefined) updateData.data = data.data;

  await db
    .update(documentDataSets)
    .set(updateData)
    .where(eq(documentDataSets.id, id));

  return getDataSet(id);
}

/**
 * Delete a data set
 */
export async function deleteDataSet(id: string): Promise<boolean> {
  const db = getDb();

  const existing = await getDataSet(id);
  if (!existing) return false;

  await db.delete(documentDataSets).where(eq(documentDataSets.id, id));

  return true;
}
