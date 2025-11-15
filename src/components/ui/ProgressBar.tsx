import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  height?: string;
  bg?: string;
}

export default function ProgressBar({ value, className = "", height = "h-3", bg = "bg-blue-600 dark:bg-blue-500" }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-slate-200 dark:bg-slate-800 rounded-full", height, className)}>
      <div
        className={cn(bg, "rounded-full transition-all", height)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
