import { Plus, X } from "lucide-react";

interface CheckboxFieldProps {
  label: string;
  options: string[];
  name: string;
  onChangeLabel: (newLabel: string) => void;
  onChangeOption: (index: number, newValue: string) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
}

export default function CheckboxField({
  label,
  options,
  name,
  onChangeLabel,
  onChangeOption,
  onAddOption,
  onRemoveOption,
}: CheckboxFieldProps) {
  return (
    <div className="mb-4">
      {/* Editable Label/Header */}
      <input
        type="text"
        value={label}
        onChange={(e) => onChangeLabel(e.target.value)}
        className="block w-full mb-2 p-2 focus:outline-none focus:ring-0"
        placeholder="Checkbox group label"
      />

      {/* Editable Options */}
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-2">
          <input type="checkbox" name={name} className="focus:outline-none focus:ring-0" />
          <input
            type="text"
            value={opt}
            onChange={(e) => onChangeOption(idx, e.target.value)}
            className="px-2 py-1 flex-1 focus:outline-none focus:ring-0"
            placeholder={`Option ${idx + 1}`}
          />
          <button
            type="button"
            onClick={() => onRemoveOption(idx)}
            className="p-1 px-4 hover:text-red-500 focus:outline-none focus:ring-0"
            aria-label="Remove option"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {/* Add Option Button */}
      <button
        type="button"
        onClick={onAddOption}
        className="flex items-center gap-1 text-sm hover:underline mt-2 focus:outline-none focus:ring-0"
      >
        <Plus className="w-4 h-4" />
        Add Option
      </button>
    </div>
  );
}
