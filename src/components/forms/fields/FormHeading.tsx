interface HeadingFieldProps {
  label: string;
  level: number;
  onChangeLabel?: (newLabel: string) => void;
}

export default function HeadingField({ label,  onChangeLabel }: HeadingFieldProps) {

  return (
    <div>
      <input
        value={label}
        onChange={(e) => onChangeLabel?.(e.target.value)}
        className="w-full font-bold text-lg border-b mb-2 focus:outline-none"
      />
    </div>
  );
}
