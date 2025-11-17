/* Trang “Tiến độ học” */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart2, Clock, LineChart, PlayCircle } from "lucide-react";

import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";
import { getCourseProgress, getProgress } from "@/utils/progress-utils";
import type { Course } from "@/types/course-type";
import type { User } from "@/types/user-type";
import Typography from "@/components/ui/Typography";
import Card from "@/components/ui/Card";
import SectionBox from "@/components/ui/SectionBox";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ProgressBar from "@/components/ui/ProgressBar";

interface CourseProgressDetail {
  course: Course;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  totalMinutes: number;
  completedMinutes: number;
}

export default function CoursesProgressPage() {
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

  const courseDetails: CourseProgressDetail[] = useMemo(() => {
    if (!user) return [];

    const progressMap = getProgress(user.id);

    return MOCK_COURSES.map((course) => {
      const lessons = course.lessons || [];
      const totalLessons = lessons.length || course.totalLessons || 0;

      let completedLessons = 0;
      let totalMinutes = 0;
      let completedMinutes = 0;

      lessons.forEach((lesson) => {
        const duration = lesson.duration || 0;
        totalMinutes += duration;

        if (progressMap[course.id]?.[lesson.id] === "completed") {
          completedLessons += 1;
          completedMinutes += duration;
        }
      });

      const progress = getCourseProgress(user.id, course.id, totalLessons);

      return {
        course,
        progress,
        totalLessons,
        completedLessons,
        totalMinutes,
        completedMinutes,
      };
    });
  }, [user]);

  const summary = useMemo(() => {
    if (courseDetails.length === 0) {
      return {
        enrolledCourses: 0,
        completedCourses: 0,
        totalCompletedLessons: 0,
        totalMinutes: 0,
        averageProgress: 0,
      };
    }

    const enrolled = courseDetails.filter(
      (item) => item.progress > 0 || item.completedLessons > 0
    );
    const completedCourses = courseDetails.filter(
      (item) =>
        item.progress === 100 ||
        (item.totalLessons > 0 && item.completedLessons === item.totalLessons)
    );

    const totalCompletedLessons = courseDetails.reduce(
      (sum, item) => sum + item.completedLessons,
      0
    );

    const totalMinutes = courseDetails.reduce(
      (sum, item) => sum + item.completedMinutes,
      0
    );

    const averageProgress =
      enrolled.length > 0
        ? Math.round(
            enrolled.reduce((sum, item) => sum + item.progress, 0) /
              enrolled.length
          )
        : 0;

    return {
      enrolledCourses: enrolled.length,
      completedCourses: completedCourses.length,
      totalCompletedLessons,
      totalMinutes,
      averageProgress,
    };
  }, [courseDetails]);

  const hasData = summary.enrolledCourses > 0;

  const formatMinutes = (minutes: number) => {
    if (minutes <= 0) return "0 phút";
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    if (rest === 0) return `${hours} giờ`;
    return `${hours} giờ ${rest} phút`;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <Typography variant="h2" as="h1">
              Tiến độ học tập
            </Typography>
            <Typography variant="p" className="max-w-2xl">
              Xem tổng quan quá trình học của bạn: số khóa đã ghi danh, bài học
              đã hoàn thành và thời lượng đã học trên EduLearn.
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
                Khóa đã ghi danh
              </span>
              <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {summary.enrolledCourses}
            </div>
            <span className="text-xs text-slate-500">
              Số khóa học bạn đã bắt đầu
            </span>
          </Card>

          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Bài học hoàn thành
              </span>
              <LineChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {summary.totalCompletedLessons}
            </div>
            <span className="text-xs text-slate-500">
              Tổng số bài học bạn đã hoàn thành
            </span>
          </Card>

          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Thời lượng học
              </span>
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-xl font-semibold text-slate-900 dark:text-white">
              {formatMinutes(summary.totalMinutes)}
            </div>
            <span className="text-xs text-slate-500">
              Ước tính dựa trên thời lượng của các bài học đã hoàn thành
            </span>
          </Card>

          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Tiến độ trung bình
              </span>
              <BarChart2 className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {summary.averageProgress}%
            </div>
            <span className="text-xs text-slate-500">
              Trung bình trên các khóa bạn đã ghi danh
            </span>
          </Card>
        </div>

        {/* Nếu chưa có dữ liệu */}
        {!hasData && (
          <Card className="flex flex-col items-center text-center gap-4 py-10 mt-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
              <LineChart className="w-7 h-7" />
            </div>
            <div className="space-y-2 max-w-md">
              <Typography variant="h3" as="h2">
                Chưa có dữ liệu tiến độ
              </Typography>
              <Typography variant="p">
                Hãy bắt đầu một khóa học và hoàn thành một vài bài học để xem
                thống kê chi tiết tiến độ của bạn.
              </Typography>
            </div>
            <div className="w-full max-w-xs">
              <Link href="/courses">
                <PrimaryButton className="w-full flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  <span>Bắt đầu học ngay</span>
                </PrimaryButton>
              </Link>
            </div>
          </Card>
        )}

        {/* Bảng chi tiết tiến độ theo khóa */}
        {hasData && (
          <SectionBox
            title="Tiến độ theo từng khóa học"
            extra={
              <span className="text-sm text-slate-500">
                {summary.enrolledCourses} khóa đã ghi danh
              </span>
            }
          >
            <div className="space-y-4">
              {courseDetails
                .filter(
                  (item) => item.progress > 0 || item.completedLessons > 0
                )
                .sort((a, b) => b.progress - a.progress)
                .map((item) => (
                  <Card
                    key={item.course.id}
                    className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex-1 space-y-2">
                      <Typography
                        variant="h3"
                        as="h3"
                        className="text-base md:text-lg"
                      >
                        {item.course.title}
                      </Typography>
                      <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center justify-between gap-3">
                          <span>
                            Bài học:{" "}
                            <span className="font-medium">
                              {item.completedLessons}/{item.totalLessons}
                            </span>
                          </span>
                          <span>
                            Thời lượng đã học:{" "}
                            <span className="font-medium">
                              {formatMinutes(item.completedMinutes)}
                            </span>
                          </span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">
                              Tiến độ khóa học
                            </span>
                            <span className="font-medium">
                              {item.progress}%
                            </span>
                          </div>
                          <ProgressBar value={item.progress} height="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-52">
                      <Link href={`/courses/${item.course.id}`}>
                        <PrimaryButton className="w-full flex items-center justify-center gap-2">
                          <PlayCircle className="w-5 h-5" />
                          <span>
                            {item.progress === 100
                              ? "Xem lại khóa học"
                              : "Tiếp tục học"}
                          </span>
                        </PrimaryButton>
                      </Link>
                    </div>
                  </Card>
                ))}
            </div>
          </SectionBox>
        )}
      </div>
    </div>
  );
}
