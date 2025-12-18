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

export interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
  formTitle: string;
  formDescription: string;
  activeTab: "build" | "settings";
  steps: number[];
  currentStep: number;
  logoUrl: string;
  isPreviewMode: boolean;
  submitButtonText: string;
  successMessage: string;

  // Actions
  setFields: (fields: FormField[]) => void;
  setSelectedFieldId: (id: string | null) => void;
  setFormTitle: (title: string) => void;
  setFormDescription: (description: string) => void;
  setActiveTab: (tab: "build" | "settings") => void;
  setSteps: (steps: number[]) => void;
  setCurrentStep: (step: number) => void;
  setLogoUrl: (url: string) => void;
  setSubmitButtonText: (text: string) => void;
  setSuccessMessage: (message: string) => void;
  togglePreview: () => void;
  addField: (type: FormField["type"]) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
}
