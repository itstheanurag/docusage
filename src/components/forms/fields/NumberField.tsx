interface NumberFieldProps {
  label: string;
  onChangeLabel?: (newLabel: string) => void;
}

export default function NumberField({ label, onChangeLabel }: NumberFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full mb-2 border-b focus:outline-none"
        placeholder="Number field label"
      />
      <input type="number" className="w-full border rounded px-3 py-2" disabled />
    </div>
  );
}
