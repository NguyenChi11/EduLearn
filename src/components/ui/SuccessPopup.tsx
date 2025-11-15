import React from "react";
import { cn } from "@/lib/utils";

interface SuccessPopupProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  className?: string;
}

export default function SuccessPopup({ open, title, description, onClose, className = "" }: SuccessPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className={cn("bg-white dark:bg-slate-900 shadow-xl rounded-lg p-6 w-[90vw] max-w-sm text-center", className)}>
        <div className="flex justify-center mb-3">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#dcfce7"/>
            <path d="M8 12l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-lg font-bold mb-2 text-green-600 dark:text-green-400">{title}</h2>
        {description && (
          <p className="mb-4 text-slate-700 dark:text-slate-300 text-sm">{description}</p>
        )}
        <button
          className="px-5 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold mt-2 min-w-[80px]"
          onClick={onClose}
          type="button"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
