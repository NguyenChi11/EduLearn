/* Trang dashboard cho phần Courses */
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";
import { getCourseProgress } from "@/utils/progress-utils";
import type { User } from "@/types/user-type";
import type {
  CourseWithProgress,
  OverviewModalType,
} from "@/types/courses-dashboard-type";
import DashboardHeader from "@/components/courses/dashboard/DashboardHeader";
import DashboardOverviewStats from "@/components/courses/dashboard/DashboardOverviewStats";
import DashboardInProgressSection from "@/components/courses/dashboard/DashboardInProgressSection";
import DashboardRecommendedSection from "@/components/courses/dashboard/DashboardRecommendedSection";
import DashboardOverviewModal from "@/components/courses/dashboard/DashboardOverviewModal";

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
    enrolledCourseList,
    completedCourseList,
  } = useMemo(() => {
    if (!user || courseProgressData.length === 0) {
      return {
        totalCourses: MOCK_COURSES.length,
        enrolledCourses: 0,
        completedCourses: 0,
        inProgressCourses: [] as CourseWithProgress[],
        averageProgress: 0,
        enrolledCourseList: [] as CourseWithProgress[],
        completedCourseList: [] as CourseWithProgress[],
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
      enrolledCourseList: enrolled,
      completedCourseList: completed,
    };
  }, [courseProgressData, user]);

  const recommendedCourses = useMemo(() => {
    if (!user) return MOCK_COURSES.slice(0, 3);

    const notStarted = courseProgressData.filter((item) => item.progress === 0);
    if (notStarted.length === 0) return MOCK_COURSES.slice(0, 3);

    return notStarted.map((item) => item.course).slice(0, 3);
  }, [courseProgressData, user]);

  const [overviewModal, setOverviewModal] = useState<OverviewModalType | null>(
    null
  );

  const handleOpenOverview = useCallback((type: OverviewModalType) => {
    setOverviewModal(type);
  }, []);

  const handleCloseOverview = useCallback(() => {
    setOverviewModal(null);
  }, []);

  const handleCourseNavigate = useCallback(
    (courseId: string) => {
      setOverviewModal(null);
      router.push(`/courses/my-courses/${courseId}`);
    },
    [router]
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-4 md:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6 md:space-y-8">
        {/* Header */}
        <DashboardHeader user={user} />

        {/* Thống kê tổng quan */}
        <DashboardOverviewStats
          totalCourses={totalCourses}
          enrolledCourses={enrolledCourses}
          completedCourses={completedCourses}
          averageProgress={averageProgress}
          onOpenOverview={handleOpenOverview}
        />

        {/* Khóa học đang học */}
        <DashboardInProgressSection inProgressCourses={inProgressCourses} />

        {/* Gợi ý khóa học */}
        <DashboardRecommendedSection courses={recommendedCourses} />

        {/* Popup thống kê tổng quan */}
        <DashboardOverviewModal
          type={overviewModal}
          allCourses={courseProgressData}
          enrolledCourses={enrolledCourseList}
          completedCourses={completedCourseList}
          onClose={handleCloseOverview}
          onCourseClick={handleCourseNavigate}
        />
      </div>
    </div>
  );
}
