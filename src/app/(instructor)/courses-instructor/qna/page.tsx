"use client";

import React, { useMemo, useState } from "react";

import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";
import { useInstructor } from "@/contexts/InstructorContext";
import {
  getInstructorCourses,
  INSTRUCTOR_COURSES,
} from "@/utils/instructor-course-utils";
import type { Course, Lesson } from "@/types/course-type";

type LessonQuestion = {
  id: string;
  lessonId: string;
  studentName: string;
  content: string;
  createdAt: string;
  answer?: string;
  answeredAt?: string;
};

type LessonQnaMap = Record<string, LessonQuestion[]>;

function createMockQuestionsForLesson(
  course: Course,
  lesson: Lesson
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

export default function InstructorQnaPage() {
  const { instructor } = useInstructor();

  // Demo: nếu chưa đăng nhập giảng viên thì tạm dùng instructor1 để có dữ liệu
  const effectiveInstructorId = instructor?.id ?? "instructor1";

  const courses = useMemo(
    () => getInstructorCourses(effectiveInstructorId),
    [effectiveInstructorId]
  );

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(
    courses[0]?.id ?? null
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [showQnaPopup, setShowQnaPopup] = useState(false);

  const [lessonQuestions, setLessonQuestions] = useState<LessonQnaMap>(() => {
    const initial: LessonQnaMap = {};

    INSTRUCTOR_COURSES.forEach((course) => {
      course.lessons?.forEach((lesson) => {
        if (!initial[lesson.id]) {
          initial[lesson.id] = createMockQuestionsForLesson(course, lesson);
        }
      });
    });

    return initial;
  });
  const [answerDrafts, setAnswerDrafts] = useState<Record<string, string>>({});
  const [openCourseIds, setOpenCourseIds] = useState<string[]>([]);

  const selectedCourse = useMemo(
    () => courses.find((c) => c.id === selectedCourseId) ?? null,
    [courses, selectedCourseId]
  );

  const selectedLesson: Lesson | null = useMemo(() => {
    if (!selectedCourse || !selectedLessonId) return null;
    return (
      selectedCourse.lessons?.find((l) => l.id === selectedLessonId) ?? null
    );
  }, [selectedCourse, selectedLessonId]);

  const selectedLessonQuestions =
    (selectedLesson && lessonQuestions[selectedLesson.id]) ?? [];

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(null);
    setShowQnaPopup(false);

    setOpenCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleOpenQnaForLesson = (courseId: string, lessonId: string) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(lessonId);
    setShowQnaPopup(true);
  };

  const handleClosePopup = () => {
    setShowQnaPopup(false);
  };

  const handleChangeAnswerDraft = (questionId: string, value: string) => {
    setAnswerDrafts((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSaveAnswer = (lessonId: string, questionId: string) => {
    const draft = answerDrafts[questionId];
    if (!draft?.trim()) return;

    setLessonQuestions((prev) => {
      const questions = prev[lessonId] ?? [];
      const updated = questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answer: draft.trim(),
              answeredAt: new Date().toISOString(),
            }
          : q
      );

      return {
        ...prev,
        [lessonId]: updated,
      };
    });

    setAnswerDrafts((prev) => ({
      ...prev,
      [questionId]: "",
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Hỏi và đáp
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Quản lý các câu hỏi, thảo luận và phản hồi từ học viên cho từng bài
            học, từng khóa học. Dữ liệu hiện tại chỉ là demo và được lưu tạm
            thời trên trình duyệt.
          </Typography>
        </header>

        <SectionBox title="Danh sách khóa học">
          {courses.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Hiện tại bạn chưa có khóa học nào trong hệ thống. Hãy tạo khóa học
              ở mục &quot;Danh sách khóa học&quot; trước.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => {
                const isActive = course.id === selectedCourseId;
                const isOpen = openCourseIds.includes(course.id);
                const totalQuestions = course.lessons?.reduce((sum, lesson) => {
                  const list = lessonQuestions[lesson.id] ?? [];
                  return sum + list.length;
                }, 0);

                return (
                  <div
                    key={course.id}
                    className={`flex flex-col rounded-xl border bg-white/90 text-left shadow-sm transition dark:bg-slate-950/60 ${
                      isActive
                        ? "border-sky-500 ring-2 ring-sky-400/60"
                        : "border-slate-200 hover:border-sky-300 dark:border-slate-800"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleCourse(course.id)}
                      className="flex w-full flex-col items-start rounded-t-xl px-4 py-3 text-left transition hover:bg-sky-50/70 dark:hover:bg-slate-900"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {course.category ?? "Khóa học"}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-2">
                        {course.title}
                      </p>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="mt-3 flex w-full items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-3">
                          <span>
                            {course.lessons?.length ?? 0} bài học ·{" "}
                            {course.level || "N/A"}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                            {totalQuestions ?? 0} câu hỏi
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
                            isOpen
                              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100"
                          }`}
                        >
                          {isOpen ? "Thu gọn" : "Xem câu hỏi"}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-200 px-3 py-3 space-y-2 text-xs dark:border-slate-800">
                        {course.lessons?.length ? (
                          course.lessons
                            .slice()
                            .sort((a, b) => a.order - b.order)
                            .map((lesson) => {
                              const questions =
                                lessonQuestions[lesson.id] ?? [];
                              const answeredCount = questions.filter(
                                (q) => !!q.answer?.trim()
                              ).length;

                              return (
                                <button
                                  key={lesson.id}
                                  type="button"
                                  onClick={() =>
                                    handleOpenQnaForLesson(course.id, lesson.id)
                                  }
                                  className="flex w-full items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-left text-xs shadow-sm transition hover:border-sky-300 hover:bg-sky-50/60 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-sky-500/60 dark:hover:bg-slate-900"
                                >
                                  <div className="flex flex-1 flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-700 dark:bg-sky-900/60 dark:text-sky-300">
                                        {lesson.order}
                                      </span>
                                      <span className="font-semibold text-slate-900 dark:text-slate-50">
                                        {lesson.title}
                                      </span>
                                    </div>
                                    <p className="ml-7 line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">
                                      {lesson.description}
                                    </p>
                                    <div className="ml-7 mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                                      <span>{lesson.duration} phút</span>
                                      <span className="h-1 w-1 rounded-full bg-slate-400" />
                                      <span>
                                        {questions.length} câu hỏi ·{" "}
                                        {answeredCount} đã trả lời
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition group-hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900">
                                      Xem chi tiết
                                    </span>
                                  </div>
                                </button>
                              );
                            })
                        ) : (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Khóa học này hiện chưa có bài học nào.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </SectionBox>

        {showQnaPopup && selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm m-0">
            <div className="m-0 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="space-y-1">
                  <Typography variant="h3" as="h2">
                    Câu hỏi bài: {selectedLesson.title}
                  </Typography>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Xem và trả lời các câu hỏi của học viên cho bài học này. Dữ
                    liệu hiện chỉ lưu tạm trong phiên làm việc (demo).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Đóng
                </button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 md:px-6 md:py-5 text-xs">
                {selectedLessonQuestions.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Chưa có câu hỏi nào cho bài học này. Khi học viên đặt câu
                    hỏi, chúng sẽ xuất hiện tại đây.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedLessonQuestions.map((question) => (
                      <div
                        key={question.id}
                        className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                              {question.studentName}
                            </p>
                            <p className="text-xs text-slate-800 dark:text-slate-100">
                              {question.content}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                              Thời gian hỏi:{" "}
                              {new Date(question.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 space-y-2 border-t border-dashed border-slate-200 pt-2 dark:border-slate-700">
                          {question.answer ? (
                            <div className="space-y-1">
                              <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                                Câu trả lời của giảng viên
                              </p>
                              <p className="whitespace-pre-wrap text-xs text-slate-800 dark:text-slate-100">
                                {question.answer}
                              </p>
                              {question.answeredAt && (
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                  Đã trả lời lúc:{" "}
                                  {new Date(
                                    question.answeredAt
                                  ).toLocaleString()}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                              Chưa có câu trả lời
                            </p>
                          )}

                          <div className="space-y-1">
                            <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
                              {question.answer
                                ? "Chỉnh sửa câu trả lời"
                                : "Trả lời câu hỏi này"}
                            </label>
                            <textarea
                              className="min-h-[70px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                              placeholder="Nhập câu trả lời của bạn cho học viên..."
                              value={
                                answerDrafts[question.id] ??
                                question.answer ??
                                ""
                              }
                              onChange={(e) =>
                                handleChangeAnswerDraft(
                                  question.id,
                                  e.target.value
                                )
                              }
                            />
                            <div className="flex items-center justify-between gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSaveAnswer(
                                    selectedLesson.id,
                                    question.id
                                  )
                                }
                                disabled={
                                  !(answerDrafts[question.id] ?? "").trim()
                                }
                                className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                              >
                                Lưu câu trả lời
                              </button>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                Chỉ lưu trên trình duyệt (demo).
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
