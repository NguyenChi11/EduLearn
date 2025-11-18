"use client";

import React, { useMemo, useState } from "react";

import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";
import ProgressBar from "@/components/ui/ProgressBar";
import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import type { Course } from "@/types/course-type";

type RatingLevel = "very-bad" | "bad" | "average" | "good" | "excellent";

const RATING_LABELS: Record<RatingLevel, string> = {
  "very-bad": "1 - Cực xấu",
  bad: "2 - Kém",
  average: "3 - Trung bình",
  good: "4 - Tốt",
  excellent: "5 - Cực tốt",
};

type StudentProgress = {
  id: string;
  name: string;
  email: string;
  progress: number; // % hoàn thành khóa
  rating: RatingLevel;
};

type StudentsByCourse = Record<string, StudentProgress[]>;

export default function InstructorStudentManagePage() {
  const { instructor } = useInstructor();

  const courses: Course[] = useMemo(
    () => getInstructorCourses(instructor?.id),
    [instructor]
  );

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [studentsByCourse, setStudentsByCourse] = useState<StudentsByCourse>(
    () => {
      const result: StudentsByCourse = {};
      courses.forEach((course, index) => {
        const baseIndex = index * 3;
        result[course.id] = [
          {
            id: `${course.id}-s1`,
            name: "Nguyễn Văn A",
            email: `student${baseIndex + 1}@example.com`,
            progress: 20,
            rating: "average",
          },
          {
            id: `${course.id}-s2`,
            name: "Trần Thị B",
            email: `student${baseIndex + 2}@example.com`,
            progress: 55,
            rating: "good",
          },
          {
            id: `${course.id}-s3`,
            name: "Lê Văn C",
            email: `student${baseIndex + 3}@example.com`,
            progress: 80,
            rating: "excellent",
          },
        ];
      });
      return result;
    }
  );

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  const handleChangeRating = (
    courseId: string,
    studentId: string,
    rating: RatingLevel
  ) => {
    setStudentsByCourse((prev) => ({
      ...prev,
      [courseId]: prev[courseId].map((student) =>
        student.id === studentId ? { ...student, rating } : student
      ),
    }));
  };

  const selectedCourse = selectedCourseId
    ? courses.find((c) => c.id === selectedCourseId) ?? null
    : null;
  const selectedStudents = selectedCourseId
    ? studentsByCourse[selectedCourseId] ?? []
    : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Quản lý học viên
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Xem danh sách học viên theo từng khóa học, theo dõi tiến độ học tập
            và đưa ra đánh giá cho từng học viên.
          </Typography>
        </header>

        <SectionBox title="Danh sách khóa học & học viên">
          {courses.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Bạn chưa có khóa học nào để quản lý học viên.
            </p>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => {
                const isExpanded = selectedCourseId === course.id;
                const students = studentsByCourse[course.id] ?? [];

                return (
                  <div
                    key={course.id}
                    className="rounded-lg border border-slate-200 bg-white text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectCourse(course.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          Mã khóa học: {course.id} · Tổng số bài học:{" "}
                          {course.totalLessons}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        {isExpanded
                          ? "Ẩn danh sách học viên"
                          : "Xem danh sách học viên"}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-3 text-xs dark:border-slate-800 dark:bg-slate-950/30">
                        {students.length === 0 ? (
                          <p className="text-slate-600 dark:text-slate-300">
                            Khóa học này chưa có học viên (demo dữ liệu).
                          </p>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Danh sách dưới đây là dữ liệu minh họa. Bạn có thể
                              xem tiến độ và đặt đánh giá cho từng học viên.
                            </p>
                            <div className="overflow-x-auto rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                                <thead className="bg-slate-50 dark:bg-slate-950/60">
                                  <tr>
                                    <th className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-200">
                                      Học viên
                                    </th>
                                    <th className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-200">
                                      Email
                                    </th>
                                    <th className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-200">
                                      Tiến độ
                                    </th>
                                    <th className="px-3 py-2 text-left font-semibold text-slate-700 dark:text-slate-200">
                                      Đánh giá
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                  {students.map((student) => (
                                    <tr key={student.id}>
                                      <td className="px-3 py-2 align-top text-slate-800 dark:text-slate-100">
                                        {student.name}
                                      </td>
                                      <td className="px-3 py-2 align-top text-slate-600 dark:text-slate-300">
                                        {student.email}
                                      </td>
                                      <td className="px-3 py-2 align-top min-w-[140px]">
                                        <div className="flex flex-col gap-1">
                                          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                                            <span>Hoàn thành</span>
                                            <span className="font-medium">
                                              {student.progress}%
                                            </span>
                                          </div>
                                          <ProgressBar
                                            value={student.progress}
                                            height="h-2"
                                          />
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 align-top min-w-[160px]">
                                        <select
                                          className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-[11px] text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                          value={student.rating}
                                          onChange={(e) =>
                                            handleChangeRating(
                                              course.id,
                                              student.id,
                                              e.target.value as RatingLevel
                                            )
                                          }
                                        >
                                          {Object.entries(RATING_LABELS).map(
                                            ([value, label]) => (
                                              <option key={value} value={value}>
                                                {label}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </SectionBox>
      </div>
    </div>
  );
}
