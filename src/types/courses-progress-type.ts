import type { Course } from "@/types/course-type";

export interface CourseProgressDetail {
  course: Course;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  totalMinutes: number;
  completedMinutes: number;
}

export interface CoursesProgressSummary {
  enrolledCourses: number;
  completedCourses: number;
  totalCompletedLessons: number;
  totalMinutes: number;
  averageProgress: number;
}

export type CoursesProgressOverviewType =
  | "enrolled"
  | "lessons"
  | "time"
  | "progress";
