import React from "react";
import { cn } from "@/lib/utils";

interface SectionBoxProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  extra?: React.ReactNode;
}

export default function SectionBox({ children, className = "", title, extra }: SectionBoxProps) {
  return (
    <div className={cn("border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 mb-8", className)}>
      {(title || extra) && (
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
          {title && (
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-0">{title}</h3>
          )}
          {extra}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
