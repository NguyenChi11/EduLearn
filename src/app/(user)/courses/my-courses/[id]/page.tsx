"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";

import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";
import { User } from "@/types/user-type";
import { Course } from "@/types/course-type";
import { getCourseProgress, getLessonStatus } from "@/utils/progress-utils";
import BackButton from "@/components/ui/BackButton";
import CourseHero from "@/components/(use)/course-detail/CourseHero";
import CourseStats from "@/components/(use)/course-detail/CourseStats";
import CourseDetailRatingSection from "@/components/(use)/course-detail/CourseDetailRatingSection";
import CourseDetailRatingSectionMobile from "@/components/(use)/course-detail/CourseDetailRatingSectionMobile";
import LessonList from "@/components/(use)/course-detail/LessonList";
import CourseInstructorInfo from "@/components/(use)/course-detail/CourseInstructorInfo";
import CourseInstructorInfoMobile from "@/components/(use)/course-detail/CourseInstructorInfoMobile";
import SectionBox from "@/components/ui/SectionBox";
import CourseCard from "@/components/(use)/courses/CourseCard";

export default function MyCourseDetailPage() {
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

  // Khóa học liên quan (cùng category hoặc cùng loại khóa, loại trừ chính khóa hiện tại)
  const relatedCourses: Course[] = useMemo(() => {
    if (!course) return [];

    return MOCK_COURSES.filter((c) => {
      if (c.id === course.id) return false;
      const sameCategory =
        c.category && course.category && c.category === course.category;
      const sameKind = c.kindOfCourse === course.kindOfCourse;
      return sameCategory || sameKind;
    }).slice(0, 3);
  }, [course]);

  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-slate-600 dark:text-slate-400">Đang tải...</p>
      </main>
    );
  }

  if (!user || !course) {
    return (
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Không tìm thấy khóa học
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <BackButton onClick={() => router.push(`/courses/my-courses`)} />
      <CourseHero
        title={course.title}
        description={course.description}
        kindOfCourse={course.kindOfCourse}
        level={course.level}
        rating={course.rating}
      />
      {/* Thông tin giảng viên đặt ở đầu trang, ngay dưới phần hero */}
      <div className="mb-4 sm:mb-6">
        <CourseInstructorInfoMobile course={course} />
        <div className="hidden md:block">
          <CourseInstructorInfo course={course} />
        </div>
      </div>
      <CourseStats
        totalLessons={totalLessons}
        completedLessons={completedLessons}
        progress={progress}
      />
      <div className="mt-4">
        <CourseDetailRatingSectionMobile course={course} userId={user.id} />
        <div className="hidden md:block">
          <CourseDetailRatingSection course={course} userId={user.id} />
        </div>
      </div>
      <section className="mt-2">
        <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Nội dung khóa học
        </h2>
        <LessonList
          lessons={course.lessons}
          courseId={course.id}
          userId={user.id}
        />
      </section>

      {relatedCourses.length > 0 && (
        <section className="mt-6 sm:mt-8">
          <SectionBox title="Khóa học liên quan">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((related) => {
                const totalRelatedLessons =
                  (related.lessons && related.lessons.length) ||
                  related.totalLessons ||
                  0;
                const relatedProgress = getCourseProgress(
                  user.id,
                  related.id,
                  totalRelatedLessons
                );

                return (
                  <CourseCard
                    key={related.id}
                    {...related}
                    progress={relatedProgress}
                    rating={related.rating}
                    enrolledCount={related.enrolledCount}
                    instructor={related.instructor}
                    detailHref={`/courses/my-courses/${related.id}`}
                  />
                );
              })}
            </div>
          </SectionBox>
        </section>
      )}
    </main>
  );
}
