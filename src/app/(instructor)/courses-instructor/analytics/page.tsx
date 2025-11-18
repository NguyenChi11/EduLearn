"use client";

import { BarChart3, BookOpen, Star, Users } from "lucide-react";
import { useMemo, useState } from "react";

import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";
import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import type { Course } from "@/types/course-type";
import { getAnalyticsForCourse } from "@/data/mock-course-analytics";

type CourseAnalytics = {
  totalStudents: number;
  completedPercent: number;
  inProgressPercent: number;
  notStartedPercent: number;
  averageRating: number;
};

function hashStringToNumber(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildCourseAnalytics(course: Course): CourseAnalytics {
  const mock = getAnalyticsForCourse(course);
  if (mock) {
    return {
      totalStudents: mock.totalStudents,
      completedPercent: mock.completedPercent,
      inProgressPercent: mock.inProgressPercent,
      notStartedPercent: mock.notStartedPercent,
      averageRating: mock.averageRating,
    };
  }

  const baseHash = hashStringToNumber(course.id + course.title);
  const totalStudents = course.enrolledCount ?? 80 + (baseHash % 120);

  const completedPercentRaw = 40 + (baseHash % 30); // 40-69
  const inProgressPercentRaw = 20 + ((baseHash >> 3) % 20); // 20-39
  let notStartedPercent = 100 - completedPercentRaw - inProgressPercentRaw;

  const completedPercent = completedPercentRaw;
  const inProgressPercent =
    notStartedPercent < 5
      ? Math.max(10, inProgressPercentRaw - (5 - notStartedPercent))
      : inProgressPercentRaw;

  if (notStartedPercent < 5) {
    notStartedPercent = 100 - completedPercent - inProgressPercent;
  }

  const averageRatingRaw = course.rating ?? 4 + ((baseHash >> 5) % 15) / 10; // ~4.0-5.4
  const averageRating = Math.max(3.5, Math.min(5, averageRatingRaw));

  return {
    totalStudents,
    completedPercent,
    inProgressPercent,
    notStartedPercent,
    averageRating: Number(averageRating.toFixed(1)),
  };
}

export default function InstructorAnalyticsPage() {
  const { instructor } = useInstructor();
  const effectiveInstructorId = instructor?.id ?? "instructor1";

  const courses = useMemo(
    () => getInstructorCourses(effectiveInstructorId),
    [effectiveInstructorId]
  );

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId) ?? null,
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

  const totalStudentsAllCourses = useMemo(() => {
    if (!courses.length) return 0;
    return courses.reduce(
      (sum, course) => sum + (course.enrolledCount ?? 0),
      0
    );
  }, [courses]);

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

        <SectionBox title="Tổng quan (demo)">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Tổng số học viên
                </p>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {totalStudentsAllCourses || "—"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Số học viên trên tất cả các khóa (dữ liệu demo từ danh sách
                khóa).
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Số khóa học
                </p>
                <BookOpen className="h-4 w-4 text-indigo-500" />
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                {courses.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Tổng số khóa mà bạn đang phụ trách (demo).
              </p>
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Danh sách khóa học & thống kê chi tiết">
          {courses.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Hiện tại bạn chưa có khóa học nào trong hệ thống. Hãy tạo khóa học
              ở mục &quot;Danh sách khóa học&quot; trước.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => {
                const analytics = buildCourseAnalytics(course);

                return (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => handleOpenCourseModal(course.id)}
                    className="flex flex-col items-start rounded-xl border border-slate-200 bg-white/90 p-4 text-left text-xs shadow-sm transition hover:border-sky-400 hover:bg-sky-50/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-sky-500/70 dark:hover:bg-slate-900"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {course.category ?? "Khóa học"}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-2">
                      {course.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                      {course.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>
                        {course.lessons?.length ?? 0} bài học ·{" "}
                        {course.level || "N/A"}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                        <Users className="mr-1 h-3 w-3" />
                        {analytics.totalStudents} HV
                      </span>
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        <BarChart3 className="mr-1 h-3 w-3" />
                        {analytics.completedPercent}% hoàn thành
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </SectionBox>

        {showCourseModal && selectedCourse && selectedAnalytics && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm m-0">
            <div className="m-0 xsm:m-4 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="space-y-1">
                  <Typography variant="h3" as="h2">
                    Thống kê khóa học: {selectedCourse.title}
                  </Typography>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tổng quan số học viên và phân bố trạng thái học tập (dữ liệu
                    demo tính toán từ thông tin khóa học).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseCourseModal}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Đóng
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 md:px-6 md:py-5 text-xs">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/60">
                    <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <Users className="h-3.5 w-3.5 text-blue-500" />
                      Tổng số học viên
                    </p>
                    <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                      {selectedAnalytics.totalStudents}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/60">
                    <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <BarChart3 className="h-3.5 w-3.5 text-emerald-500" />
                      Hoàn thành / Đang học
                    </p>
                    <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                      {selectedAnalytics.completedPercent}%{" "}
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        hoàn thành
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {selectedAnalytics.inProgressPercent}% đang học ·{" "}
                      {selectedAnalytics.notStartedPercent}% chưa bắt đầu
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/60">
                    <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <Star className="h-3.5 w-3.5 text-yellow-400" />
                      Đánh giá trung bình
                    </p>
                    <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                      {selectedAnalytics.averageRating.toFixed(1)}
                      <span className="ml-1 text-xs font-normal text-slate-500 dark:text-slate-400">
                        / 5.0
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      Giá trị demo được tính dựa trên thông tin khóa học.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Biểu đồ phân bố trạng thái học viên
                    </p>

                    {/* Donut chart (biểu đồ hình tròn) đơn giản bằng CSS */}
                    <div className="mt-4 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center justify-center">
                        <div
                          className="relative h-40 w-40 rounded-full"
                          style={{
                            background: `conic-gradient(
                              rgba(16, 185, 129, 1) 0% ${
                                selectedAnalytics.completedPercent
                              }%,
                              rgba(56, 189, 248, 1) ${
                                selectedAnalytics.completedPercent
                              }% ${
                              selectedAnalytics.completedPercent +
                              selectedAnalytics.inProgressPercent
                            }%,
                              rgba(148, 163, 184, 1) ${
                                selectedAnalytics.completedPercent +
                                selectedAnalytics.inProgressPercent
                              }% 100%
                            )`,
                          }}
                        >
                          <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-950" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                              Tổng học viên
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-slate-50">
                              {selectedAnalytics.totalStudents}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 flex-col gap-2 text-[11px] text-slate-600 dark:text-slate-300 md:mt-0 md:pl-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-emerald-500" />
                            <span className="font-medium">Hoàn thành</span>
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-slate-50">
                            {selectedAnalytics.completedPercent}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-sky-500" />
                            <span className="font-medium">Đang học</span>
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-slate-50">
                            {selectedAnalytics.inProgressPercent}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-slate-400" />
                            <span className="font-medium">Chưa học</span>
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-slate-50">
                            {selectedAnalytics.notStartedPercent}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
                      Biểu đồ minh họa (demo), chưa kết nối dữ liệu thực tế.
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Thông tin chi tiết khóa học
                    </p>
                    <div className="mt-3 space-y-2 text-[11px] text-slate-600 dark:text-slate-300">
                      <p>
                        <span className="font-semibold">Danh mục:</span>{" "}
                        {selectedCourse.category ?? "Chưa có danh mục"}
                      </p>
                      <p>
                        <span className="font-semibold">Mức độ:</span>{" "}
                        {selectedCourse.level}
                      </p>
                      <p>
                        <span className="font-semibold">Số bài học:</span>{" "}
                        {selectedCourse.lessons?.length ?? 0}
                      </p>
                      <p>
                        <span className="font-semibold">Mô tả ngắn gọn:</span>{" "}
                        {selectedCourse.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
