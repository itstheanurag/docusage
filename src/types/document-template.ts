export interface TemplateField {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "currency" | "image";
  required: boolean;
  placeholder?: string;
  description?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: "legal" | "hr" | "finance";
  icon: string;
  fields: TemplateField[];
  htmlTemplate: string;
}
