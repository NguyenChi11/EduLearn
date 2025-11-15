import { ArrowLeft } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export default function BackButton({
  onClick,
  children = "Quay lại",
  className = "",
  icon,
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4",
        className
      )}
      type="button"
    >
      {icon || <ArrowLeft className="w-4 h-4" />} {children}
    </button>
  );
}
