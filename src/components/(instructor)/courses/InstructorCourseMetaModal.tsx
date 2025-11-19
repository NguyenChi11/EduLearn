import React from "react";
import Typography from "@/components/ui/Typography";
import type { Course } from "@/types/course-type";
import { CategoryMetaSection } from "./meta-modal/CategoryMetaSection";
import { CourseMetaSection } from "./meta-modal/CourseMetaSection";
import { LevelMetaSection } from "./meta-modal/LevelMetaSection";

export interface CourseFormShape {
  title: string;
  description: string;
  category: string;
  level: string | "";
}

interface InstructorCourseMetaModalProps {
  activeMetaTab: "category" | "course" | "level" | null;
  show: boolean;
  onClose: () => void;

  // Category meta
  courseCategories: string[];
  categoryInput: string;
  editingCategory: string | null;
  onCategoryInputChange: (value: string) => void;
  onSaveCategory: () => void;
  onStartEditCategory: (name: string) => void;
  onDeleteCategory: (name: string) => void;

  // Level meta
  levelsMeta: string[];
  levelInput: string;
  editingLevel: string | null;
  onLevelInputChange: (value: string) => void;
  onSaveLevel: () => void;
  onStartEditLevel: (name: string) => void;
  onDeleteLevel: (name: string) => void;

  // Course meta
  courses: Course[];
  courseForm: CourseFormShape;
  editingCourseId: string | null;
  onCourseFormChange: (
    key: "title" | "description" | "category" | "level",
    value: string
  ) => void;
  onSaveCourse: () => void;
  onStartEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
}

export default function InstructorCourseMetaModal(
  props: InstructorCourseMetaModalProps
) {
  const {
    activeMetaTab,
    show,
    onClose,
    courseCategories,
    categoryInput,
    editingCategory,
    onCategoryInputChange,
    onSaveCategory,
    onStartEditCategory,
    onDeleteCategory,
    levelsMeta,
    levelInput,
    editingLevel,
    onLevelInputChange,
    onSaveLevel,
    onStartEditLevel,
    onDeleteLevel,
    courses,
    courseForm,
    editingCourseId,
    onCourseFormChange,
    onSaveCourse,
    onStartEditCourse,
    onDeleteCourse,
  } = props;

  if (!show || !activeMetaTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm m-0">
      <div className="m-0 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="space-y-1">
            <Typography variant="h3" as="h2">
              {activeMetaTab === "category"
                ? "Danh mục khóa học"
                : activeMetaTab === "course"
                ? editingCourseId
                  ? "Chỉnh sửa khóa học"
                  : "Thêm khóa học mới"
                : "Mức độ khóa học"}
            </Typography>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeMetaTab === "category" &&
                "Thêm, sửa hoặc xóa danh mục khóa học. Mỗi danh mục có thể chứa nhiều khóa học."}
              {activeMetaTab === "course" &&
                "Thêm khóa học mới hoặc chỉnh sửa / xóa các khóa học hiện có. Mỗi khóa học gắn với một danh mục và mức độ."}
              {activeMetaTab === "level" &&
                "Quản lý các mức độ (S, Pres, TC, MTC, ...) dùng để phân loại độ khó khóa học."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 md:px-6 md:py-5 text-xs">
          {activeMetaTab === "category" && (
            <CategoryMetaSection
              courseCategories={courseCategories}
              categoryInput={categoryInput}
              editingCategory={editingCategory}
              onCategoryInputChange={onCategoryInputChange}
              onSaveCategory={onSaveCategory}
              onStartEditCategory={onStartEditCategory}
              onDeleteCategory={onDeleteCategory}
            />
          )}

          {activeMetaTab === "course" && (
            <CourseMetaSection
              courseCategories={courseCategories}
              courses={courses}
              courseForm={courseForm}
              levelsMeta={levelsMeta}
              editingCourseId={editingCourseId}
              onCourseFormChange={onCourseFormChange}
              onSaveCourse={onSaveCourse}
              onClose={onClose}
              onStartEditCourse={onStartEditCourse}
              onDeleteCourse={onDeleteCourse}
            />
          )}

          {activeMetaTab === "level" && (
            <LevelMetaSection
              levelsMeta={levelsMeta}
              levelInput={levelInput}
              editingLevel={editingLevel}
              onLevelInputChange={onLevelInputChange}
              onSaveLevel={onSaveLevel}
              onStartEditLevel={onStartEditLevel}
              onDeleteLevel={onDeleteLevel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
