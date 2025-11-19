import SectionBox from "@/components/ui/SectionBox";
import type { Course, Lesson } from "@/types/course-type";
import type { LessonQnaMap } from "@/types/instructor-qna-type";

type InstructorQnaCourseListProps = {
  courses: Course[];
  selectedCourseId: string | null;
  openCourseIds: string[];
  lessonQuestions: LessonQnaMap;
  onToggleCourse: (courseId: string) => void;
  onOpenLessonQna: (courseId: string, lessonId: string) => void;
};

export default function InstructorQnaCourseList({
  courses,
  selectedCourseId,
  openCourseIds,
  lessonQuestions,
  onToggleCourse,
  onOpenLessonQna,
}: InstructorQnaCourseListProps) {
  return (
    <SectionBox title="Danh sách khóa học">
      {courses.length === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Hiện tại bạn chưa có khóa học nào trong hệ thống. Hãy tạo khóa học ở
          mục &quot;Danh sách khóa học&quot; trước.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const isActive = course.id === selectedCourseId;
            const isOpen = openCourseIds.includes(course.id);
            const totalQuestions =
              course.lessons?.reduce((sum, lesson) => {
                const list = lessonQuestions[lesson.id] ?? [];
                return sum + list.length;
              }, 0) ?? 0;

            return (
              <div
                key={course.id}
                className={`flex flex-col rounded-xl border bg-white/90 text-left shadow-sm transition dark:bg-slate-950/60 ${
                  isActive
                    ? "border-sky-500 ring-2 ring-sky-400/60"
                    : "border-slate-200 hover:border-sky-300 dark:border-slate-800"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onToggleCourse(course.id)}
                  className="flex w-full flex-col items-start rounded-t-xl px-4 py-3 text-left transition hover:bg-sky-50/70 dark:hover:bg-slate-900"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {course.category ?? "Khóa học"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {course.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                    {course.description}
                  </p>
                  <div className="mt-3 flex w-full items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>
                        {course.lessons?.length ?? 0} bài học ·{" "}
                        {course.level || "N/A"}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                        {totalQuestions} câu hỏi
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
                        isOpen
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      }`}
                    >
                      {isOpen ? "Thu gọn" : "Xem câu hỏi"}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="space-y-2 border-t border-slate-200 px-3 py-3 text-xs dark:border-slate-800">
                    {course.lessons?.length ? (
                      course.lessons
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((lesson: Lesson) => {
                          const questions = lessonQuestions[lesson.id] ?? [];
                          const answeredCount = questions.filter(
                            (q) => !!q.answer?.trim(),
                          ).length;

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() =>
                                onOpenLessonQna(course.id, lesson.id)
                              }
                              className="flex w-full items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-left text-xs shadow-sm transition hover:border-sky-300 hover:bg-sky-50/60 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-sky-500/60 dark:hover:bg-slate-900"
                            >
                              <div className="flex flex-1 flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-700 dark:bg-sky-900/60 dark:text-sky-300">
                                    {lesson.order}
                                  </span>
                                  <span className="font-semibold text-slate-900 dark:text-slate-50">
                                    {lesson.title}
                                  </span>
                                </div>
                                <p className="ml-7 line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">
                                  {lesson.description}
                                </p>
                                <div className="ml-7 mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                                  <span>{lesson.duration} phút</span>
                                  <span className="h-1 w-1 rounded-full bg-slate-400" />
                                  <span>
                                    {questions.length} câu hỏi · {answeredCount}{" "}
                                    đã trả lời
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition group-hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900">
                                  Xem chi tiết
                                </span>
                              </div>
                            </button>
                          );
                        })
                    ) : (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Khóa học này hiện chưa có bài học nào.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </SectionBox>
  );
}


