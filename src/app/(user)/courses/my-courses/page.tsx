/* Trang “Khóa học của tôi” */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";
import { getCourseProgress } from "@/utils/progress-utils";
import type { User } from "@/types/user-type";
import type { CourseWithProgress } from "@/types/courses-dashboard-type";
import MyCoursesHeader from "@/components/courses/my-courses/MyCoursesHeader";
import MyCoursesEmptyState from "@/components/courses/my-courses/MyCoursesEmptyState";
import MyCoursesInProgressSection from "@/components/courses/my-courses/MyCoursesInProgressSection";
import MyCoursesCompletedSection from "@/components/courses/my-courses/MyCoursesCompletedSection";

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
        <MyCoursesHeader />

        {/* Nếu chưa có khóa nào */}
        {!hasEnrolled && <MyCoursesEmptyState />}

        {/* Khóa học đang học */}
        <MyCoursesInProgressSection inProgressCourses={inProgressCourses} />

        {/* Khóa học đã hoàn thành */}
        <MyCoursesCompletedSection completedCourses={completedCourses} />
      </div>
    </div>
  );
}
