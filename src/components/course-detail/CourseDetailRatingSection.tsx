import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { Course } from "@/types/course-type";
import {
  getUserCourseRating,
  setUserCourseRating,
} from "@/utils/rating-utils";

interface CourseDetailRatingSectionProps {
  course: Course;
  userId: string;
}

export default function CourseDetailRatingSection({
  course,
  userId,
}: CourseDetailRatingSectionProps) {
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (!userId) return;
    const stored = getUserCourseRating(userId, course.id);
    setRating(stored);
  }, [userId, course.id]);

  const handleRate = (value: number) => {
    setRating(value);
    setUserCourseRating(userId, course.id, value);
  };

  return (
    <SectionBox
      title="Đánh giá khóa học này"
      extra={
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Đánh giá của bạn giúp giảng viên cải thiện nội dung và trải nghiệm học
          tập.
        </span>
      }
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <Typography
            variant="p"
            className="text-sm text-slate-700 dark:text-slate-300"
          >
            Bạn thấy khóa{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-50">
              {course.title}
            </span>{" "}
            như thế nào?
          </Typography>
          {rating > 0 && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Bạn đã đánh giá:{" "}
              <span className="font-medium text-slate-900 dark:text-slate-50">
                {rating}/5
              </span>
              . Bạn có thể thay đổi đánh giá bất kỳ lúc nào.
            </p>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1 md:mt-0">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleRate(value)}
              className="p-0.5"
            >
              <Star
                className={cn(
                  "h-5 w-5 sm:h-6 sm:w-6 transition",
                  value <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300 hover:fill-yellow-200 hover:text-yellow-300 dark:text-slate-600"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </SectionBox>
  );
}


