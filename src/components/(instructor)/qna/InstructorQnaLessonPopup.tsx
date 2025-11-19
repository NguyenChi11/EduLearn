import Typography from "@/components/ui/Typography";
import type { Lesson } from "@/types/course-type";
import type { LessonQuestion } from "@/types/instructor-qna-type";
import InstructorQnaQuestionItem from "./InstructorQnaQuestionItem";

type InstructorQnaLessonPopupProps = {
  lesson: Lesson;
  questions: LessonQuestion[];
  answerDrafts: Record<string, string>;
  onChangeAnswerDraft: (questionId: string, value: string) => void;
  onSaveAnswer: (lessonId: string, questionId: string) => void;
  onClose: () => void;
};

export default function InstructorQnaLessonPopup({
  lesson,
  questions,
  answerDrafts,
  onChangeAnswerDraft,
  onSaveAnswer,
  onClose,
}: InstructorQnaLessonPopupProps) {
  return (
    <div className="m-0 fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
      <div className="m-0 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="space-y-1">
            <Typography variant="h3" as="h2">
              Câu hỏi bài: {lesson.title}
            </Typography>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Xem và trả lời các câu hỏi của học viên cho bài học này. Dữ liệu
              hiện chỉ lưu tạm trong phiên làm việc (demo).
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 text-xs md:px-6 md:py-5">
          {questions.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chưa có câu hỏi nào cho bài học này. Khi học viên đặt câu hỏi,
              chúng sẽ xuất hiện tại đây.
            </p>
          ) : (
            <div className="space-y-3">
              {questions.map((question) => (
                <InstructorQnaQuestionItem
                  key={question.id}
                  question={question}
                  answerDraft={
                    answerDrafts[question.id] ?? question.answer ?? ""
                  }
                  onChangeDraft={(value) =>
                    onChangeAnswerDraft(question.id, value)
                  }
                  onSave={() => onSaveAnswer(lesson.id, question.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
