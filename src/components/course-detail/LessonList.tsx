import React from "react";
import LessonCard from "@/components/LessonCard";
import { getLessonStatus } from "@/utils/progress-utils";
import { Lesson } from "@/types/course-type";

interface LessonListProps {
  lessons: Lesson[];
  courseId: string;
  userId: string;
}

export default function LessonList({ lessons, courseId, userId }: LessonListProps) {
  return (
    <div className="grid gap-4">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          {...lesson}
          courseId={courseId}
          status={getLessonStatus(userId, courseId, lesson.id)}
        />
      ))}
    </div>
  );
}
