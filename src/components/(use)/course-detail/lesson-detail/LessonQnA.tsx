import { FormEvent, useState } from "react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

interface LessonQnAProps {
  lessonTitle: string;
  userName: string;
}

interface QnaItem {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  answer?: string;
}

const initialQna: QnaItem[] = [
  {
    id: 1,
    author: "Học viên khác",
    content: "Trong ví dụ ở cuối bài, em chưa rõ cách áp dụng vào dự án thực tế?",
    createdAt: "Hôm qua",
    answer:
      "Em hãy thử áp dụng mẫu code vào một component nhỏ trong dự án của mình, sau đó đặt breakpoint để theo dõi luồng dữ liệu. Ở buổi Q&A live, thầy/cô sẽ demo thêm một ví dụ hoàn chỉnh.",
  },
];

export default function LessonQnA({ lessonTitle, userName }: LessonQnAProps) {
  const [items, setItems] = useState<QnaItem[]>(initialQna);
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    // Giả lập gửi câu hỏi (chưa kết nối backend, chỉ lưu tạm trong UI)
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
    <section className="space-y-4">
      <Typography
        variant="h3"
        as="h2"
        className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white"
      >
        Hỏi giảng viên
      </Typography>

      <Card className="space-y-4 bg-slate-50/80 dark:bg-slate-900/80">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Bạn có thắc mắc về bài học{" "}
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {lessonTitle}
          </span>
          ? Gửi câu hỏi tại đây, giảng viên sẽ trả lời trong thời gian sớm nhất.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Câu hỏi của bạn
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ví dụ: Em chưa hiểu sự khác nhau giữa props và state trong ví dụ ở trên..."
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder-slate-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Tip: Hãy mô tả cụ thể chỗ bạn chưa hiểu hoặc đoạn code gây lỗi.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Câu hỏi của bạn sẽ chỉ hiển thị với giảng viên và đội ngũ hỗ trợ.
            </p>
            <Button
              type="submit"
              disabled={isSubmitting || !question.trim()}
              className="shrink-0"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi câu hỏi"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Câu hỏi gần đây
        </h3>
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Chưa có câu hỏi nào cho bài học này. Hãy là người hỏi đầu tiên nhé!
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {item.author}
                  </span>
                  <span>{item.createdAt}</span>
                </div>
                <p className="text-slate-800 dark:text-slate-100">
                  {item.content}
                </p>
                {item.answer ? (
                  <div className="mt-2 rounded-md bg-slate-50 p-2 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <span className="font-semibold">Trả lời giảng viên: </span>
                    {item.answer}
                  </div>
                ) : (
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    Chưa có câu trả lời. Giảng viên sẽ phản hồi trong thời gian
                    sớm nhất.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


