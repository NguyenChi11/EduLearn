import { useMemo } from "react";

import Typography from "@/components/ui/Typography";
import ProgressBar from "@/components/ui/ProgressBar";
import type {
  CourseProgressDetail,
  CoursesProgressOverviewType,
} from "@/types/courses-progress-type";
import { formatMinutes } from "@/utils/time-utils";

interface CoursesProgressOverviewModalProps {
  type: CoursesProgressOverviewType | null;
  courseDetails: CourseProgressDetail[];
  onClose: () => void;
  onCourseClick: (courseId: string) => void;
}

export default function CoursesProgressOverviewModal({
  type,
  courseDetails,
  onClose,
  onCourseClick,
}: CoursesProgressOverviewModalProps) {
  const modalItems = useMemo(() => {
    if (!type) return [];

    const enrolled = courseDetails.filter(
      (item) => item.progress > 0 || item.completedLessons > 0
    );

    switch (type) {
      case "enrolled":
        return enrolled;
      case "lessons":
        return [...enrolled].sort(
          (a, b) => b.completedLessons - a.completedLessons
        );
      case "time":
        return [...enrolled].sort(
          (a, b) => b.completedMinutes - a.completedMinutes
        );
      case "progress":
        return [...enrolled].sort((a, b) => b.progress - a.progress);
      default:
        return [];
    }
  }, [type, courseDetails]);

  const { title, subtitle } = useMemo(() => {
    switch (type) {
      case "enrolled":
        return {
          title: "Các khóa đã ghi danh",
          subtitle:
            "Danh sách các khóa học bạn đã bắt đầu. Nhấn vào từng khóa để xem chi tiết nội dung và tiếp tục học.",
        };
      case "lessons":
        return {
          title: "Phân bố bài học hoàn thành",
          subtitle:
            "Các khóa học được sắp xếp theo số bài học đã hoàn thành nhiều nhất.",
        };
      case "time":
        return {
          title: "Thời lượng học theo khóa",
          subtitle:
            "Thời gian bạn đã học ở từng khóa, dựa trên thời lượng các bài học đã hoàn thành.",
        };
      case "progress":
        return {
          title: "Tiến độ chi tiết từng khóa",
          subtitle:
            "So sánh phần trăm tiến độ giữa các khóa học bạn đang tham gia.",
        };
      default:
        return { title: "", subtitle: "" };
    }
  }, [type]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 m-0 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      <div className="m-0 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
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
          {modalItems.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Hiện chưa có dữ liệu trong mục này.
            </p>
          ) : (
            <div className="space-y-3">
              {modalItems.map((item) => (
                <button
                  key={item.course.id}
                  type="button"
                  onClick={() => onCourseClick(item.course.id)}
                  className="flex w-full flex-col items-start gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 text-left text-sm shadow-sm transition hover:border-sky-400 hover:bg-sky-50/80 hover:shadow-md dark:border-slate-700 dark:bg-slate-950/70 dark:hover:border-sky-500/80 dark:hover:bg-slate-900"
                >
                  <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 line-clamp-1 dark:text-slate-50">
                        {item.course.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                        {item.course.description}
                      </p>
                    </div>
                    <div className="mt-2 flex w-full flex-col gap-1 text-xs md:mt-0 md:w-64">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-500">
                          Bài học:{" "}
                          <span className="font-medium text-slate-900 dark:text-slate-50">
                            {item.completedLessons}/{item.totalLessons}
                          </span>
                        </span>
                        <span className="text-slate-500">
                          Thời lượng:{" "}
                          <span className="font-medium text-slate-900 dark:text-slate-50">
                            {formatMinutes(item.completedMinutes)}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-500">
                          Tiến độ:{" "}
                          <span className="font-medium text-slate-900 dark:text-slate-50">
                            {item.progress}%
                          </span>
                        </span>
                      </div>
                      <ProgressBar value={item.progress} height="h-2" />
                    </div>
                  </div>
                  {type === "progress" && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Nhấn để xem nội dung khóa học và tiếp tục bài học tiếp
                      theo.
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
