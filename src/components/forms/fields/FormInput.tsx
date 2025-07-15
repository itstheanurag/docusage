interface InputFieldProps {
  label: string;
  onChangeLabel?: (newLabel: string) => void;
}

export default function InputField({ label, onChangeLabel }: InputFieldProps) {
  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="block mb-2 font-medium text-sm border-b focus:outline-none w-full"
      />
      <input
        type="text"
        className="w-full border rounded px-3 py-2 text-sm"
        disabled
        placeholder="User input..."
      />
    </div>
  );
}
