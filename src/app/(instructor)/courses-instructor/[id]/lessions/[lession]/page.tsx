"use client";

import { useParams, useRouter } from "next/navigation";

import { getCourseById } from "@/utils/instructor-course-utils";
import BackButton from "@/components/ui/BackButton";
import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";

export default function InstructorLessonDetailPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.id as string;
  const lessonId = params.lession as string;

  const course = getCourseById(courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId) ?? null;

  if (!lesson) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-slate-600 dark:text-slate-400">
          Không tìm thấy bài học
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 space-y-6">
      <BackButton
        onClick={() => router.push(`/courses-instructor/${courseId}`)}
      />

      <SectionBox>
        <Typography variant="h2" as="h1" className="mb-2">
          {lesson.title}
        </Typography>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Đây là trang xem chi tiết bài học dành cho giảng viên. Bạn có thể thêm
          các công cụ soạn thảo nội dung, upload video, tài liệu, và cấu hình
          quiz/bài tập cho bài học này.
        </p>
      </SectionBox>
    </main>
  );
}
