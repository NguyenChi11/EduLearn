import { Clock, CheckCircle } from "lucide-react";

import InfoItem from "@/components/ui/InfoItem";
import { Lesson } from "@/types/course-type";

interface LessonInfoMobileProps {
  lesson: Lesson;
  status?: string;
}

export default function LessonInfoMobile({
  lesson,
  status,
}: LessonInfoMobileProps) {
  const isCompleted = status === "completed";

  return (
    <div className="flex items-start justify-between gap-3 md:hidden">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">
          {lesson.title}
        </h1>
        <InfoItem
          icon={<Clock className="w-4 h-4" />}
          label="Thời lượng:"
          value={`${lesson.duration} phút`}
        />
      </div>
      {isCompleted && (
        <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
      )}
    </div>
  );
}


