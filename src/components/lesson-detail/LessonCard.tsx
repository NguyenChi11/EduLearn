"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CheckCircle, Clock, Video } from "lucide-react";

import { Lesson } from "@/types/course-type";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface LessonCardProps extends Lesson {
  courseId: string;
}

export default function LessonCard({
  id,
  courseId,
  title,
  duration,
  order,
  status,
}: LessonCardProps) {
  const isCompleted = useMemo(() => status === "completed", [status]);

  return (
    <Card
      className={`text-slate-900 dark:text-white shadow-sm transition-all ${
        isCompleted ? "bg-slate-50 dark:bg-slate-900/50" : ""
      }`}
    >
      {/* Header */}
      <div className="flex flex-col space-y-1.5 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Bài {order}
              </span>
              {isCompleted && (
                <CheckCircle
                  className="w-5 h-5 text-green-500 shrink-0"
                  aria-label="Lesson completed"
                />
              )}
            </div>
            <h3 className="text-lg font-semibold leading-none tracking-tight line-clamp-2 text-balance">
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Video bài học</span>
            <span aria-hidden="true">•</span>
            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{duration} phút</span>
          </div>
        </div>
        <Link
          href={`/courses/my-courses/${courseId}/lessons/${id}`}
          className="block"
        >
          <Button
            variant={isCompleted ? "secondary" : "primary"}
            className="w-full"
          >
            {isCompleted ? "Xem lại" : "Bắt đầu"}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
