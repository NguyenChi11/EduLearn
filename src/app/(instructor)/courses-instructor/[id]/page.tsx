"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { getCourseById } from "@/utils/instructor-course-utils";
import BackButton from "@/components/ui/BackButton";
import CourseHero from "@/components/course-detail/CourseHero";
import SectionBox from "@/components/ui/SectionBox";

export default function InstructorCourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const course = getCourseById(courseId);

  if (!course) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-slate-600 dark:text-slate-400">
          Không tìm thấy khóa học
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 space-y-6">
      <BackButton
        onClick={() => router.push("/courses-instructor/course-list")}
      />

      <CourseHero
        title={course.title}
        description={course.description}
        kindOfCourse={course.kindOfCourse}
        level={course.level}
        rating={course.rating}
      />

      {/* Danh sách bài học dành cho giảng viên */}
      <SectionBox title="Danh sách bài học">
        {course.lessons.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Khóa học này chưa có bài học nào. Hãy thêm bài học mới trong phần
            quản lý nội dung.
          </p>
        ) : (
          <div className="space-y-2">
            {course.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/courses-instructor/${courseId}/lessions/${lesson.id}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {lesson.title}
                  </span>
                  <span className="text-xs text-slate-500">
                    Thứ tự #{lesson.order} · {lesson.duration} phút
                  </span>
                </div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  Xem chi tiết
                </span>
              </Link>
            ))}
          </div>
        )}
      </SectionBox>
    </main>
  );
}
