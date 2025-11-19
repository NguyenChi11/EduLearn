import { BarChart3, Star, Users } from "lucide-react";

import Typography from "@/components/ui/Typography";
import type { Course } from "@/types/course-type";
import type { CourseAnalytics } from "@/utils/instructor-analytics-utils";

type InstructorCourseAnalyticsModalProps = {
  course: Course;
  analytics: CourseAnalytics;
  onClose: () => void;
};

export default function InstructorCourseAnalyticsModal({
  course,
  analytics,
  onClose,
}: InstructorCourseAnalyticsModalProps) {
  return (
    <div className="m-0 fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      <div className="m-0 xsm:m-4 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="space-y-1">
            <Typography variant="h3" as="h2">
              Thống kê khóa học: {course.title}
            </Typography>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tổng quan số học viên và phân bố trạng thái học tập (dữ liệu demo
              tính toán từ thông tin khóa học).
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

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 text-xs md:px-6 md:py-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/60">
              <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <Users className="h-3.5 w-3.5 text-blue-500" />
                Tổng số học viên
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                {analytics.totalStudents}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/60">
              <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <BarChart3 className="h-3.5 w-3.5 text-emerald-500" />
                Hoàn thành / Đang học
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                {analytics.completedPercent}%{" "}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  hoàn thành
                </span>
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                {analytics.inProgressPercent}% đang học ·{" "}
                {analytics.notStartedPercent}% chưa bắt đầu
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/60">
              <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <Star className="h-3.5 w-3.5 text-yellow-400" />
                Đánh giá trung bình
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                {analytics.averageRating.toFixed(1)}
                <span className="ml-1 text-xs font-normal text-slate-500 dark:text-slate-400">
                  / 5.0
                </span>
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Giá trị demo được tính dựa trên thông tin khóa học.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Biểu đồ phân bố trạng thái học viên
              </p>

              {/* Donut chart (biểu đồ hình tròn) đơn giản bằng CSS */}
              <div className="mt-4 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center justify-center">
                  <div
                    className="relative h-40 w-40 rounded-full"
                    style={{
                      background: `conic-gradient(
                        rgba(16, 185, 129, 1) 0% ${analytics.completedPercent}%,
                        rgba(56, 189, 248, 1) ${analytics.completedPercent}% ${
                          analytics.completedPercent + analytics.inProgressPercent
                        }%,
                        rgba(148, 163, 184, 1) ${
                          analytics.completedPercent + analytics.inProgressPercent
                        }% 100%
                      )`,
                    }}
                  >
                    <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-950" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        Tổng học viên
                      </p>
                      <p className="text-lg font-bold text-slate-900 dark:text-slate-50">
                        {analytics.totalStudents}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-1 flex-col gap-2 text-[11px] text-slate-600 dark:text-slate-300 md:mt-0 md:pl-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="font-medium">Hoàn thành</span>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-slate-50">
                      {analytics.completedPercent}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-sky-500" />
                      <span className="font-medium">Đang học</span>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-slate-50">
                      {analytics.inProgressPercent}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-400" />
                      <span className="font-medium">Chưa học</span>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-slate-50">
                      {analytics.notStartedPercent}%
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
                Biểu đồ minh họa (demo), chưa kết nối dữ liệu thực tế.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Thông tin chi tiết khóa học
              </p>
              <div className="mt-3 space-y-2 text-[11px] text-slate-600 dark:text-slate-300">
                <p>
                  <span className="font-semibold">Danh mục:</span>{" "}
                  {course.category ?? "Chưa có danh mục"}
                </p>
                <p>
                  <span className="font-semibold">Mức độ:</span> {course.level}
                </p>
                <p>
                  <span className="font-semibold">Số bài học:</span>{" "}
                  {course.lessons?.length ?? 0}
                </p>
                <p>
                  <span className="font-semibold">Mô tả ngắn gọn:</span>{" "}
                  {course.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


