"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { getCourseById } from "@/utils/instructor-course-utils";
import type { Lesson } from "@/types/course-type";
import BackButton from "@/components/ui/BackButton";
import CourseHero from "@/components/(use)/course-detail/CourseHero";
import SectionBox from "@/components/ui/SectionBox";

export default function InstructorCourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const course = getCourseById(courseId);
  const [lessons, setLessons] = useState<Lesson[]>(course?.lessons ?? []);
  const [showAddLessonPopup, setShowAddLessonPopup] = useState(false);
  const [newLesson, setNewLesson] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editLesson, setEditLesson] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  const handleAddLesson = () => {
    if (!course) return;
    if (!newLesson.title.trim()) return;

    const nextOrder = lessons.length ? lessons.length + 1 : 1;

    const lesson: Lesson = {
      id: `temp-${Date.now()}`,
      courseId: course.id,
      title: newLesson.title.trim(),
      description: newLesson.description.trim(),
      duration: 0,
      url: "",
      status: "not-started",
      order: nextOrder,
    };

    setLessons((prev) =>
      [...prev, lesson].sort((a, b) => (a.order || 0) - (b.order || 0))
    );

    setNewLesson({
      title: "",
      description: "",
    });
    setShowAddLessonPopup(false);
  };

  const startEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setEditLesson({
      title: lesson.title,
      description: lesson.description ?? "",
    });
  };

  const cancelEditLesson = () => {
    setEditingLessonId(null);
    setEditLesson({
      title: "",
      description: "",
    });
  };

  const handleSaveEditLesson = () => {
    if (!editingLessonId) return;
    if (!editLesson.title.trim()) return;

    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === editingLessonId
          ? {
              ...lesson,
              title: editLesson.title.trim(),
              description: editLesson.description.trim(),
            }
          : lesson
      )
    );

    cancelEditLesson();
  };

  const handleDeleteLesson = (lessonId: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    if (editingLessonId === lessonId) {
      cancelEditLesson();
    }
  };

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

      {/* Popup thêm bài học */}
      {showAddLessonPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm m-0">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Thêm bài học mới
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Bài học sẽ được thêm vào khóa <b>{course.title}</b>. Dữ liệu
                  chỉ lưu tạm trên trình duyệt (demo).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddLessonPopup(false)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Đóng
              </button>
            </div>
            <div className="space-y-3 px-5 py-4 text-xs md:px-6 md:py-5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Tên bài học
                </label>
                <input
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="VD: Giới thiệu khóa học, Bài 1 - Tổng quan..."
                  value={newLesson.title}
                  onChange={(e) =>
                    setNewLesson((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Mô tả bài học
                </label>
                <textarea
                  className="min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Mô tả ngắn về nội dung chính của bài học này."
                  value={newLesson.description}
                  onChange={(e) =>
                    setNewLesson((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLessonPopup(false)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleAddLesson}
                  disabled={!newLesson.title.trim()}
                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Thêm bài học
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách bài học dành cho giảng viên */}
      <SectionBox
        title="Danh sách bài học"
        extra={
          <button
            type="button"
            onClick={() => setShowAddLessonPopup(true)}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            + Thêm bài học
          </button>
        }
      >
        {lessons.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Khóa học này chưa có bài học nào. Hãy thêm bài học mới để bắt đầu
            xây dựng nội dung.
          </p>
        ) : (
          <div className="space-y-2">
            {lessons.map((lesson) => {
              const isEditing = editingLessonId === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className="space-y-2 rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        Bài #{lesson.order ?? "-"}
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {lesson.title}
                      </p>
                    </div>
                    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 text-[11px] shadow-sm dark:border-slate-700 dark:bg-slate-800">
                      <button
                        type="button"
                        onClick={cancelEditLesson}
                        className={`rounded-full px-3 py-1 font-medium transition ${
                          !isEditing
                            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                        }`}
                      >
                        Xem nội dung bài học
                      </button>
                      <button
                        type="button"
                        onClick={() => startEditLesson(lesson)}
                        className={`rounded-full px-3 py-1 font-medium transition ${
                          isEditing
                            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                        }`}
                      >
                        Thêm / sửa / xóa bài học
                      </button>
                    </div>
                  </div>

                  {!isEditing ? (
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <p>
                        {lesson.description
                          ? lesson.description
                          : "Chưa có mô tả cho bài học này."}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">
                          Thời lượng: {lesson.duration || 0} phút
                        </span>
                        <Link
                          href={`/courses-instructor/course-list/${courseId}/lessions/${lesson.id}`}
                          className="text-[11px] font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Đi tới trang nội dung bài học
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          Tên bài học
                        </label>
                        <input
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          value={editLesson.title}
                          onChange={(e) =>
                            setEditLesson((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          Mô tả bài học
                        </label>
                        <textarea
                          className="min-h-[70px] w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          value={editLesson.description}
                          onChange={(e) =>
                            setEditLesson((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleSaveEditLesson}
                            className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-sky-700"
                          >
                            Lưu bài học
                          </button>
                          <button
                            type="button"
                            onClick={cancelEditLesson}
                            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                          >
                            Hủy
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="text-xs font-medium text-red-500 hover:text-red-600"
                        >
                          Xóa bài học
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SectionBox>
    </main>
  );
}
