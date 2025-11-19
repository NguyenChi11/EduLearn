import { useMemo } from "react";

import Typography from "@/components/ui/Typography";
import ProgressBar from "@/components/ui/ProgressBar";
import type {
  CourseWithProgress,
  OverviewModalType,
} from "@/types/courses-dashboard-type";

interface DashboardOverviewModalProps {
  type: OverviewModalType | null;
  allCourses: CourseWithProgress[];
  enrolledCourses: CourseWithProgress[];
  completedCourses: CourseWithProgress[];
  onClose: () => void;
  onCourseClick: (courseId: string) => void;
}

export default function DashboardOverviewModal({
  type,
  allCourses,
  enrolledCourses,
  completedCourses,
  onClose,
  onCourseClick,
}: DashboardOverviewModalProps) {
  const modalCourses: CourseWithProgress[] = useMemo(() => {
    if (!type) return [];

    switch (type) {
      case "all":
        return allCourses;
      case "enrolled":
        return enrolledCourses;
      case "completed":
        return completedCourses;
      case "progress":
        return enrolledCourses;
      default:
        return [];
    }
  }, [type, allCourses, enrolledCourses, completedCourses]);

  const { title, subtitle } = useMemo(() => {
    switch (type) {
      case "all":
        return {
          title: "Tất cả khóa học",
          subtitle:
            "Danh sách tất cả khóa học có trên hệ thống. Chọn một khóa để xem nội dung chi tiết.",
        };
      case "enrolled":
        return {
          title: "Khóa học đã ghi danh",
          subtitle:
            "Các khóa học bạn đã bắt đầu học. Chọn một khóa để tiếp tục học hoặc xem nội dung.",
        };
      case "completed":
        return {
          title: "Khóa học đã hoàn thành",
          subtitle:
            "Các khóa học bạn đã hoàn thành 100%. Bạn có thể xem lại bài giảng bất cứ lúc nào.",
        };
      case "progress":
        return {
          title: "Tiến độ các khóa học",
          subtitle:
            "Bảng tiến độ cho từng khóa học bạn đã ghi danh, kèm thanh thể hiện phần trăm hoàn thành.",
        };
      default:
        return { title: "", subtitle: "" };
    }
  }, [type]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 m-0 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      <div className="m-0 flex max-h-[90vh] xsm:m-4 w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800 ">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="space-y-1">
            <Typography variant="h3" as="h2">
              {title}
            </Typography>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 text-sm md:px-6 md:py-5">
          {modalCourses.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Hiện chưa có khóa học nào trong mục này.
            </p>
          ) : (
            <div className="space-y-3">
              {modalCourses.map(({ course, progress }) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => onCourseClick(course.id)}
                  className="flex w-full flex-col items-start gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 text-left text-sm shadow-sm transition hover:border-sky-400 hover:bg-sky-50/80 hover:shadow-md dark:border-slate-700 dark:bg-slate-950/70 dark:hover:border-sky-500/80 dark:hover:bg-slate-900"
                >
                  <div className="flex w-full flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 line-clamp-1 dark:text-slate-50">
                        {course.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                        {course.description}
                      </p>
                    </div>
                    <div className="mt-2 w-full md:mt-0 md:w-48">
                      <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                        Tiến độ:{" "}
                        <span className="font-semibold text-slate-900 dark:text-slate-50">
                          {progress}%
                        </span>
                      </p>
                      <ProgressBar value={progress} height="h-2" />
                    </div>
                  </div>
                  {type === "progress" && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Nhấn để xem danh sách bài giảng và tiếp tục học.
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
