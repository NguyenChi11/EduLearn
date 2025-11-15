import React from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // tailwind color nếu muốn
}

export default function Tag({ children, className = "", color }: TagProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 text-sm rounded-full",
        color ? color : "bg-blue-600 text-white", // mặc định xanh
        className
      )}
    >
      {children}
    </span>
  );
}
