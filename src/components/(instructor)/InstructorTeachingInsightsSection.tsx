import SectionBox from "@/components/ui/SectionBox";

export default function InstructorTeachingInsightsSection() {
  const items = [
    {
      title: "Học viên vừa hoàn thành bài học",
      description:
        "8 học viên đã hoàn thành bài học gần nhất trong 24 giờ qua. Hãy gửi lời động viên hoặc gợi ý bài học tiếp theo.",
    },
    {
      title: "Câu hỏi chưa được trả lời",
      description:
        "Hiện có 3 câu hỏi từ học viên trong mục thảo luận. Trả lời sớm sẽ giúp tăng mức độ hài lòng và tỉ lệ giữ chân học viên.",
    },
    {
      title: "Gợi ý cải thiện khóa học",
      description:
        "Thêm ví dụ thực tế, bài tập nhỏ cuối mỗi video và một phần tổng kết giúp nội dung dễ nhớ hơn.",
    },
  ];

  return (
    <SectionBox title="Hoạt động & gợi ý giảng dạy">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 px-4 py-3"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </SectionBox>
  );
}


