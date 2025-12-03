import { create } from "zustand";
import { FormField } from "@/types/form";

interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
  formTitle: string;
  formDescription: string;
  activeTab: "build" | "settings";
  steps: number[];
  currentStep: number;
  logoUrl: string;
  isPreviewMode: boolean;

  // Actions
  setFields: (fields: FormField[]) => void;
  setSelectedFieldId: (id: string | null) => void;
  setFormTitle: (title: string) => void;
  setFormDescription: (description: string) => void;
  setActiveTab: (tab: "build" | "settings") => void;
  setSteps: (steps: number[]) => void;
  setCurrentStep: (step: number) => void;
  setLogoUrl: (url: string) => void;
  togglePreview: () => void;
  addField: (type: FormField["type"]) => void;
  removeField: (id: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
}

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  fields: [],
  selectedFieldId: null,
  formTitle: "Untitled Form",
  formDescription: "",
  activeTab: "build",
  steps: [1],
  currentStep: 1,
  logoUrl: "",
  isPreviewMode: false,

  setFields: (fields) => set({ fields }),
  setSelectedFieldId: (selectedFieldId) => set({ selectedFieldId }),
  setFormTitle: (formTitle) => set({ formTitle }),
  setFormDescription: (formDescription) => set({ formDescription }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setSteps: (steps) => set({ steps }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setLogoUrl: (logoUrl) => set({ logoUrl }),
  togglePreview: () =>
    set((state) => ({ isPreviewMode: !state.isPreviewMode })),

  addField: (type) =>
    set((state) => {
      const newField: FormField = {
        id: crypto.randomUUID(),
        type,
        label: "New Question",
        required: false,
        options: ["Option 1", "Option 2", "Option 3"],
        step: state.currentStep,
      };
      return {
        fields: [...state.fields, newField],
        selectedFieldId: newField.id,
      };
    }),

  removeField: (id) =>
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
      selectedFieldId:
        state.selectedFieldId === id ? null : state.selectedFieldId,
    })),

  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),
}));
