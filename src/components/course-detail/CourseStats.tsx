import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

interface CourseStatsProps {
  totalLessons: number;
  completedLessons: number;
  progress: number;
  className?: string;
}

export default function CourseStats({
  totalLessons,
  completedLessons,
  progress,
  className = "",
}: CourseStatsProps) {
  return (
    <div className={cn("border border-slate-200 dark:border-slate-800 rounded-lg p-6 mb-8 bg-white dark:bg-slate-900", className)}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-slate-900 dark:text-white">Tiến độ học tập</h2>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
      </div>
      <ProgressBar value={progress} />
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
        {completedLessons} / {totalLessons} bài học hoàn thành
      </p>
    </div>
  );
}
