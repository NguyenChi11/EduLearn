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
  // Ảnh đại diện giảng viên (nếu có). Nếu không, UI sẽ hiển thị chữ cái đầu tên.
  instructorAvatar?: string;
  enrolledCount?: number;
  category?: string;
}

export interface LessonResource {
  id: string;
  title: string;
  url: string;
  type?: "pdf" | "doc" | "ppt" | "video" | "link" | "other";
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
  // URL video bài học (ưu tiên dùng nếu có, fallback sang url cũ)
  videoUrl?: string;
  // Danh sách tài liệu đính kèm (demo: lưu tĩnh/mock, chưa kết nối backend)
  attachments?: LessonResource[];
}

export interface ProgressData {
  [courseId: string]: {
    [lessonId: string]: Lesson["status"];
  };
}
