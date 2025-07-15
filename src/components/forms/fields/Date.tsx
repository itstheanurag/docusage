interface DateFieldProps {
  label: string;
  onChangeLabel?: (newLabel: string) => void;
}

export default function DateField({ label, onChangeLabel }: DateFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full mb-2 border-b focus:outline-none"
        placeholder="Date field label"
      />
      <input type="date" className="w-full border rounded px-3 py-2" disabled />
    </div>
  );
}
