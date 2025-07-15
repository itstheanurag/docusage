interface TimeFieldProps {
  label: string;
  onChangeLabel?: (newLabel: string) => void;
}

export default function TimeField({ label, onChangeLabel }: TimeFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full mb-2 border-b focus:outline-none"
        placeholder="Time field label"
      />
      <input type="time" className="w-full border rounded px-3 py-2" disabled />
    </div>
  );
}
