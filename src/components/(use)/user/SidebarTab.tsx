import React from "react";

import { cn } from "@/lib/utils";

interface SidebarTabProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

export default function SidebarTab({
  icon: Icon,
  label,
  active,
  onClick,
  className,
}: SidebarTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            "h-4 w-4 shrink-0",
            active
              ? "text-accent-foreground"
              : "text-muted-foreground group-hover:text-accent-foreground"
          )}
        />
      ) : null}
      <span className="truncate">{label}</span>
    </button>
  );
}
