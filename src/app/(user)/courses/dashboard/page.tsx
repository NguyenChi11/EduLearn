/* Trang dashboard cho phần Courses */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart2, BookOpen, Clock, PlayCircle, Trophy } from "lucide-react";

import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";
import { getCourseProgress } from "@/utils/progress-utils";
import type { Course } from "@/types/course-type";
import type { User } from "@/types/user-type";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SectionBox from "@/components/ui/SectionBox";
import CourseCard from "@/components/courses/CourseCard";

interface CourseWithProgress {
  course: Course;
  progress: number;
  totalLessons: number;
}

export default function CoursesDashboardPage() {
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

  const {
    totalCourses,
    enrolledCourses,
    completedCourses,
    inProgressCourses,
    averageProgress,
  } = useMemo(() => {
    if (!user || courseProgressData.length === 0) {
      return {
        totalCourses: MOCK_COURSES.length,
        enrolledCourses: 0,
        completedCourses: 0,
        inProgressCourses: [] as CourseWithProgress[],
        averageProgress: 0,
      };
    }

    const enrolled = courseProgressData.filter((item) => item.progress > 0);
    const completed = courseProgressData.filter(
      (item) => item.progress === 100
    );
    const inProgress = courseProgressData
      .filter((item) => item.progress > 0 && item.progress < 100)
      .sort((a, b) => b.progress - a.progress);

    const avg =
      enrolled.length > 0
        ? Math.round(
            enrolled.reduce((sum, item) => sum + item.progress, 0) /
              enrolled.length
          )
        : 0;

    return {
      totalCourses: MOCK_COURSES.length,
      enrolledCourses: enrolled.length,
      completedCourses: completed.length,
      inProgressCourses: inProgress,
      averageProgress: avg,
    };
  }, [courseProgressData, user]);

  const recommendedCourses = useMemo(() => {
    if (!user) return MOCK_COURSES.slice(0, 3);

    const notStarted = courseProgressData.filter((item) => item.progress === 0);
    if (notStarted.length === 0) return MOCK_COURSES.slice(0, 3);

    return notStarted.map((item) => item.course).slice(0, 3);
  }, [courseProgressData, user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <Typography variant="h2" as="h1">
              Bảng điều khiển học tập
            </Typography>
            <Typography variant="p" className="max-w-2xl">
              Xin chào,{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {user.name || user.email}
              </span>
              . Theo dõi tiến độ học tập và tiếp tục các khóa học của bạn tại
              đây.
            </Typography>
          </div>

          <div className="w-full sm:w-auto sm:min-w-[220px]">
            <Link href="/courses/my-courses">
              <PrimaryButton className="w-full flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                <span>Tiếp tục học</span>
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Tổng số khóa học
              </span>
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {totalCourses}
            </div>
            <span className="text-xs text-slate-500">
              Tất cả khóa học hiện có trên hệ thống
            </span>
          </Card>

          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Đã ghi danh
              </span>
              <BarChart2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {enrolledCourses}
            </div>
            <span className="text-xs text-slate-500">
              Khóa học bạn đã bắt đầu học
            </span>
          </Card>

          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Hoàn thành
              </span>
              <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {completedCourses}
            </div>
            <span className="text-xs text-slate-500">
              Khóa học đã hoàn thành 100%
            </span>
          </Card>

          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Tiến độ trung bình
              </span>
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {averageProgress}%
            </div>
            <span className="text-xs text-slate-500">
              Trung bình trên tất cả khóa bạn đang học
            </span>
          </Card>
        </div>

        {/* Khóa học đang học */}
        {inProgressCourses.length > 0 && (
          <SectionBox
            title="Tiếp tục học"
            extra={
              <Link
                href="/courses/my-courses"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Xem tất cả khóa của tôi
              </Link>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.slice(0, 4).map(({ course, progress }) => (
                <div
                  key={course.id}
                  className="flex flex-col md:flex-row items-stretch gap-4"
                >
                  <div className="flex-1">
                    <CourseCard
                      {...course}
                      progress={progress}
                      rating={course.rating}
                      enrolledCount={course.enrolledCount}
                      instructor={course.instructor}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionBox>
        )}

        {/* Gợi ý khóa học */}
        <SectionBox
          title="Gợi ý cho bạn"
          extra={
            <Link
              href="/courses"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Khám phá thêm khóa học
            </Link>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                progress={0}
                rating={course.rating}
                enrolledCount={course.enrolledCount}
                instructor={course.instructor}
              />
            ))}
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
