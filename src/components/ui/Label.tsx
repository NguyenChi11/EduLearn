import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className="block text-sm font-medium text-slate-900 dark:text-white mb-2"
    >
      {children}
    </label>
  );
}
