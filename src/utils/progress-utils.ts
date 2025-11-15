import { Lesson, ProgressData } from "@/types/course-type";

const getProgressKey = (userId: string): string => `progress_data_user_${userId}`;

export const getProgress = (userId: string): ProgressData => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(getProgressKey(userId));
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("[v0] Failed to parse progress data:", error);
    return {};
  }
};

export const saveProgress = (userId: string, progress: ProgressData): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getProgressKey(userId), JSON.stringify(progress));
  } catch (error) {
    console.error("[v0] Failed to save progress:", error);
  }
};

export const updateLessonStatus = (
  userId: string,
  courseId: string,
  lessonId: string,
  status: Lesson["status"]
): ProgressData => {
  const progress = getProgress(userId);
  if (!progress[courseId]) {
    progress[courseId] = {};
  }
  progress[courseId][lessonId] = status;
  saveProgress(userId, progress);
  return progress;
};

export const getCourseProgress = (
  userId: string,
  courseId: string,
  totalLessons: number
): number => {
  if (totalLessons === 0) return 0;
  const progress = getProgress(userId);
  if (!progress[courseId]) return 0;
  const completed = Object.values(progress[courseId]).filter(
    (status) => status === "completed"
  ).length;
  return Math.round((completed / totalLessons) * 100);
};

export const getLessonStatus = (
  userId: string,
  courseId: string,
  lessonId: string
): Lesson["status"] => {
  const progress = getProgress(userId);
  return progress[courseId]?.[lessonId] || "not-started";
};
