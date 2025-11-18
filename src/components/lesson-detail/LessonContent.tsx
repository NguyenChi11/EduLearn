import React from "react";

interface LessonContentProps {
  description: string;
}

export default function LessonContent({ description }: LessonContentProps) {
  return (
    <section>
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-slate-900 dark:text-white">
        Nội dung bài học
      </h3>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </section>
  );
}
