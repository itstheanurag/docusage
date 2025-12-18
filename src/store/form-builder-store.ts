import { create } from "zustand";
import { FormField, FormBuilderState } from "@/types/form";

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
  submitButtonText: "Submit",
  successMessage: "Thank you for your submission!",

  setFields: (fields) => set({ fields }),
  setSelectedFieldId: (selectedFieldId) => set({ selectedFieldId }),
  setFormTitle: (formTitle) => set({ formTitle }),
  setFormDescription: (formDescription) => set({ formDescription }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setSteps: (steps) => set({ steps }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setLogoUrl: (logoUrl) => set({ logoUrl }),
  setSubmitButtonText: (submitButtonText) => set({ submitButtonText }),
  setSuccessMessage: (successMessage) => set({ successMessage }),
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
