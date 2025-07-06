import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { Label } from "../ui/label";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput = ({ label, id, className, ...props }: FormInputProps) => {
  return (
    <div>
      <Label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
      </Label>
      <Input id={id} className={`mt-1 ${className ?? ""}`} {...props} />
    </div>
  );
};

export default FormInput;
