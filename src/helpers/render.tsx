// FieldRenderer.tsx
import CheckboxField from "@/components/forms/fields/CheckBox";
import DateField from "@/components/forms/fields/Date";
import DateTimeField from "@/components/forms/fields/DateTimeField";
import EmailField from "@/components/forms/fields/EmailFeild";
import HeadingField from "@/components/forms/fields/FormHeading";
import InputField from "@/components/forms/fields/FormInput";
import MultiSelectField from "@/components/forms/fields/MultiSelect";
import NumberField from "@/components/forms/fields/NumberField";
import ParagraphField from "@/components/forms/fields/Paragraph";
import PhoneField from "@/components/forms/fields/PhoneField";
import RadioField from "@/components/forms/fields/RadioField";
import SelectField from "@/components/forms/fields/SelectField";
import SignatureField from "@/components/forms/fields/Signature";
import TimeField from "@/components/forms/fields/TimeField";
import { FormField } from "@/types/form";

type UpdateFieldFn = (id: string, newValues: Partial<FormField>) => void;

export function renderField(field: FormField, updateField: UpdateFieldFn) {
  switch (field.type) {
    case 'paragraph':
    case 'textarea':
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
    case 'checkbox': {
      const FieldComponent = field.type === 'radio' ? RadioField : CheckboxField;
      return (
        <FieldComponent
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
    }

    case 'signature':
      return <SignatureField label={field.label || ''} />;

    case 'select':
    case 'multi-select': {
      const FieldComponent = field.type === 'select' ? SelectField : MultiSelectField;
      return (
        <FieldComponent
          label={field.label || ''}
          options={field.options || ['Option 1', 'Option 2']}
          onChangeLabel={(newLabel) => updateField(field.id, { label: newLabel })}
        />
      );
    }

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

    default:
      return null;
  }
}
