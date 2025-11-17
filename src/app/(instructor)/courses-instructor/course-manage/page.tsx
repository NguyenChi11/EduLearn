"use client";

import { useMemo } from "react";

import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";

export default function InstructorCourseManagePage() {
  const { instructor } = useInstructor();

  const courses = useMemo(
    () => getInstructorCourses(instructor?.id),
    [instructor]
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Quản lý khóa học
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Từ đây bạn có thể cấu hình, cập nhật thông tin và chuẩn bị nội dung
            cho từng khóa học.
          </Typography>
        </header>

        <SectionBox title="Khóa học đang phụ trách">
          {courses.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Bạn chưa có khóa học nào. Hãy thiết kế luồng tạo khóa học mới tại
              đây (form tạo khóa học, chọn chủ đề, cấp độ, mô tả, v.v).
            </p>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {course.category} · Cấp độ {course.level}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
                      Chỉnh sửa thông tin
                    </button>
                    <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
                      Quản lý nội dung học
                    </button>
                    <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
                      Xem học viên
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionBox>
      </div>
    </div>
  );
}

