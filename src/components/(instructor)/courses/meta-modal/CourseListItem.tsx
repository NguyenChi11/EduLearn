import type { Course } from "@/types/course-type";
import React from "react";

interface CourseListItemProps {
  course: Course;
  onStartEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
}

export function CourseListItem({
  course,
  onStartEditCourse,
  onDeleteCourse,
}: CourseListItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-0.5">
        <p className="font-medium text-slate-800 dark:text-slate-100">
          {course.title}
        </p>
        <p className="text-[11px] text-slate-500">
          Danh mục: {course.category ?? "Chưa có danh mục"} · Mức độ:{" "}
          {course.level}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onStartEditCourse(course)}
          className="text-[11px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Sửa
        </button>
        <button
          type="button"
          onClick={() => onDeleteCourse(course.id)}
          className="text-[11px] font-medium text-red-600 hover:text-red-700 dark:text-red-400"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}
