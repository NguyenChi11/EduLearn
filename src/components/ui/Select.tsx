"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import Label from "@/components/ui/Label";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  id?: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  className?: string;
}

export default function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Chọn một giá trị",
  hint,
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white",
            open && "ring-2 ring-blue-500 border-blue-500"
          )}
        >
          <span
            className={cn(
              "truncate text-left",
              !selectedOption && "text-slate-400 dark:text-slate-500"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 text-slate-500" />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-left text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800",
                    isSelected && "bg-slate-100 font-medium dark:bg-slate-800"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
            {options.length === 0 && (
              <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                Không có lựa chọn
              </div>
            )}
          </div>
        )}
      </div>
      {hint && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      )}
    </div>
  );
}
