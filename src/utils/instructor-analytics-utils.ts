import type { Course } from "@/types/course-type";
import { getAnalyticsForCourse } from "@/data/mock-course-analytics";

export type CourseAnalytics = {
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

export function buildCourseAnalytics(course: Course): CourseAnalytics {
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
