interface DateTimeFieldProps {
  label: string;
  onChangeLabel?: (newLabel: string) => void;
}

export default function DateTimeField({ label, onChangeLabel }: DateTimeFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full mb-2 border-b focus:outline-none"
        placeholder="Date & Time label"
      />
      <input type="datetime-local" className="w-full border rounded px-3 py-2" disabled />
    </div>
  );
}
