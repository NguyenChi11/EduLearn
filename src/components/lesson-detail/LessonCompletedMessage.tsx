import React from "react";

interface LessonCompletedMessageProps {
  message?: string;
}

export default function LessonCompletedMessage({ message = "✓ Bạn đã hoàn thành bài học này" }: LessonCompletedMessageProps) {
  return (
    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg text-green-700 dark:text-green-200">
      {message}
    </div>
  );
}
