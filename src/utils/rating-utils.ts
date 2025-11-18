type CourseRatings = Record<string, number>;

const getRatingKey = (userId: string): string => `course_ratings_user_${userId}`;

export const getAllCourseRatings = (userId: string): CourseRatings => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(getRatingKey(userId));
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("[rating-utils] Failed to parse course ratings:", error);
    return {};
  }
};

export const getUserCourseRating = (
  userId: string,
  courseId: string
): number => {
  const ratings = getAllCourseRatings(userId);
  return ratings[courseId] ?? 0;
};

export const setUserCourseRating = (
  userId: string,
  courseId: string,
  rating: number
): void => {
  if (typeof window === "undefined") return;
  try {
    const current = getAllCourseRatings(userId);
    const next: CourseRatings = { ...current, [courseId]: rating };
    localStorage.setItem(getRatingKey(userId), JSON.stringify(next));
  } catch (error) {
    console.error("[rating-utils] Failed to save course rating:", error);
  }
};


