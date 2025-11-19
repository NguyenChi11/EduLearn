import { BarChart3, Users } from "lucide-react";

import SectionBox from "@/components/ui/SectionBox";
import type { Course } from "@/types/course-type";
import { buildCourseAnalytics } from "@/utils/instructor-analytics-utils";

type InstructorCoursesAnalyticsSectionProps = {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
};

export default function InstructorCoursesAnalyticsSection({
  courses,
  onSelectCourse,
}: InstructorCoursesAnalyticsSectionProps) {
  return (
    <SectionBox title="Danh sách khóa học & thống kê chi tiết">
      {courses.length === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Hiện tại bạn chưa có khóa học nào trong hệ thống. Hãy tạo khóa học ở
          mục &quot;Danh sách khóa học&quot; trước.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const analytics = buildCourseAnalytics(course);

            return (
              <button
                key={course.id}
                type="button"
                onClick={() => onSelectCourse(course.id)}
                className="flex flex-col items-start rounded-xl border border-slate-200 bg-white/90 p-4 text-left text-xs shadow-sm transition hover:border-sky-400 hover:bg-sky-50/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-sky-500/70 dark:hover:bg-slate-900"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {course.category ?? "Khóa học"}
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {course.title}
                </p>
                <p className="mt-2 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                  {course.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>
                    {course.lessons?.length ?? 0} bài học ·{" "}
                    {course.level || "N/A"}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    <Users className="mr-1 h-3 w-3" />
                    {analytics.totalStudents} HV
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <BarChart3 className="mr-1 h-3 w-3" />
                    {analytics.completedPercent}% hoàn thành
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </SectionBox>
  );
}
