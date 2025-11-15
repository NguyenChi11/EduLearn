import React from "react";
import { Clock, CheckCircle } from "lucide-react";
import InfoItem from "@/components/ui/InfoItem";
import { Lesson } from "@/types/course-type";

interface LessonInfoProps {
  lesson: Lesson;
  status?: string;
}

export default function LessonInfo({ lesson, status }: LessonInfoProps) {
  const isCompleted = status === "completed";
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{lesson.title}</h1>
        <InfoItem icon={<Clock className="w-4 h-4" />} label="Thời lượng:" value={`${lesson.duration} phút`} />
      </div>
      {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
    </div>
  );
}
