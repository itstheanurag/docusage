interface EmailFieldProps {
  label: string;
  onChangeLabel?: (newLabel: string) => void;
}

export default function EmailField({ label, onChangeLabel }: EmailFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full mb-2 border-b focus:outline-none"
        placeholder="Email label"
      />
      <input type="email" className="w-full border rounded px-3 py-2" disabled />
    </div>
  );
}
