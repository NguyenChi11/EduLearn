"use client";

import React, { useMemo, useState } from "react";

import Typography from "@/components/ui/Typography";
import { useInstructor } from "@/contexts/InstructorContext";
import {
  getInstructorCourses,
  INSTRUCTOR_COURSES,
} from "@/utils/instructor-course-utils";
import type { Lesson } from "@/types/course-type";
import type { LessonQnaMap } from "@/types/instructor-qna-type";
import { createMockQuestionsForLesson } from "@/types/instructor-qna-type";
import InstructorQnaCourseList from "@/components/(instructor)/qna/InstructorQnaCourseList";
import InstructorQnaLessonPopup from "@/components/(instructor)/qna/InstructorQnaLessonPopup";

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

        <InstructorQnaCourseList
          courses={courses}
          selectedCourseId={selectedCourseId}
          openCourseIds={openCourseIds}
          lessonQuestions={lessonQuestions}
          onToggleCourse={handleToggleCourse}
          onOpenLessonQna={handleOpenQnaForLesson}
        />

        {showQnaPopup && selectedLesson && (
          <InstructorQnaLessonPopup
            lesson={selectedLesson}
            questions={selectedLessonQuestions}
            answerDrafts={answerDrafts}
            onChangeAnswerDraft={handleChangeAnswerDraft}
            onSaveAnswer={handleSaveAnswer}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
}
