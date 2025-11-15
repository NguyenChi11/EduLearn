export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: "S" | "Pres" | "TC" | "MTC";
  kindOfCourse: "IELTS" | "TOEIC" | "4SKILLS" | "VSTEP";
  totalLessons: number;
  progress: number;
  status?: "not-started" | "in-progress" | "completed";
  lessons: Lesson[];
  fullDescription?: string;
  coverImage?: string;
  rating?: number;
  instructor?: string;
  enrolledCount?: number;
  category?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: number; // minutes
  url: string;
  description: string;
  status: "not-started" | "completed";
  order: number;
}

export interface ProgressData {
  [courseId: string]: {
    [lessonId: string]: Lesson["status"];
  };
}
