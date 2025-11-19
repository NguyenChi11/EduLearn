import React from "react";
import type { CourseFormShape } from "./CourseMetaSection";

interface CourseMetaFormProps {
  courseCategories: string[];
  levelsMeta: string[];
  courseForm: CourseFormShape;
  editingCourseId: string | null;
  onCourseFormChange: (
    key: "title" | "description" | "category" | "level",
    value: string
  ) => void;
  onSaveCourse: () => void;
  onClose: () => void;
}

export function CourseMetaForm({
  courseCategories,
  levelsMeta,
  courseForm,
  editingCourseId,
  onCourseFormChange,
  onSaveCourse,
  onClose,
}: CourseMetaFormProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
          Tên khóa học
        </label>
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          placeholder="VD: Luyện thi IELTS 7.0+"
          value={courseForm.title}
          onChange={(e) => onCourseFormChange("title", e.target.value)}
        />
        <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
          Mô tả ngắn
        </label>
        <textarea
          className="min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          placeholder="Mô tả ngắn gọn nội dung khóa học..."
          value={courseForm.description}
          onChange={(e) => onCourseFormChange("description", e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Danh mục khóa học
          </label>
          <select
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            value={courseForm.category}
            onChange={(e) => onCourseFormChange("category", e.target.value)}
          >
            <option value="">Chưa chọn danh mục</option>
            {courseCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Mức độ khóa học
          </label>
          <select
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            value={courseForm.level || "S"}
            onChange={(e) => onCourseFormChange("level", e.target.value)}
          >
            {levelsMeta.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSaveCourse}
            disabled={!courseForm.title.trim()}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {editingCourseId ? "Lưu thay đổi khóa học" : "Thêm khóa học"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
