/* Trang “Khóa học của tôi” */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, CheckCircle2, PlayCircle } from "lucide-react";

import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";
import { getCourseProgress } from "@/utils/progress-utils";
import type { Course } from "@/types/course-type";
import type { User } from "@/types/user-type";
import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Card from "@/components/ui/Card";
import CourseCard from "@/components/courses/CourseCard";

interface CourseWithProgress {
  course: Course;
  progress: number;
  totalLessons: number;
}

export default function MyCoursesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.replace("/auth");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(storedUser);
  }, [router]);

  const courseProgressData: CourseWithProgress[] = useMemo(() => {
    if (!user) return [];

    return MOCK_COURSES.map((course) => {
      const totalLessons =
        (course.lessons && course.lessons.length) || course.totalLessons || 0;
      const progress = getCourseProgress(user.id, course.id, totalLessons);

      return {
        course,
        progress,
        totalLessons,
      };
    });
  }, [user]);

  const { inProgressCourses, completedCourses } = useMemo(() => {
    const enrolled = courseProgressData.filter((item) => item.progress > 0);

    const inProgress = enrolled
      .filter((item) => item.progress < 100)
      .sort((a, b) => b.progress - a.progress);

    const completed = enrolled
      .filter((item) => item.progress === 100)
      .sort((a, b) => a.course.title.localeCompare(b.course.title));

    return { inProgressCourses: inProgress, completedCourses: completed };
  }, [courseProgressData]);

  const hasEnrolled =
    inProgressCourses.length > 0 || completedCourses.length > 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-600 dark:bg-blue-500 mt-1">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
              <Typography variant="h2" as="h1">
                Khóa học của tôi
              </Typography>
              <Typography variant="p" className="max-w-2xl">
                Đây là nơi bạn theo dõi và tiếp tục các khóa học đã ghi danh.
                Tiến độ của từng bài học sẽ được lưu lại tự động.
              </Typography>
            </div>
          </div>

          <div className="w-full sm:w-auto sm:min-w-[220px]">
            <Link href="/courses">
              <PrimaryButton className="w-full flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                <span>Khám phá thêm khóa học</span>
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* Nếu chưa có khóa nào */}
        {!hasEnrolled && (
          <Card className="flex flex-col items-center text-center gap-4 py-10">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-2 max-w-md">
              <Typography variant="h3" as="h2">
                Bạn chưa bắt đầu khóa học nào
              </Typography>
              <Typography variant="p">
                Hãy bắt đầu với một khóa học phù hợp để xây dựng lộ trình học
                tập cho riêng bạn.
              </Typography>
            </div>
            <div className="w-full max-w-xs">
              <Link href="/courses">
                <PrimaryButton className="w-full flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  <span>Bắt đầu ngay</span>
                </PrimaryButton>
              </Link>
            </div>
          </Card>
        )}

        {/* Khóa học đang học */}
        {inProgressCourses.length > 0 && (
          <SectionBox
            title="Đang học"
            extra={
              <span className="text-sm text-slate-500">
                {inProgressCourses.length} khóa đang diễn ra
              </span>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.map(({ course, progress }) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  progress={progress}
                  rating={course.rating}
                  enrolledCount={course.enrolledCount}
                  instructor={course.instructor}
                />
              ))}
            </div>
          </SectionBox>
        )}

        {/* Khóa học đã hoàn thành */}
        {completedCourses.length > 0 && (
          <SectionBox
            title="Đã hoàn thành"
            extra={
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Bạn đã hoàn thành {completedCourses.length} khóa học 🎉
                </span>
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map(({ course }) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  progress={100}
                  rating={course.rating}
                  enrolledCount={course.enrolledCount}
                  instructor={course.instructor}
                />
              ))}
            </div>
          </SectionBox>
        )}
      </div>
    </div>
  );
}

