"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";
import { User } from "@/types/user-type";
import { Course } from "@/types/course-type";
import { getCourseProgress, getLessonStatus } from "@/utils/progress-utils";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import CourseHero from "@/components/course-detail/CourseHero";
import CourseStats from "@/components/course-detail/CourseStats";
import LessonList from "@/components/course-detail/LessonList";

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Kiểm tra đăng nhập
  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push("/");
      return;
    }
    setUser(storedUser);
  }, [router]);

  // Load khóa học
  useEffect(() => {
    try {
      const foundCourse = MOCK_COURSES.find((c) => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      }
    } catch (error) {
      console.error("Error loading course:", error);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  // Lấy tổng số bài học thực tế từ mảng lessons
  const totalLessons = course?.lessons.length || 0;

  // Sửa progress để dùng tổng số bài thực tế
  useEffect(() => {
    if (!course || !user) return;
    const courseProgress = getCourseProgress(user.id, courseId, totalLessons);
    setProgress(courseProgress);
  }, [user, courseId, course, totalLessons]);

  // Instead of only using static status, compute completedLessons from persisted user progress
  const completedLessons = useMemo(() => {
    if (!course || !user) return 0;
    return course.lessons.filter((lesson) => {
      return getLessonStatus(user.id, courseId, lesson.id) === "completed";
    }).length;
  }, [course, courseId, user]);

  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-slate-600 dark:text-slate-400">Đang tải...</p>
      </main>
    );
  }

  if (!user || !course) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-slate-600 dark:text-slate-400">
          Không tìm thấy khóa học
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8">
      <BackButton onClick={() => router.push(`/courses`)} />
      <CourseHero
        title={course.title}
        description={course.description}
        kindOfCourse={course.kindOfCourse}
        level={course.level}
        rating={course.rating}
      />
      <CourseStats
        totalLessons={totalLessons}
        completedLessons={completedLessons}
        progress={progress}
      />
      <section>
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          Nội dung khóa học
        </h2>
        <LessonList
          lessons={course.lessons}
          courseId={course.id}
          userId={user.id}
        />
      </section>
    </main>
  );
}
