import type { Course } from "@/types/course-type";

export interface CourseWithProgress {
  course: Course;
  progress: number;
  totalLessons: number;
}

export type OverviewModalType = "all" | "enrolled" | "completed" | "progress";
