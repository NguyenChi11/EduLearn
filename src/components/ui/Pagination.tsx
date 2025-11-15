import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (p: number) => void;
  className?: string;
}

export default function Pagination({
  page,
  pageCount,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (pageCount <= 1) return null;
  return (
    <div className={cn("flex justify-center gap-2 mt-8", className)}>
      {/* Nút trái */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={cn(
          "w-14 h-10 rounded-lg border font-medium transition",
          page <= 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-slate-100 dark:hover:bg-slate-800"
        )}
      >
        Trước
      </button>
      {/* Các nút số */}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={cn(
            "w-10 h-10 rounded-lg border transition",
            p === page
              ? "bg-blue-600 text-white"
              : "hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
        >
          {p}
        </button>
      ))}
      {/* Nút phải */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className={cn(
          "w-14 h-10 rounded-lg border font-medium transition",
          page >= pageCount
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-slate-100 dark:hover:bg-slate-800"
        )}
      >
        Sau
      </button>
    </div>
  );
}
