import type { Course, Lesson } from "@/types/course-type";
import { MOCK_COURSES } from "@/data/mock-data";

// Tập dữ liệu khóa học cho giảng viên (tạm thời dùng lại MOCK_COURSES của hệ thống)
export const INSTRUCTOR_COURSES: Course[] = MOCK_COURSES;

// Map giảng viên -> danh sách id khóa học mà họ phụ trách
// Demo: instructor1 sẽ thấy tất cả khóa học hiện có
export const INSTRUCTOR_COURSE_OWNERS: Record<string, string[]> = {
  instructor1: INSTRUCTOR_COURSES.map((course) => course.id),
};

// Lấy danh sách khóa học theo id giảng viên
export function getInstructorCourses(instructorId?: string | null): Course[] {
  if (!instructorId) return [];

  const ownedCourseIds = INSTRUCTOR_COURSE_OWNERS[instructorId] ?? [];
  if (ownedCourseIds.length === 0) return [];

  return INSTRUCTOR_COURSES.filter((course) =>
    ownedCourseIds.includes(course.id)
  );
}

export function getCourseById(courseId: string): Course | undefined {
  return INSTRUCTOR_COURSES.find((course) => course.id === courseId);
}

export function getLessonsByCourseId(courseId: string): Lesson[] {
  const course = getCourseById(courseId);
  return course?.lessons ?? [];
}
