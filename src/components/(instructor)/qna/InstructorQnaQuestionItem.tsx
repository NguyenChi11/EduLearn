import Typography from "@/components/ui/Typography";
import type { LessonQuestion } from "@/types/instructor-qna-type";

type InstructorQnaQuestionItemProps = {
  question: LessonQuestion;
  answerDraft: string;
  onChangeDraft: (value: string) => void;
  onSave: () => void;
};

export default function InstructorQnaQuestionItem({
  question,
  answerDraft,
  onChangeDraft,
  onSave,
}: InstructorQnaQuestionItemProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
            {question.studentName}
          </p>
          <p className="text-xs text-slate-800 dark:text-slate-100">
            {question.content}
          </p>
          <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
            Thời gian hỏi:{" "}
            {new Date(question.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2 border-t border-dashed border-slate-200 pt-2 dark:border-slate-700">
        {question.answer ? (
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              Câu trả lời của giảng viên
            </p>
            <p className="whitespace-pre-wrap text-xs text-slate-800 dark:text-slate-100">
              {question.answer}
            </p>
            {question.answeredAt && (
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Đã trả lời lúc:{" "}
                {new Date(question.answeredAt).toLocaleString()}
              </p>
            )}
          </div>
        ) : (
          <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            Chưa có câu trả lời
          </p>
        )}

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
            {question.answer ? "Chỉnh sửa câu trả lời" : "Trả lời câu hỏi này"}
          </label>
          <textarea
            className="min-h-[70px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Nhập câu trả lời của bạn cho học viên..."
            value={answerDraft}
            onChange={(e) => onChangeDraft(e.target.value)}
          />
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={onSave}
              disabled={!answerDraft.trim()}
              className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Lưu câu trả lời
            </button>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Chỉ lưu trên trình duyệt (demo).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


