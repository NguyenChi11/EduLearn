/* Trang chi tiết giảng viên */
"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { INSTRUCTORS } from "@/data/instructors-data";
import { MOCK_COURSES } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import CourseCard from "@/components/(use)/courses/CourseCard";
import BackButton from "@/components/ui/BackButton";

export default function InstructorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const instructorId = params.id as string;

  const instructor = useMemo(
    () => INSTRUCTORS.find((ins) => ins.id === instructorId),
    [instructorId]
  );

  const instructorCourses = useMemo(
    () =>
      instructor
        ? MOCK_COURSES.filter((course) => course.instructor === instructor.name)
        : [],
    [instructor]
  );

  if (!instructor) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4">
          <Typography
            as="h1"
            variant="h2"
            className="text-2xl font-semibold text-slate-900 dark:text-slate-50"
          >
            Không tìm thấy giảng viên
          </Typography>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Có thể liên kết đã bị sai hoặc giảng viên này không còn tồn tại.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => router.push("/Instructor")}>
              Về danh sách giảng viên
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const initial = instructor.name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <BackButton onClick={() => router.push("/Instructor")} />

        {/* Thông tin chính của giảng viên */}
        <Card className="flex flex-col md:flex-row gap-6 p-6 md:p-8 items-center md:items-start bg-white/90 dark:bg-slate-900/90">
          <div className="shrink-0">
            {instructor.avatarUrl ? (
              <div className="h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
                <Image
                  src={instructor.avatarUrl}
                  alt={instructor.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-3xl font-bold text-white">
                {initial}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <Typography
              as="h1"
              variant="h1"
              className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50"
            >
              {instructor.name}
            </Typography>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              {instructor.role}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Chuyên môn:{" "}
              <span className="font-medium">{instructor.expertise}</span>
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {instructor.bio}
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2 border-t border-slate-100 dark:border-slate-800 mt-4">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">Số khóa học</span>
                <span className="font-semibold text-slate-900 dark:text-slate-50">
                  {instructorCourses.length}
                </span>
              </div>
              {/* Có thể mở rộng thêm các thống kê khác ở đây trong tương lai */}
            </div>
          </div>
        </Card>

        {/* Các khóa học của giảng viên */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Typography
              as="h2"
              variant="h2"
              className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50"
            >
              Khóa học của {instructor.name}
            </Typography>
            {instructorCourses.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push("/courses")}
              >
                Xem tất cả khóa học
              </Button>
            )}
          </div>

          {instructorCourses.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Giảng viên hiện chưa có khóa học nào trong hệ thống.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructorCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  instructor={course.instructor}
                  enrolledCount={course.enrolledCount}
                  rating={course.rating}
                  detailHref={`/courses/my-courses/${course.id}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
