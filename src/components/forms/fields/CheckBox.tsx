interface CheckboxFieldProps {
  label: string;
  options: string[];
  name: string;
}

export default function CheckboxField({ label, options, name }: CheckboxFieldProps) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-1">
          <input type="checkbox" name={name} />
          <span>{opt}</span>
        </div>
      ))}
    </div>
  );
}