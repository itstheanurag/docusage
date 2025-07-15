interface MultiSelectFieldProps {
  label: string;
  options: string[];
  onChangeLabel?: (newLabel: string) => void;
}

export default function MultiSelectField({ label, options, onChangeLabel }: MultiSelectFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full mb-2 border-b focus:outline-none"
        placeholder="Multi-select label"
      />
      <select multiple className="w-full border rounded px-3 py-2" disabled>
        {options.map((opt, idx) => (
          <option key={idx}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
