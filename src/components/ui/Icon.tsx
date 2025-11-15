// components/ui/Icon.tsx
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  icon: LucideIcon;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Icon({
  icon: LucideIcon,
  size = "md",
  className = "",
}: IconProps) {
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  return <LucideIcon className={cn(sizes[size], className)} />;
}
