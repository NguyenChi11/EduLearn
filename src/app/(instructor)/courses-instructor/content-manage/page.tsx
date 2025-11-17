"use client";

import { useMemo } from "react";

import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";

export default function InstructorContentManagePage() {
  const { instructor } = useInstructor();

  const courses = useMemo(
    () => getInstructorCourses(instructor?.id),
    [instructor]
  );
  const firstCourse = courses[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Quản lý nội dung học
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Thiết kế cấu trúc chương, bài học, tài liệu và video cho các khóa
            học của bạn.
          </Typography>
        </header>

        {!firstCourse ? (
          <SectionBox title="Không có khóa học">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Bạn chưa có khóa học nào để cấu hình nội dung. Hãy tạo khóa học ở
              mục <b>Quản lý khóa học</b> trước.
            </p>
          </SectionBox>
        ) : (
          <SectionBox title={`Cấu trúc nội dung · ${firstCourse.title}`}>
            <div className="space-y-4">
              {firstCourse.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      Thứ tự #{lesson.order} · {lesson.duration} phút
                    </p>
                  </div>
                  <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
                    Chỉnh sửa
                  </button>
                </div>
              ))}
            </div>
          </SectionBox>
        )}
      </div>
    </div>
  );
}

