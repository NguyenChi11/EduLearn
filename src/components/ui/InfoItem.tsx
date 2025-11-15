import React from "react";
import { cn } from "@/lib/utils";

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  className?: string;
}

export default function InfoItem({ icon, label, value, className = "" }: InfoItemProps) {
  return (
    <div className={cn("flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400", className)}>
      {icon}
      <span>{label}</span>
      {value && <span>{value}</span>}
    </div>
  );
}
