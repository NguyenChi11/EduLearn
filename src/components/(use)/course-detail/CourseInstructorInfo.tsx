import Link from "next/link";
import { BookOpen, Star, Users } from "lucide-react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import type { Course } from "@/types/course-type";
import { INSTRUCTORS } from "@/data/instructors-data";

interface CourseInstructorInfoProps {
  course: Course;
}

export default function CourseInstructorInfo({
  course,
}: CourseInstructorInfoProps) {
  const instructorName = course.instructor ?? "Giảng viên";
  const initial = instructorName.charAt(0).toUpperCase();

  const matchedInstructor = INSTRUCTORS.find(
    (ins) => ins.name === instructorName
  );
  const instructorHref = matchedInstructor
    ? `/Instructor/${matchedInstructor.id}`
    : "/Instructor";

  return (
    <aside>
      <Link
        href={instructorHref}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
      >
        <Card className="h-full cursor-pointer space-y-4 bg-white/90 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900/90">
          <Typography
            variant="h3"
            as="h2"
            className="text-base font-semibold text-slate-900 dark:text-slate-50"
          >
            Giảng viên khóa học
          </Typography>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-lg font-semibold text-white">
              {initial}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {instructorName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Giảng viên phụ trách khóa{" "}
                <span className="font-medium">{course.title}</span>
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-900/70">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <BookOpen className="h-3.5 w-3.5" />
                Loại khóa học
              </span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {course.kindOfCourse} · {course.level}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Users className="h-3.5 w-3.5" />
                Học viên đã tham gia
              </span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {(course.enrolledCount ?? 0).toLocaleString()} học viên
              </span>
            </div>

            {course.rating !== undefined && (
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  Đánh giá
                </span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {course.rating.toFixed(1)} / 5.0
                </span>
              </div>
            )}
          </div>

          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Tham gia khóa học này, bạn sẽ được đồng hành cùng{" "}
            <span className="font-medium text-slate-800 dark:text-slate-100">
              {instructorName}
            </span>{" "}
            trong suốt lộ trình học, qua các bài giảng, bài tập và nội dung thực
            hành.
          </p>
          <p className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
            Nhấn để xem chi tiết giảng viên
          </p>
        </Card>
      </Link>
    </aside>
  );
}


