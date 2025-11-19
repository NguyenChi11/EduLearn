import { BarChart2, Clock, LineChart } from "lucide-react";

import Card from "@/components/ui/Card";
import type {
  CoursesProgressOverviewType,
  CoursesProgressSummary,
} from "@/types/courses-progress-type";
import { formatMinutes } from "@/utils/time-utils";

interface CoursesProgressStatsProps {
  summary: CoursesProgressSummary;
  onOpenOverview: (type: CoursesProgressOverviewType) => void;
}

export default function CoursesProgressStats({
  summary,
  onOpenOverview,
}: CoursesProgressStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-none bg-transparent p-0 shadow-none">
        <button
          type="button"
          onClick={() => onOpenOverview("enrolled")}
          className="group flex h-full w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50/70 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90 dark:hover:border-blue-400/80 dark:hover:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Khóa đã ghi danh
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/40 dark:text-blue-300 dark:group-hover:bg-blue-500">
              <BarChart2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {summary.enrolledCourses}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Số khóa học bạn đã bắt đầu
          </span>
        </button>
      </Card>

      <Card className="border-none bg-transparent p-0 shadow-none">
        <button
          type="button"
          onClick={() => onOpenOverview("lessons")}
          className="group flex h-full w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50/70 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90 dark:hover:border-emerald-400/80 dark:hover:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Bài học hoàn thành
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-900/40 dark:text-emerald-300 dark:group-hover:bg-emerald-500">
              <LineChart className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {summary.totalCompletedLessons}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Tổng số bài học bạn đã hoàn thành
          </span>
        </button>
      </Card>

      <Card className="border-none bg-transparent p-0 shadow-none">
        <button
          type="button"
          onClick={() => onOpenOverview("time")}
          className="group flex h-full w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-purple-500 hover:bg-purple-50/70 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90 dark:hover:border-purple-400/80 dark:hover:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Thời lượng học
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-900/40 dark:text-purple-300 dark:group-hover:bg-purple-500">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
            {formatMinutes(summary.totalMinutes)}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Ước tính dựa trên thời lượng của các bài học đã hoàn thành
          </span>
        </button>
      </Card>

      <Card className="border-none bg-transparent p-0 shadow-none">
        <button
          type="button"
          onClick={() => onOpenOverview("progress")}
          className="group flex h-full w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-amber-500 hover:bg-amber-50/70 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90 dark:hover:border-amber-400/80 dark:hover:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Tiến độ trung bình
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white dark:bg-amber-900/40 dark:text-amber-300 dark:group-hover:bg-amber-500">
              <BarChart2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {summary.averageProgress}%
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Trung bình trên các khóa bạn đã ghi danh
          </span>
        </button>
      </Card>
    </div>
  );
}
