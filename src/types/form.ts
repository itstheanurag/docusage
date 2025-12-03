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
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  step: number;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    // New validation flags
    allowAlphabets?: boolean;
    allowNumbers?: boolean;
    allowSpecialChars?: boolean;
    allowSpaces?: boolean;
  };
}
