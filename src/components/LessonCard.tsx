"use client";

import { Lesson } from "@/types/course-type";
import { CheckCircle, Clock, Video } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

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
    <div
      className={`rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm transition-all ${
        isCompleted ? "bg-slate-50 dark:bg-slate-900/50" : ""
      }`}
    >
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6 border-b border-slate-200 dark:border-slate-800">
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
      <div className="p-6 pt-0 space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Video bài học</span>
            <span aria-hidden="true">•</span>
            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{duration} phút</span>
          </div>
        </div>
        <Link href={`/courses/${courseId}/lessons/${id}`} className="block">
          <button
            className={`inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
              isCompleted
                ? "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
                : "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
            }`}
          >
            {isCompleted ? "Xem lại" : "Bắt đầu"}
          </button>
        </Link>
      </div>
    </div>
  );
}
