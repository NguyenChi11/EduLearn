import { CheckCircle2 } from "lucide-react";

import SectionBox from "@/components/ui/SectionBox";
import CourseCard from "@/components/courses/CourseCard";
import type { CourseWithProgress } from "@/types/courses-dashboard-type";

interface MyCoursesCompletedSectionProps {
  completedCourses: CourseWithProgress[];
}

export default function MyCoursesCompletedSection({
  completedCourses,
}: MyCoursesCompletedSectionProps) {
  if (completedCourses.length === 0) return null;

  return (
    <SectionBox
      title="Đã hoàn thành"
      extra={
        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          <span>Bạn đã hoàn thành {completedCourses.length} khóa học 🎉</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {completedCourses.map(({ course }) => (
          <CourseCard
            key={course.id}
            {...course}
            progress={100}
            rating={course.rating}
            enrolledCount={course.enrolledCount}
            instructor={course.instructor}
            detailHref={`/courses/my-courses/${course.id}`}
          />
        ))}
      </div>
    </SectionBox>
  );
}


