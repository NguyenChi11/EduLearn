import React from "react";

interface LessonNotesProps {
  notes?: string[];
}

const defaultNotes = [
  "• Chú ý khái niệm chính",
  "• Viết lại ví dụ",
  "• Áp dụng vào thực tế",
];

export default function LessonNotes({ notes = defaultNotes }: LessonNotesProps) {
  return (
    <section className="space-y-3">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
        Ghi chú thêm:
      </h3>
      <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-lg space-y-2">
        {notes.map((note, i) => (
          <p
            className="text-xs sm:text-sm text-slate-700 dark:text-slate-300"
            key={i}
          >
            {note}
          </p>
        ))}
      </div>
    </section>
  );
}
