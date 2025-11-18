import Link from "next/link";

import SectionBox from "@/components/ui/SectionBox";
import CourseCard from "@/components/courses/CourseCard";
import type { Course } from "@/types/course-type";

interface DashboardRecommendedSectionProps {
  courses: Course[];
}

export default function DashboardRecommendedSection({
  courses,
}: DashboardRecommendedSectionProps) {
  return (
    <SectionBox
      title="Gợi ý cho bạn"
      extra={
        <Link
          href="/courses"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Xem thêm
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            progress={0}
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
