import React from "react";
import CourseCard from "@/components/courses/CourseCard";
import { getCourseProgress } from "@/utils/progress-utils";
import { Course } from "@/types/course-type";

interface CourseGridViewProps {
  courses: Course[];
  userId: string;
}

export default function CourseGridView({
  courses,
  userId,
}: CourseGridViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
      {courses.map((course) => {
        const totalLessons = course.lessons.length || 0;
        return (
          <CourseCard
            key={course.id}
            {...course}
            progress={getCourseProgress(userId, course.id, totalLessons)}
            detailHref={`/courses/my-courses/${course.id}`}
          />
        );
      })}
    </div>
  );
}
