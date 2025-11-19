import { BookOpen, Users } from "lucide-react";

import SectionBox from "@/components/ui/SectionBox";

type InstructorAnalyticsOverviewSectionProps = {
  totalStudentsAllCourses: number;
  totalCourses: number;
};

export default function InstructorAnalyticsOverviewSection({
  totalStudentsAllCourses,
  totalCourses,
}: InstructorAnalyticsOverviewSectionProps) {
  return (
    <SectionBox title="Tổng quan (demo)">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Tổng số học viên
            </p>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {totalStudentsAllCourses || "—"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Số học viên trên tất cả các khóa (dữ liệu demo từ danh sách khóa).
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Số khóa học
            </p>
            <BookOpen className="h-4 w-4 text-indigo-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {totalCourses}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Tổng số khóa mà bạn đang phụ trách (demo).
          </p>
        </div>
      </div>
    </SectionBox>
  );
}
