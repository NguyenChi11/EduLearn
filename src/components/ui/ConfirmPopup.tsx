import React from "react";
import { cn } from "@/lib/utils";

interface ConfirmPopupProps {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
}

export default function ConfirmPopup({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Xác nhận",
  cancelText = "Huỷ",
  className = "",
}: ConfirmPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={cn(
          "bg-white dark:bg-slate-900 shadow-xl rounded-lg p-6 w-[90vw] max-w-sm",
          className
        )}
      >
        <h2 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mb-4 text-slate-700 dark:text-slate-300 text-sm">
            {description}
          </p>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 min-w-[64px]"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold min-w-[64px]"
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
