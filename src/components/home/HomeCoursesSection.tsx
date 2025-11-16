import { MOCK_COURSES } from "@/data/mock-data";
import CourseCard from "@/components/CourseCard";
import Typography from "@/components/ui/Typography";

export default function HomeCoursesSection() {
  const highlightedCourses = MOCK_COURSES.slice(0, 4);

  return (
    <section className="mb-16">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <Typography
            variant="h2"
            as="h2"
            className="text-2xl font-semibold text-slate-900 dark:text-slate-50"
          >
            Các khóa học nổi bật
          </Typography>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Chọn khóa học phù hợp với nhu cầu của bạn – bắt đầu từ các khóa miễn phí,
            sau đó nâng cấp lên Pro khi sẵn sàng.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlightedCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}


