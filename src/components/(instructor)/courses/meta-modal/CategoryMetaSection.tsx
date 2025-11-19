import React from "react";

interface CategoryMetaSectionProps {
  courseCategories: string[];
  categoryInput: string;
  editingCategory: string | null;
  onCategoryInputChange: (value: string) => void;
  onSaveCategory: () => void;
  onStartEditCategory: (name: string) => void;
  onDeleteCategory: (name: string) => void;
}

export function CategoryMetaSection({
  courseCategories,
  categoryInput,
  editingCategory,
  onCategoryInputChange,
  onSaveCategory,
  onStartEditCategory,
  onDeleteCategory,
}: CategoryMetaSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/40 md:flex-row md:items-end">
        <div className="flex-1 space-y-1">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </label>
          <input
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="VD: Luyện thi, Giao tiếp, Nền tảng..."
            value={categoryInput}
            onChange={(e) => onCategoryInputChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSaveCategory}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {editingCategory ? "Lưu danh mục" : "Thêm danh mục"}
          </button>
          {editingCategory && (
            <button
              type="button"
              onClick={() => onCategoryInputChange("")}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      {courseCategories.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Chưa có danh mục nào. Hãy thêm danh mục để gán cho các khóa học.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/40">
          {courseCategories.map((cat) => (
            <div
              key={cat}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="font-medium text-slate-700 dark:text-slate-100">
                {cat}
              </span>
              <button
                type="button"
                onClick={() => onStartEditCategory(cat)}
                className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
              >
                Sửa
              </button>
              <button
                type="button"
                onClick={() => onDeleteCategory(cat)}
                className="text-[11px] text-red-600 hover:underline dark:text-red-400"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
