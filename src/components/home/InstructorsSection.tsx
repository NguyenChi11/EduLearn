import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import { MOCK_COURSES } from "@/data/mock-data";

const instructors = Array.from(
  new Map(
    MOCK_COURSES.map((course) => [course.instructor ?? "Giảng viên", course])
  ).values()
).slice(0, 4);

export default function InstructorsSection() {
  return (
    <section className="mb-16">
      <div className="mb-6 text-center">
        <Typography
          variant="h2"
          as="h2"
          className="mb-2 text-2xl font-semibold text-slate-900 dark:text-slate-50"
        >
          Đội ngũ giảng viên
        </Typography>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Học cùng những giảng viên giàu kinh nghiệm, đang làm việc trong lĩnh vực.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {instructors.map((course) => (
          <Card
            key={course.id}
            className="flex h-full flex-col items-center bg-white/80 p-5 text-center shadow-sm dark:bg-slate-900/80"
          >
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xl font-bold text-white">
              {course.instructor?.charAt(0) ?? "G"}
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {course.instructor ?? "Giảng viên EduLearn"}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Giảng dạy: {course.kindOfCourse} • Cấp độ {course.level}
            </p>
            <p className="mt-2 line-clamp-3 text-xs text-slate-600 dark:text-slate-300">
              {course.fullDescription ??
                "Mang đến các bài học thực tế, dễ hiểu và có tính ứng dụng cao."}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}


