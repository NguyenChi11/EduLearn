import { MOCK_COURSES } from "@/data/mock-data";
import CourseCard from "@/components/courses/CourseCard";
import SectionBox from "@/components/ui/SectionBox";

export default function InstructorRecentCoursesSection() {
  // Tạm thời dùng 4 khóa cuối trong MOCK_COURSES làm "mới tạo"
  const recentCourses = [...MOCK_COURSES].slice(-4);

  return (
    <SectionBox title="Khóa học mới tạo">
      <p className="mb-4 text-xs text-slate-600 dark:text-slate-400">
        Đây là danh sách một số khóa học mới được tạo gần đây (dữ liệu demo).
        Sau này có thể thay bằng API backend để lấy đúng khóa học của giảng viên.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recentCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </SectionBox>
  );
}


