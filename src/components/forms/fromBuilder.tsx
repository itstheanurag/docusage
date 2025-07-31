"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormField } from "@/types/form";
import { renderField } from "@/helpers/render";

const fieldOptions = [
  { label: "Paragraph", type: "paragraph" },
  { label: "Heading 1", type: "heading", level: 1 },
  { label: "Heading 2", type: "heading", level: 2 },
  { label: "Heading 3", type: "heading", level: 3 },
  { label: "Input Field", type: "input" },
  { label: "Textarea", type: "textarea" },
  { label: "Select Dropdown", type: "select" },
  { label: "Multi-select", type: "multi-select" },
  { label: "Date Picker", type: "date" },
  { label: "Time Picker", type: "time" },
  { label: "Date & Time Picker", type: "datetime" },
  { label: "Number Input", type: "number" },
  { label: "Email Field", type: "email" },
  { label: "Phone Number Field", type: "phone" },
  { label: "Radio Group", type: "radio" },
  { label: "Checkbox Group", type: "checkbox" },
  { label: "Signature", type: "signature" },
];

export default function FormBuilder() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const addField = (option: (typeof fieldOptions)[0]) => {
    setFormFields((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: option.type,
        headingLevel: option.level || undefined,
        label:
          option.type !== "paragraph" ? `${option.label} Label` : undefined,
        content: option.type === "paragraph" ? "" : undefined,
        options:
          option.type === "radio" || option.type === "checkbox"
            ? ["Option 1", "Option 2"]
            : undefined,
      },
    ]);
    setShowOptions(false);
  };

  const removeField = (fieldId: string) => {
    setFormFields((prev) => prev.filter((field) => field.id !== fieldId));
  };

  const updateField = (id: string, newValues: Partial<FormField>) => {
    setFormFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...newValues } : field
      )
    );
  };

  return (
    <div className="min-h-screen p-8 flex">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Form Builder</h1>

        <div className="space-y-6 mb-20">
          {formFields.length === 0 ? (
            <div className="text-center py-12 rounded-lg shadow-sm border-2 border-dashed">
              <p className="text-lg mb-4">No fields added yet</p>
              <p className="text-sm">
                Click the <code>Add Field</code> button to start building your
                form
              </p>
            </div>
          ) : (
            formFields.map((field) => (
              <div
                key={field.id}
                className="p-3 rounded-lg relative group border shadow-sm"
              >
                <button
                  onClick={() => removeField(field.id)}
                  className="absolute top-4 right-4 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove field"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {renderField(field, updateField)}
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => setShowOptions(true)}
          className="text-white px-4 py-2 rounded-md shadow"
        >
          Add Field
        </button>
        {showOptions && (
          <div className="rounded-lg shadow-xl border p-4 w-64">
            <h3 className="font-semibold mb-3">Choose Field Type</h3>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {fieldOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => addField(opt)}
                  className="w-full text-left px-3 py-2 rounded-md transition-colors duration-150"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowOptions(false)}
              className="mt-3 w-full text-center px-3 py-2 text-sm hover:opacity-80"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
