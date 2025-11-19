import React from "react";
import SectionBox from "@/components/ui/SectionBox";

interface InstructorCourseToolbarProps {
  isCourseTabActive: boolean;
  onAddCourse: () => void;
}

export default function InstructorCourseToolbar({
  isCourseTabActive,
  onAddCourse,
}: InstructorCourseToolbarProps) {
  return (
    <SectionBox>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <button
            type="button"
            onClick={onAddCourse}
            className={`rounded-full px-4 py-1.5 font-semibold transition ${
              isCourseTabActive
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            Thêm khóa học
          </button>
        </div>
        <p className="max-w-md text-[11px] text-slate-500 dark:text-slate-400">
          Chức năng này chỉ là demo UI, dữ liệu được lưu tạm thời trên trình
          duyệt. Bạn có thể thêm, chỉnh sửa hoặc xóa khóa học giả lập tại đây.
        </p>
      </div>
    </SectionBox>
  );
}


