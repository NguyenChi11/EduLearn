import Link from "next/link";

import SectionBox from "@/components/ui/SectionBox";
import CourseCard from "@/components/courses/CourseCard";
import type { CourseWithProgress } from "@/types/courses-dashboard-type";

interface DashboardInProgressSectionProps {
  inProgressCourses: CourseWithProgress[];
}

export default function DashboardInProgressSection({
  inProgressCourses,
}: DashboardInProgressSectionProps) {
  if (inProgressCourses.length === 0) return null;

  return (
    <SectionBox
      title="Tiếp tục học"
      extra={
        <Link
          href="/courses/my-courses"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Xem thêm
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {inProgressCourses.slice(0, 4).map(({ course, progress }) => (
          <div
            key={course.id}
            className="flex flex-col items-stretch gap-4 md:flex-row"
          >
            <div className="flex-1">
              <CourseCard
                {...course}
                progress={progress}
                rating={course.rating}
                enrolledCount={course.enrolledCount}
                instructor={course.instructor}
                detailHref={`/courses/my-courses/${course.id}`}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionBox>
  );
}
