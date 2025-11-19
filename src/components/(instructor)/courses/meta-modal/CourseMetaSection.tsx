import type { Course } from "@/types/course-type";
import React from "react";
import { CourseListItem } from "./CourseListItem";
import { CourseMetaForm } from "./CourseMetaForm";

export interface CourseFormShape {
  title: string;
  description: string;
  category: string;
  level: string | "";
}

interface CourseMetaSectionProps {
  courseCategories: string[];
  courses: Course[];
  courseForm: CourseFormShape;
  levelsMeta: string[];
  editingCourseId: string | null;
  onCourseFormChange: (
    key: "title" | "description" | "category" | "level",
    value: string
  ) => void;
  onSaveCourse: () => void;
  onClose: () => void;
  onStartEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
}

export function CourseMetaSection({
  courseCategories,
  courses,
  courseForm,
  levelsMeta,
  editingCourseId,
  onCourseFormChange,
  onSaveCourse,
  onClose,
  onStartEditCourse,
  onDeleteCourse,
}: CourseMetaSectionProps) {
  return (
    <div className="space-y-4">
      <CourseMetaForm
        courseCategories={courseCategories}
        levelsMeta={levelsMeta}
        courseForm={courseForm}
        editingCourseId={editingCourseId}
        onCourseFormChange={onCourseFormChange}
        onSaveCourse={onSaveCourse}
        onClose={onClose}
      />

      <div className="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          Danh sách khóa học hiện có
        </p>
        {courses.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Chưa có khóa học nào. Hãy thêm khóa học đầu tiên của bạn.
          </p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {courses.map((course) => (
              <CourseListItem
                key={course.id}
                course={course}
                onStartEditCourse={onStartEditCourse}
                onDeleteCourse={onDeleteCourse}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
