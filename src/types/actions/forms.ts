// Form types
export interface Form {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  shareUrl: string;
  isPublic: boolean;
  isAcceptingResponses: boolean;
  password: string | null;
  maxResponses: number | null;
  closesAt: Date | null;
  logoUrl: string | null;
  themeSettings: Record<string, unknown> | null;
  successMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFormInput {
  title: string;
  description?: string;
  isPublic?: boolean;
  isAcceptingResponses?: boolean;
  password?: string;
  maxResponses?: number;
  closesAt?: Date;
  logoUrl?: string;
  themeSettings?: Record<string, unknown>;
  successMessage?: string;
}

export interface UpdateFormInput {
  title?: string;
  description?: string | null;
  isPublic?: boolean;
  isAcceptingResponses?: boolean;
  password?: string | null;
  maxResponses?: number | null;
  closesAt?: Date | null;
  logoUrl?: string | null;
  themeSettings?: Record<string, unknown> | null;
  successMessage?: string | null;
}

// Form Field types
export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "radio"
  | "checkbox"
  | "dropdown"
  | "date"
  | "time"
  | "file"
  | "rating"
  | "signature";

export interface FormField {
  id: string;
  formId: string;
  fieldType: FieldType;
  label: string;
  placeholder: string | null;
  required: boolean;
  validationRules: Record<string, unknown> | null;
  options: string[] | null;
  conditionalLogic: Record<string, unknown> | null;
  order: number;
  step: number;
  createdAt: Date;
}

export interface CreateFieldInput {
  formId: string;
  fieldType: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  validationRules?: Record<string, unknown>;
  options?: string[];
  conditionalLogic?: Record<string, unknown>;
  order: number;
  step?: number;
}

export interface UpdateFieldInput {
  fieldType?: FieldType;
  label?: string;
  placeholder?: string | null;
  required?: boolean;
  validationRules?: Record<string, unknown> | null;
  options?: string[] | null;
  conditionalLogic?: Record<string, unknown> | null;
  order?: number;
  step?: number;
}

// Form Response types
export interface FormResponse {
  id: string;
  formId: string;
  userId: string | null;
  email: string;
  responseData: Record<string, unknown>;
  ipAddress: string | null;
  userAgent: string | null;
  submittedAt: Date;
}

export interface SubmitResponseInput {
  formId: string;
  email: string;
  responseData: Record<string, unknown>;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}
