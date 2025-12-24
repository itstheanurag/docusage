"use server";

import { getDb } from "@/lib/db";
import { documents } from "@/lib/db/schema/documents-schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import type {
  Document,
  CreateDocumentInput,
  UpdateDocumentInput,
} from "@/types/actions/documents";

export type { Document, CreateDocumentInput, UpdateDocumentInput };

/**
 * List all documents for a user
 */
export async function listDocuments(userId: string): Promise<Document[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(documents)
    .where(eq(documents.userId, userId));

  return result as Document[];
}

/**
 * Get a single document by ID
 */
export async function getDocument(
  id: string,
  userId: string
): Promise<Document | null> {
  const db = getDb();
  const result = await db
    .select()
    .from(documents)
    .where(and(eq(documents.id, id), eq(documents.userId, userId)))
    .limit(1);

  return (result[0] as Document) ?? null;
}

/**
 * Create a new document
 */
export async function createDocument(
  data: CreateDocumentInput,
  userId: string
): Promise<Document> {
  const db = getDb();
  const id = nanoid();
  const now = new Date();

  const newDocument = {
    id,
    title: data.title,
    content: data.content,
    userId,
    isTemplate: data.isTemplate ?? false,
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(documents).values(newDocument);

  return newDocument;
}

/**
 * Update a document
 */
export async function updateDocument(
  id: string,
  data: UpdateDocumentInput,
  userId: string
): Promise<Document | null> {
  const db = getDb();

  // Verify ownership
  const existing = await getDocument(id, userId);
  if (!existing) return null;

  const updateData: Partial<Document> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.isTemplate !== undefined) updateData.isTemplate = data.isTemplate;

  await db
    .update(documents)
    .set(updateData)
    .where(and(eq(documents.id, id), eq(documents.userId, userId)));

  return getDocument(id, userId);
}

/**
 * Delete a document
 */
export async function deleteDocument(
  id: string,
  userId: string
): Promise<boolean> {
  const db = getDb();

  // Verify ownership
  const existing = await getDocument(id, userId);
  if (!existing) return false;

  await db
    .delete(documents)
    .where(and(eq(documents.id, id), eq(documents.userId, userId)));

  return true;
}
