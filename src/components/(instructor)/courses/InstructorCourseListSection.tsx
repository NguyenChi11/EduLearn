import React from "react";
import SectionBox from "@/components/ui/SectionBox";
import CourseCard from "@/components/(use)/courses/CourseCard";
import Pagination from "@/components/ui/Pagination";
import type { Course } from "@/types/course-type";

interface InstructorCourseListSectionProps {
  filteredCoursesCount: number;
  paginatedCourses: Course[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function InstructorCourseListSection({
  filteredCoursesCount,
  paginatedCourses,
  currentPage,
  totalPages,
  onPageChange,
}: InstructorCourseListSectionProps) {
  return (
    <SectionBox title="Danh sách khóa học">
      {filteredCoursesCount === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Không tìm thấy khóa học nào phù hợp với bộ lọc hiện tại. Hãy thử thay
          đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                // Trong chế độ giảng viên, chúng ta không dùng progress của học viên
                progress={0}
                showInstructor={false}
                detailHref={`/courses-instructor/course-list/${course.id}`}
              />
            ))}
          </div>
          <Pagination
            page={currentPage}
            pageCount={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </SectionBox>
  );
}


