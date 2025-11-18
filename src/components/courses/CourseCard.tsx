"use client";

import Link from "next/link";
import { Star, Users, Clock } from "lucide-react";
import { useMemo } from "react";
import Image from "next/image";

import { Course } from "@/types/course-type";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";

interface CourseCardProps extends Omit<Course, "lessons"> {
  instructor?: string;
  enrolledCount?: number;
  rating?: number;
  /** Ẩn/hiện phần hiển thị tên giảng viên (dùng để ẩn trên trang giảng viên) */
  showInstructor?: boolean;
  /** Link chi tiết (mặc định: /courses/[id]) - dùng để đổi sang route giảng viên */
  detailHref?: string;
}

const LEVEL_COLOR_MAP: Record<string, string> = {
  S: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
  Pres: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
  TC: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  MTC: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
};

const KIND_COLOR_MAP: Record<string, string> = {
  IELTS:
    "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200",
  TOEIC:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
  "4SKILLS": "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200",
  VSTEP:
    "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200",
};

export default function CourseCard({
  id,
  title,
  description,
  level,
  kindOfCourse,
  thumbnail,
  progress = 0,
  rating = 0,
  enrolledCount = 0,
  instructor = "Unknown",
  showInstructor = true,
  detailHref,
}: CourseCardProps) {
  const levelColor = useMemo(() => {
    return (
      LEVEL_COLOR_MAP[level] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200"
    );
  }, [level]);

  const kindColor = useMemo(() => {
    return (
      KIND_COLOR_MAP[kindOfCourse] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200"
    );
  }, [kindOfCourse]);

  return (
    <Card className="h-full flex flex-col p-0" hover>
      <div className="w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-t-xl">
        {thumbnail ? (
          <Image
            src={thumbnail}
            width={100}
            height={100}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-100 dark:from-blue-900 to-blue-50 dark:to-slate-800 flex items-center justify-center">
            <span className="text-4xl" aria-hidden="true">
              📚
            </span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col space-y-1 sm:space-y-1.5 p-4 sm:p-6 flex-1 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${levelColor}`}
          >
            {level}
          </span>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${kindColor}`}
          >
            {kindOfCourse}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold leading-snug tracking-tight line-clamp-2 text-balance">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 sm:mt-2">
          {description}
        </p>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 pt-3 sm:pt-4 space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <Star
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
              aria-hidden="true"
            />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" aria-hidden="true" />
            <span>{enrolledCount.toLocaleString()}</span>
          </div>
          {showInstructor && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span className="truncate">{instructor}</span>
            </div>
          )}
        </div>

        {progress > 0 && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-600 dark:text-slate-400">
                Tiến độ
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <ProgressBar value={progress} height="h-2" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center p-4 sm:p-6 pt-0">
        <Link href={detailHref ?? `/courses/${id}`} className="w-full">
          <Button
            variant={progress > 0 ? "secondary" : "primary"}
            className="w-full"
          >
            {progress > 0 ? "Tiếp tục" : "Xem chi tiết"}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
