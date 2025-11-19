import type { Course, Lesson } from "@/types/course-type";

export type LessonQuestion = {
  id: string;
  lessonId: string;
  studentName: string;
  content: string;
  createdAt: string;
  answer?: string;
  answeredAt?: string;
};

export type LessonQnaMap = Record<string, LessonQuestion[]>;

export function createMockQuestionsForLesson(
  course: Course,
  lesson: Lesson,
): LessonQuestion[] {
  return [
    {
      id: `${lesson.id}-q1`,
      lessonId: lesson.id,
      studentName: "Học viên A",
      content: `Thầy/cô cho em hỏi thêm về nội dung "${lesson.title}" trong khóa "${course.title}" ạ?`,
      createdAt: new Date().toISOString(),
    },
    {
      id: `${lesson.id}-q2`,
      lessonId: lesson.id,
      studentName: "Học viên B",
      content:
        "Em chưa hiểu rõ ví dụ trong video, thầy/cô có thể giải thích lại ngắn gọn giúp em được không ạ?",
      createdAt: new Date().toISOString(),
    },
  ];
}


