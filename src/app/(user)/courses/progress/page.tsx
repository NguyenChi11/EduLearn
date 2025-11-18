/* Trang “Tiến độ học” */
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";
import { getCourseProgress, getProgress } from "@/utils/progress-utils";
import type { User } from "@/types/user-type";
import type {
  CourseProgressDetail,
  CoursesProgressSummary,
  CoursesProgressOverviewType,
} from "@/types/courses-progress-type";
import CoursesProgressHeader from "@/components/courses/progress/CoursesProgressHeader";
import CoursesProgressStats from "@/components/courses/progress/CoursesProgressStats";
import CoursesProgressEmptyState from "@/components/courses/progress/CoursesProgressEmptyState";
import CoursesProgressTable from "@/components/courses/progress/CoursesProgressTable";
import CoursesProgressOverviewModal from "@/components/courses/progress/CoursesProgressOverviewModal";

export default function CoursesProgressPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.replace("/auth");
      return;
    }
    if (!user || user.id !== storedUser.id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(storedUser);
    }
  }, [router, user]);

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

  const summary: CoursesProgressSummary = useMemo(() => {
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

  const [overviewModal, setOverviewModal] =
    useState<CoursesProgressOverviewType | null>(null);

  const handleOpenOverview = useCallback(
    (type: CoursesProgressOverviewType) => {
      setOverviewModal(type);
    },
    []
  );

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

  const hasData = summary.enrolledCourses > 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-4 md:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6 md:space-y-8">
        {/* Header */}
        <CoursesProgressHeader />

        {/* Thống kê tổng quan */}
        <CoursesProgressStats
          summary={summary}
          onOpenOverview={handleOpenOverview}
        />

        {/* Nếu chưa có dữ liệu */}
        {!hasData && <CoursesProgressEmptyState />}

        {/* Bảng chi tiết tiến độ theo khóa */}
        {hasData && (
          <CoursesProgressTable
            courseDetails={courseDetails}
            enrolledCoursesCount={summary.enrolledCourses}
          />
        )}

        {/* Popup thống kê tổng quan */}
        {overviewModal && (
          <CoursesProgressOverviewModal
            type={overviewModal}
            courseDetails={courseDetails}
            onClose={handleCloseOverview}
            onCourseClick={handleCourseNavigate}
          />
        )}
      </div>
    </div>
  );
}
