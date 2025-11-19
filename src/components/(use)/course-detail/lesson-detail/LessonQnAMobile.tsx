import { FormEvent, useState } from "react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

interface LessonQnAMobileProps {
  lessonTitle: string;
  userName: string;
}

interface QnaItemMobile {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  answer?: string;
}

const initialQnaMobile: QnaItemMobile[] = [
  {
    id: 1,
    author: "Học viên khác",
    content:
      "Trong ví dụ ở cuối bài, em chưa rõ cách áp dụng vào dự án thực tế?",
    createdAt: "Hôm qua",
    answer:
      "Em hãy thử áp dụng mẫu code vào một component nhỏ trong dự án của mình, sau đó đặt breakpoint để theo dõi luồng dữ liệu.",
  },
];

export default function LessonQnAMobile({
  lessonTitle,
  userName,
}: LessonQnAMobileProps) {
  const [items, setItems] = useState<QnaItemMobile[]>(initialQnaMobile);
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setItems((prev) => [
        {
          id: Date.now(),
          author: userName || "Bạn",
          content: trimmed,
          createdAt: "Vừa xong",
        },
        ...prev,
      ]);
      setQuestion("");
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <section className="space-y-3 md:hidden">
      <Typography
        variant="h3"
        as="h2"
        className="text-base font-semibold text-slate-900 dark:text-white"
      >
        Hỏi giảng viên
      </Typography>

      <Card className="space-y-3 bg-slate-50/80 p-3 text-xs dark:bg-slate-900/80">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Có thắc mắc về{" "}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {lessonTitle}
          </span>
          ? Gửi câu hỏi tại đây.
        </p>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
              Câu hỏi của bạn
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder-slate-500"
              placeholder="Viết câu hỏi ngắn gọn, cụ thể..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !question.trim()}
            className="w-full text-sm"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi câu hỏi"}
          </Button>
        </form>
      </Card>

      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50">
          Câu hỏi gần đây
        </h3>
        {items.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Chưa có câu hỏi nào cho bài học này.
          </p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {item.author}
                  </span>
                  <span>{item.createdAt}</span>
                </div>
                <p className="text-slate-800 dark:text-slate-100">
                  {item.content}
                </p>
                {item.answer && (
                  <div className="mt-2 rounded-md bg-slate-50 p-2 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <span className="font-semibold">Trả lời: </span>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


