// components/ui/Typography.tsx
import { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "p" | "small";
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Typography({
  variant = "p",
  children,
  className = "",
  as: Component = "p",
}: TypographyProps) {
  const variants = {
    h1: "text-5xl md:text-6xl font-bold text-slate-900 dark:text-white",
    h2: "text-3xl md:text-4xl font-bold text-slate-900 dark:text-white",
    h3: "text-xl font-semibold text-slate-800 dark:text-slate-100",
    p: "text-base text-slate-600 dark:text-slate-300",
    small: "text-sm text-slate-500 dark:text-slate-400",
  };

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
}
