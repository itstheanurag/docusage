interface SelectFieldProps {
  label: string;
  options: string[];
  onChangeLabel?: (newLabel: string) => void;
}

export default function SelectField({ label, options, onChangeLabel }: SelectFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full mb-2 border-b focus:outline-none"
        placeholder="Select label"
      />
      <select className="w-full border rounded px-3 py-2" disabled>
        {options.map((opt, idx) => (
          <option key={idx}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
