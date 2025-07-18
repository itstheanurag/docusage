interface RadioFieldProps {
  label: string;
  options: string[];
  name: string;
  onChangeLabel?: (newLabel: string) => void;
  onChangeOption?: (index: number, newValue: string) => void;
  onAddOption?: () => void;
  onRemoveOption?: (index: number) => void;
}

export default function RadioField({
  label,
  options,
  name,
  onChangeLabel,
  onChangeOption,
  onAddOption,
  onRemoveOption,
}: RadioFieldProps) {
  return (
    <div>
      {/* Editable Label */}
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="block mb-2 font-medium text-sm border-b focus:outline-none w-full"
      />

      {/* Option Fields */}
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-2">
          <input type="radio" name={name} disabled />
          <input
            value={opt}
            onChange={(e) => onChangeOption?.(idx, e.target.value)}
            className="border-b focus:outline-none text-sm"
          />
          {onRemoveOption && (
            <button
              type="button"
              onClick={() => onRemoveOption(idx)}
              className="text-red-500 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {/* Add Option Button */}
      {onAddOption && (
        <button
          type="button"
          onClick={onAddOption}
          className="text-blue-500 text-xs mt-2"
        >
          + Add Option
        </button>
      )}
    </div>
  );
}
