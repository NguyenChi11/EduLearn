import { useState } from "react";
import Input from "@/components/ui/Input";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function PasswordField({
  id,
  name,
  value,
  onChange,
  label,
  error,
  disabled,
  placeholder = "••••••••",
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <Input
      id={id}
      name={name}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      label={label}
      error={error}
      disabled={disabled}
      icon={Lock}
      rightButton={
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-slate-500 hover:text-slate-700"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}
