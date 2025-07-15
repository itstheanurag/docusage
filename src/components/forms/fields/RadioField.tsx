interface RadioFieldProps {
  label: string;
  options: string[];
  name: string;
  onChangeLabel?: (newLabel: string) => void;
  onChangeOption?: (index: number, newValue: string) => void;
}

export default function RadioField({
  label,
  options,
  name,
  onChangeLabel,
  onChangeOption,
}: RadioFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="block mb-2 font-medium text-sm border-b focus:outline-none w-full"
      />

      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-2">
          <input type="radio" name={name} disabled />
          <input
            value={opt}
            onChange={(e) => onChangeOption?.(idx, e.target.value)}
            className="border-b focus:outline-none text-sm"
          />
        </div>
      ))}
    </div>
  );
}
