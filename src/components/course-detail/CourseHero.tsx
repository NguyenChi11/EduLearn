import React from "react";
import Tag from "@/components/ui/Tag";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseHeroProps {
  title: string;
  description: string;
  kindOfCourse: string;
  level: string;
  rating?: number;
  className?: string;
}

export default function CourseHero({
  title,
  description,
  kindOfCourse,
  level,
  rating,
  className = ""
}: CourseHeroProps) {
  return (
    <div
      className={cn(
        "bg-linear-to-r from-blue-50 dark:from-slate-900 to-blue-100/50 dark:to-slate-800 rounded-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8",
        className
      )}
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex gap-2 mb-3 flex-wrap">
            <Tag>{kindOfCourse}</Tag>
            <Tag color="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-transparent">{level}</Tag>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 mb-3 sm:mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
            {rating !== undefined && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
