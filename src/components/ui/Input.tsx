// components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
  rightButton?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, icon: Icon, rightButton, className = "", ...props },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          )}
          <input
            ref={ref}
            {...props}
            className={cn(
              "w-full rounded-lg border bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
              Icon ? "pl-10" : "pl-4",
              rightButton ? "pr-10" : "pr-4",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300 dark:border-slate-600",
              className
            )}
          />
          {rightButton && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightButton}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {hint && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
