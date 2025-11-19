import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { CourseWithProgress } from "@/types/courses-dashboard-type";
import { getAllCourseRatings, setUserCourseRating } from "@/utils/rating-utils";

interface MyCoursesRatingSectionProps {
  completedCourses: CourseWithProgress[];
  userId: string;
}

export default function MyCoursesRatingSection({
  completedCourses,
  userId,
}: MyCoursesRatingSectionProps) {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!userId) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRatings(getAllCourseRatings(userId));
  }, [userId]);

  if (completedCourses.length === 0) return null;

  const handleRate = (courseId: string, value: number) => {
    setRatings((prev) => {
      const next = { ...prev, [courseId]: value };
      return next;
    });
    setUserCourseRating(userId, courseId, value);
  };

  const displayCourses = completedCourses.slice(0, 3);

  return (
    <SectionBox
      title="Đánh giá khóa học"
      extra={
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Hãy chia sẻ cảm nhận của bạn để cải thiện chất lượng khóa học.
        </span>
      }
    >
      <div className="space-y-4">
        {displayCourses.map(({ course }) => {
          const currentRating = ratings[course.id] ?? 0;

          return (
            <div
              key={course.id}
              className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white/80 p-3 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {course.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  {course.description}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-1 md:mt-0">
                <span className="mr-2 text-xs text-slate-500 dark:text-slate-400">
                  Đánh giá của bạn:
                </span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRate(course.id, value)}
                    className="p-0.5"
                  >
                    <Star
                      className={cn(
                        "h-4 w-4 transition",
                        value <= currentRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300 hover:fill-yellow-200 hover:text-yellow-300 dark:text-slate-600"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        {completedCourses.length > 3 && (
          <Typography
            variant="p"
            className="text-xs text-slate-500 dark:text-slate-400"
          >
            Bạn đã hoàn thành nhiều hơn 3 khóa học. Hãy ưu tiên đánh giá những
            khóa bạn thấy hữu ích nhất trước nhé.
          </Typography>
        )}
      </div>
    </SectionBox>
  );
}
