"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";

import { Lesson } from "@/types/course-type";
import { User } from "@/types/user-type";
import { getStoredUser } from "@/utils/auth-utils";
import { MOCK_COURSES } from "@/data/mock-data";
import { getLessonStatus, updateLessonStatus } from "@/utils/progress-utils";
import BackButton from "@/components/ui/BackButton";
import SectionBox from "@/components/ui/SectionBox";
import PrimaryButton from "@/components/ui/PrimaryButton";
import LessonInfo from "@/components/lesson-detail/LessonInfo";
import LessonContent from "@/components/lesson-detail/LessonContent";
import LessonNotes from "@/components/lesson-detail/LessonNotes";
import LessonCompletedMessage from "@/components/lesson-detail/LessonCompletedMessage";
import ConfirmPopup from "@/components/ui/ConfirmPopup";
import SuccessPopup from "@/components/ui/SuccessPopup";

type LessonStatus = "not-started" | "completed";

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();

  const courseId = params.id as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<LessonStatus>("not-started");
  const [isMarking, setIsMarking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Kiểm tra login
  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push("/");
      return;
    }
    setUser(storedUser);
  }, [router]);

  // Load lesson
  useEffect(() => {
    try {
      const course = MOCK_COURSES.find((c) => c.id === courseId);
      if (course && user) {
        const foundLesson = course.lessons.find((l) => l.id === lessonId);
        if (foundLesson) {
          setLesson(foundLesson);
          const savedStatus = getLessonStatus(user.id, courseId, lessonId);
          setStatus(savedStatus as LessonStatus);
        }
      }
    } catch (err) {
      console.error("Error loading lesson:", err);
    } finally {
      setIsLoading(false);
    }
  }, [courseId, lessonId, user]);

  const handleMarkCompleted = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const onConfirmMark = useCallback(() => {
    if (!user) return;
    setShowConfirm(false);
    updateLessonStatus(user.id, courseId, lessonId, "completed");
    setStatus("completed");
    setShowSuccess(true);
  }, [user, courseId, lessonId]);

  const onCancelConfirm = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const onCloseSuccess = useCallback(() => {
    setShowSuccess(false);
  }, []);

  // Loading UI
  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-slate-600 dark:text-slate-400">Đang tải...</p>
      </main>
    );
  }

  // Not found
  if (!lesson || !user) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-slate-600 dark:text-slate-400">
          Không tìm thấy bài học
        </p>
      </main>
    );
  }

  const isCompleted = status === "completed";

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8">
      {/* Back */}
      <BackButton onClick={() => router.push(`/courses/${courseId}`)} />

      {/* Video */}
      <div className="mb-8">
        <div className="bg-slate-900 dark:bg-black rounded-lg overflow-hidden mb-6 aspect-video flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl mb-4">🎬</div>
            <p>Video bài học</p>
          </div>
        </div>
      </div>

      <SectionBox>
        <LessonInfo lesson={lesson} status={status} />
      </SectionBox>

      <SectionBox>
        <LessonContent description={lesson.description} />
      </SectionBox>

      <SectionBox>
        <LessonNotes />
      </SectionBox>

      {/* Button/Completed logic */}
      <SectionBox className="mb-0">
        {!isCompleted ? (
          <>
            <PrimaryButton onClick={handleMarkCompleted} disabled={isMarking}>
              {isMarking ? "Đang lưu..." : "Đánh dấu hoàn thành"}
            </PrimaryButton>
            <ConfirmPopup
              open={showConfirm}
              title="Xác nhận hoàn thành"
              description="Bạn chắc chắn muốn đánh dấu bài học này là hoàn thành?"
              onConfirm={onConfirmMark}
              onCancel={onCancelConfirm}
            />
            <SuccessPopup
              open={showSuccess}
              title="Chúc mừng!"
              description="Bạn vừa hoàn thành bài học này 🎉"
              onClose={onCloseSuccess}
            />
          </>
        ) : (
          <LessonCompletedMessage />
        )}
      </SectionBox>
    </main>
  );
}
