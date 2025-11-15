import { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
};

export default function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={cn("block text-sm font-medium text-slate-900 dark:text-white mb-2", className)}
    >
      {children}
    </label>
  );
}
