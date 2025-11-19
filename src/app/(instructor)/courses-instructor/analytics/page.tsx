"use client";

import { useMemo, useState } from "react";

import Typography from "@/components/ui/Typography";
import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import { buildCourseAnalytics } from "@/utils/instructor-analytics-utils";
import InstructorAnalyticsOverviewSection from "@/components/(instructor)/analytics/InstructorAnalyticsOverviewSection";
import InstructorCoursesAnalyticsSection from "@/components/(instructor)/analytics/InstructorCoursesAnalyticsSection";
import InstructorCourseAnalyticsModal from "@/components/(instructor)/analytics/InstructorCourseAnalyticsModal";
import type { Course } from "@/types/course-type";

export default function InstructorAnalyticsPage() {
  const { instructor } = useInstructor();
  const effectiveInstructorId = instructor?.id ?? "instructor1";

  const courses = useMemo<Course[]>(
    () => getInstructorCourses(effectiveInstructorId),
    [effectiveInstructorId]
  );

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  const selectedCourse = useMemo(
    () =>
      courses.find((course: Course) => course.id === selectedCourseId) ?? null,
    [courses, selectedCourseId]
  );

  const selectedAnalytics = selectedCourse
    ? buildCourseAnalytics(selectedCourse)
    : null;

  const handleOpenCourseModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowCourseModal(true);
  };

  const handleCloseCourseModal = () => {
    setShowCourseModal(false);
  };

  const totalStudentsAllCourses = useMemo(
    () =>
      courses.length === 0
        ? 0
        : courses.reduce(
            (sum: number, course: Course) => sum + (course.enrolledCount ?? 0),
            0
          ),
    [courses]
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Thống kê khóa học
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Nắm bắt nhanh tình hình tham gia, tỷ lệ hoàn thành và mức độ tương
            tác của học viên trong các khóa học.
          </Typography>
        </header>

        <InstructorAnalyticsOverviewSection
          totalStudentsAllCourses={totalStudentsAllCourses}
          totalCourses={courses.length}
        />

        <InstructorCoursesAnalyticsSection
          courses={courses}
          onSelectCourse={handleOpenCourseModal}
        />

        {showCourseModal && selectedCourse && selectedAnalytics && (
          <InstructorCourseAnalyticsModal
            course={selectedCourse}
            analytics={selectedAnalytics}
            onClose={handleCloseCourseModal}
          />
        )}
      </div>
    </div>
  );
}
