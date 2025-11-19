"use client";

import React, { useMemo, useState } from "react";

import Typography from "@/components/ui/Typography";
import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import type { Course } from "@/types/course-type";
import InstructorStudentCourseList from "@/components/(instructor)/students/InstructorStudentCourseList";
import type {
  RatingLevel,
  StudentsByCourse,
} from "@/types/instructor-student-manage-type";

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

        <InstructorStudentCourseList
          courses={courses}
          selectedCourseId={selectedCourseId}
          studentsByCourse={studentsByCourse}
          onSelectCourse={handleSelectCourse}
          onChangeRating={handleChangeRating}
        />
      </div>
    </div>
  );
}
