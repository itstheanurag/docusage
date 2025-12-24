"use server";

import { getDb } from "@/lib/db";
import { formFields } from "@/lib/db/schema/forms-schema";
import { eq, asc } from "drizzle-orm";
import { nanoid } from "nanoid";
import type {
  FieldType,
  FormField,
  CreateFieldInput,
  UpdateFieldInput,
} from "@/types/actions/forms";

export type { FieldType, FormField, CreateFieldInput, UpdateFieldInput };

/**
 * List all fields for a form, ordered by their order field
 */
export async function listFields(formId: string): Promise<FormField[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(formFields)
    .where(eq(formFields.formId, formId))
    .orderBy(asc(formFields.order));

  return result as FormField[];
}

/**
 * Get a single field by ID
 */
export async function getField(id: string): Promise<FormField | null> {
  const db = getDb();
  const result = await db
    .select()
    .from(formFields)
    .where(eq(formFields.id, id))
    .limit(1);

  return (result[0] as FormField) ?? null;
}

/**
 * Create a new form field
 */
export async function createField(data: CreateFieldInput): Promise<FormField> {
  const db = getDb();
  const id = nanoid();
  const now = new Date();

  const newField = {
    id,
    formId: data.formId,
    fieldType: data.fieldType,
    label: data.label,
    placeholder: data.placeholder ?? null,
    required: data.required ?? false,
    validationRules: data.validationRules ?? null,
    options: data.options ?? null,
    conditionalLogic: data.conditionalLogic ?? null,
    order: data.order,
    step: data.step ?? 1,
    createdAt: now,
  };
  await db.insert(formFields).values(newField);
  return newField;
}

/**
 * Update a form field
 */
export async function updateField(
  id: string,
  data: UpdateFieldInput
): Promise<FormField | null> {
  const db = getDb();

  const existing = await getField(id);
  if (!existing) return null;

  const updateData: Partial<FormField> = {};
  if (data.fieldType !== undefined) updateData.fieldType = data.fieldType;
  if (data.label !== undefined) updateData.label = data.label;
  if (data.placeholder !== undefined) updateData.placeholder = data.placeholder;
  if (data.required !== undefined) updateData.required = data.required;
  if (data.validationRules !== undefined)
    updateData.validationRules = data.validationRules;
  if (data.options !== undefined) updateData.options = data.options;
  if (data.conditionalLogic !== undefined)
    updateData.conditionalLogic = data.conditionalLogic;
  if (data.order !== undefined) updateData.order = data.order;
  if (data.step !== undefined) updateData.step = data.step;

  await db.update(formFields).set(updateData).where(eq(formFields.id, id));

  return getField(id);
}

/**
 * Delete a form field
 */
export async function deleteField(id: string): Promise<boolean> {
  const db = getDb();

  const existing = await getField(id);
  if (!existing) return false;

  await db.delete(formFields).where(eq(formFields.id, id));

  return true;
}

/**
 * Reorder form fields
 */
export async function reorderFields(
  formId: string,
  fieldIds: string[]
): Promise<boolean> {
  if (fieldIds.length === 0) return true;

  const db = getDb();

  await db.transaction(async (tx) => {
    // 1. Ensure form exists
    const form = await tx.query.forms.findFirst({
      where: (forms, { eq }) => eq(forms.id, formId),
      columns: { id: true },
    });

    if (!form) {
      throw new Error("Form not found");
    }

    // 2. Fetch fields belonging to the form
    const fields = await tx.query.formFields.findMany({
      where: (formFields, { eq }) => eq(formFields.formId, formId),
      columns: { id: true },
    });

    // 3. Validate field count
    if (fields.length !== fieldIds.length) {
      throw new Error("Field count mismatch");
    }

    // 4. Validate ownership
    const validFieldIds = new Set(fields.map((f) => f.id));

    for (const id of fieldIds) {
      if (!validFieldIds.has(id)) {
        throw new Error(`Invalid field id: ${id}`);
      }
    }

    // 5. Perform reorder (single query)
    const orderCase = fieldIds
      .map((id, index) => `WHEN '${id}' THEN ${index}`)
      .join(" ");

    await tx.execute(`
      UPDATE form_fields
      SET "order" = CASE id
        ${orderCase}
      END
      WHERE form_id = '${formId}';
    `);
  });

  return true;
}
