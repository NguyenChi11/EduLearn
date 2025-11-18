import Link from "next/link";

import SectionBox from "@/components/ui/SectionBox";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProgressBar from "@/components/ui/ProgressBar";
import type { CourseProgressDetail } from "@/types/courses-progress-type";
import { formatMinutes } from "@/utils/time-utils";

interface CoursesProgressTableProps {
  courseDetails: CourseProgressDetail[];
  enrolledCoursesCount: number;
}

export default function CoursesProgressTable({
  courseDetails,
  enrolledCoursesCount,
}: CoursesProgressTableProps) {
  const displayCourses = courseDetails
    .filter((item) => item.progress > 0 || item.completedLessons > 0)
    .sort((a, b) => b.progress - a.progress);

  if (displayCourses.length === 0) return null;

  return (
    <SectionBox
      title="Tiến độ theo từng khóa học"
      extra={
        <span className="text-xs sm:text-sm text-slate-500">
          {enrolledCoursesCount} khóa đã ghi danh
        </span>
      }
    >
      <div className="space-y-3 sm:space-y-4">
        {displayCourses.map((item) => (
          <Card
            key={item.course.id}
            className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <Typography
                variant="h3"
                as="h3"
                className="text-base md:text-lg"
              >
                {item.course.title}
              </Typography>
              <div className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <span>
                    Bài học:{" "}
                    <span className="font-medium">
                      {item.completedLessons}/{item.totalLessons}
                    </span>
                  </span>
                  <span>
                    Thời lượng đã học:{" "}
                    <span className="font-medium">
                      {formatMinutes(item.completedMinutes)}
                    </span>
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs">
                    <span className="text-slate-500">Tiến độ khóa học</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>
                  <ProgressBar value={item.progress} height="h-2" />
                </div>
              </div>
            </div>

            <div className="mt-4 w-full md:ml-6 md:mt-0 md:w-52">
              <Link href={`/courses/my-courses/${item.course.id}`}>
                <PrimaryButton className="flex w-full items-center justify-center gap-2">
                  <span>
                    {item.progress === 100
                      ? "Xem lại khóa học"
                      : "Tiếp tục học"}
                  </span>
                </PrimaryButton>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </SectionBox>
  );
}


