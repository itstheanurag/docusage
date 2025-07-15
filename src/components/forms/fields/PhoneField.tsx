interface PhoneFieldProps {
  label: string;
  onChangeLabel?: (newLabel: string) => void;
}

export default function PhoneField({ label, onChangeLabel }: PhoneFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full mb-2 border-b focus:outline-none"
        placeholder="Phone label"
      />
      <input type="tel" className="w-full border rounded px-3 py-2" disabled />
    </div>
  );
}
