'use client'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CheckboxField from './fields/CheckBox';
import HeadingField from './fields/FormHeading';
import InputField from './fields/FormInput';
import ParagraphField from './fields/Paragraph';
import RadioField from './fields/RadioField';
import SignatureField from './fields/Signature';
import DateField from './fields/Date';
import DateTimeField from './fields/DateTimeField';
import EmailField from './fields/EmailFeild';
import MultiSelectField from './fields/MultiSelect';
import NumberField from './fields/NumberField';
import PhoneField from './fields/PhoneField';
import SelectField from './fields/SelectField';
import TimeField from './fields/TimeField';

const fieldOptions = [
  { label: 'Paragraph', type: 'paragraph' },
  { label: 'Heading 1', type: 'heading', level: 1 },
  { label: 'Heading 2', type: 'heading', level: 2 },
  { label: 'Heading 3', type: 'heading', level: 3 },
  { label: 'Input Field', type: 'input' },
  { label: 'Textarea', type: 'textarea' },
  { label: 'Select Dropdown', type: 'select' },
  { label: 'Multi-select', type: 'multi-select' },
  { label: 'Date Picker', type: 'date' },
  { label: 'Time Picker', type: 'time' },
  { label: 'Date & Time Picker', type: 'datetime' },
  { label: 'Number Input', type: 'number' },
  { label: 'Email Field', type: 'email' },
  { label: 'Phone Number Field', type: 'phone' },
  { label: 'Radio Group', type: 'radio' },
  { label: 'Checkbox Group', type: 'checkbox' },
  { label: 'Signature', type: 'signature' },
];


interface FormField {
  id: string;
  type: string;
  headingLevel?: number;
  label?: string;
  options?: string[];
  content?: string;
}

export default function FormBuilder() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const addField = (option: typeof fieldOptions[0]) => {
    // console.log("Adding Options", option)
    setFormFields((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: option.type,
        headingLevel: option.level || undefined,
        label: option.type !== 'paragraph' ? `${option.label} Label` : undefined,
        content: option.type === 'paragraph' ? '' : undefined,
        options: option.type === 'radio' || option.type === 'checkbox' ? [
          'Option 1',
          'Option 2',
        ] : undefined,
      },
    ]);
    setShowOptions(false);
  };

  const removeField = (fieldId: string) => {
    setFormFields((prev) => prev.filter(field => field.id !== fieldId));
  };

  const updateField = (id: string, newValues: Partial<FormField>) => {
    setFormFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, ...newValues } : field
      )
    );
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'paragraph':
        return (
          <ParagraphField
            content={field.content || ''}
            onChangeContent={(newContent) => updateField(field.id, { content: newContent })}
          />
        );

      case 'heading':
        return (
          <HeadingField
            label={field.label || ''}
            level={field.headingLevel || 1}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'input':
        return (
          <InputField
            label={field.label || ''}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'radio':
        return (
          <RadioField
            label={field.label || ''}
            options={field.options || []}
            name={field.id}
            onChangeLabel={(newLabel) =>
              updateField(field.id, { label: newLabel })
            }
            onChangeOption={(index, newValue) => {
              const updatedOptions = [...(field.options || [])];
              updatedOptions[index] = newValue;
              updateField(field.id, { options: updatedOptions });
            }}
            onAddOption={() => {
              const updatedOptions = [...(field.options || []), ''];
              updateField(field.id, { options: updatedOptions });
            }}
            onRemoveOption={(index) => {
              const updatedOptions = [...(field.options || [])];
              updatedOptions.splice(index, 1);
              updateField(field.id, { options: updatedOptions });
            }}
          />
        );

      case 'checkbox':
        return (
          <CheckboxField
            label={field.label || ''}
            options={field.options || []}
            name={field.id}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
            onChangeOption={(index, newValue) => {
              const updatedOptions = [...(field.options || [])];
              updatedOptions[index] = newValue;
              updateField(field.id, { options: updatedOptions });
            }}
            onAddOption={() => {
              const updatedOptions = [...(field.options || []), ''];
              updateField(field.id, { options: updatedOptions });
            }}
            onRemoveOption={(index) => {
              const updatedOptions = [...(field.options || [])];
              updatedOptions.splice(index, 1);
              updateField(field.id, { options: updatedOptions });
            }}
          />
        );
      case 'signature':
        return <SignatureField label={field.label || ''} />;
      case 'select':
        return (
          <SelectField
            label={field.label || ''}
            options={field.options || ['Option 1', 'Option 2']}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'multi-select':
        return (
          <MultiSelectField
            label={field.label || ''}
            options={field.options || ['Option 1', 'Option 2']}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'date':
        return (
          <DateField
            label={field.label || ''}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'time':
        return (
          <TimeField
            label={field.label || ''}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'datetime':
        return (
          <DateTimeField
            label={field.label || ''}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'number':
        return (
          <NumberField
            label={field.label || ''}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'email':
        return (
          <EmailField
            label={field.label || ''}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'phone':
        return (
          <PhoneField
            label={field.label || ''}
            onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
          />
        );

      case 'textarea':
        return (
          <ParagraphField
            content={field.content || ''}
            onChangeContent={(newContent) => updateField(field.id, { content: newContent })}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Form Builder</h1>

        <div className="space-y-6 mb-20">
          {formFields.length === 0 ? (
            <div className="text-center py-12 rounded-lg shadow-sm border-2 border-dashed">
              <p className="text-lg mb-4">No fields added yet</p>
              <p className="text-sm">Click the `Add Field` button to start building your form</p>
            </div>
          ) : (
            formFields.map((field) => (
              <div key={field.id} className="p-3 rounded-lg relative group">
                <button
                  onClick={() => removeField(field.id)}
                  className="absolute top-4 right-4 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove field"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {renderField(field)}
              </div>
            ))
          )}
        </div>

        <div className="fixed bottom-20 right-12 z-10">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="px-6 py-3 rounded-full shadow-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Field
          </button>

          {showOptions && (
            <div className="absolute bottom-16 right-0 rounded-lg shadow-xl border p-4 w-64 z-20">
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
    </div>
  );
}
