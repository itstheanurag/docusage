"use server";

/**
 * Invoice Server Actions
 *
 * NOTE: The current database schema does not include an invoices table.
 * Invoices are currently generated client-side based on the InvoiceData type.
 *
 * To persist invoices to the database, you would need to:
 * 1. Create an invoices schema in src/lib/db/schema/invoices-schema.ts
 * 2. Run migrations to create the table
 * 3. Import and use the schema here
 *
 * For now, these are stub functions that demonstrate the intended API.
 */

import { nanoid } from "nanoid";
import type {
  Invoice,
  InvoiceItem,
  CreateInvoiceInput,
  UpdateInvoiceInput,
} from "@/types/actions/invoices";

export type { Invoice, InvoiceItem, CreateInvoiceInput, UpdateInvoiceInput };

/**
 * List all invoices for a user
 * NOTE: Requires invoices table to be created
 */
export async function listInvoices(_userId: string): Promise<Invoice[]> {
  // TODO: Implement when invoices schema is created
  console.warn("listInvoices: Invoices table not yet implemented");
  return [];
}

/**
 * Get a single invoice by ID
 * NOTE: Requires invoices table to be created
 */
export async function getInvoice(
  _id: string,
  _userId: string
): Promise<Invoice | null> {
  // TODO: Implement when invoices schema is created
  console.warn("getInvoice: Invoices table not yet implemented");
  return null;
}

/**
 * Create a new invoice
 * NOTE: Requires invoices table to be created
 */
export async function createInvoice(
  data: CreateInvoiceInput,
  userId: string
): Promise<Invoice> {
  // TODO: Implement when invoices schema is created
  console.warn("createInvoice: Invoices table not yet implemented");

  const id = nanoid();
  const now = new Date();

  // Return a mock invoice for now
  return {
    id,
    userId,
    ...data,
    notes: data.notes ?? "",
    tax: data.tax ?? 0,
    taxLabel: data.taxLabel ?? "Tax",
    currency: data.currency ?? "USD",
    recurrence: data.recurrence ?? "one-time",
    theme: data.theme ?? "clean",
    accentColor: data.accentColor ?? "#000000",
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Update an invoice
 * NOTE: Requires invoices table to be created
 */
export async function updateInvoice(
  _id: string,
  _data: UpdateInvoiceInput,
  _userId: string
): Promise<Invoice | null> {
  // TODO: Implement when invoices schema is created
  console.warn("updateInvoice: Invoices table not yet implemented");
  return null;
}

/**
 * Delete an invoice
 * NOTE: Requires invoices table to be created
 */
export async function deleteInvoice(
  _id: string,
  _userId: string
): Promise<boolean> {
  // TODO: Implement when invoices schema is created
  console.warn("deleteInvoice: Invoices table not yet implemented");
  return false;
}
