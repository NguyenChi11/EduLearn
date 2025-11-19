import SectionBox from "@/components/ui/SectionBox";
import CourseCard from "@/components/(use)/courses/CourseCard";
import type { CourseWithProgress } from "@/types/courses-dashboard-type";

interface MyCoursesInProgressSectionProps {
  inProgressCourses: CourseWithProgress[];
}

export default function MyCoursesInProgressSection({
  inProgressCourses,
}: MyCoursesInProgressSectionProps) {
  if (inProgressCourses.length === 0) return null;

  return (
    <SectionBox
      title="Đang học"
      extra={
        <span className="text-xs sm:text-sm text-slate-500">
          {inProgressCourses.length} khóa đang diễn ra
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {inProgressCourses.map(({ course, progress }) => (
          <CourseCard
            key={course.id}
            {...course}
            progress={progress}
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
