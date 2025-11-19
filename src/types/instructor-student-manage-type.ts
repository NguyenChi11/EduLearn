export type RatingLevel = "very-bad" | "bad" | "average" | "good" | "excellent";

export const RATING_LABELS: Record<RatingLevel, string> = {
  "very-bad": "1 - Cực xấu",
  bad: "2 - Kém",
  average: "3 - Trung bình",
  good: "4 - Tốt",
  excellent: "5 - Cực tốt",
};

export type StudentProgress = {
  id: string;
  name: string;
  email: string;
  // % hoàn thành khóa
  progress: number;
  rating: RatingLevel;
};

export type StudentsByCourse = Record<string, StudentProgress[]>;


