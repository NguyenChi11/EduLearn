import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";

const MOCK_FEEDBACK = [
  {
    id: "f1",
    studentName: "Nguyễn Minh Anh",
    courseTitle: "React Basics for Beginners",
    rating: 4.8,
    comment:
      "Bài giảng rất dễ hiểu, ví dụ thực tế. Em mong thầy/cô bổ sung thêm bài tập nhỏ cuối mỗi chương.",
    timeAgo: "2 giờ trước",
  },
  {
    id: "f2",
    studentName: "Trần Quốc Bảo",
    courseTitle: "Advanced JavaScript",
    rating: 4.5,
    comment:
      "Phần giải thích về async/await rất chi tiết. Nếu có thêm sơ đồ flow thì sẽ càng dễ hình dung hơn.",
    timeAgo: "Hôm qua",
  },
  {
    id: "f3",
    studentName: "Lê Thu Hà",
    courseTitle: "UI/UX Design Principles",
    rating: 4.9,
    comment:
      "Rất thích phần case study thực tế. Em muốn có thêm tài liệu tham khảo ở cuối mỗi bài.",
    timeAgo: "3 ngày trước",
  },
];

export default function InstructorStudentFeedbackSection() {
  return (
    <SectionBox title="Feedback chi tiết từ học viên">
      <div className="space-y-4">
        {MOCK_FEEDBACK.map((fb) => (
          <div
            key={fb.id}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 px-4 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <Typography
                  as="h3"
                  variant="h3"
                  className="text-sm font-semibold text-slate-900 dark:text-slate-50"
                >
                  {fb.studentName}
                </Typography>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Khóa học: {fb.courseTitle}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-amber-500">
                  Đánh giá: {fb.rating.toFixed(1)}/5
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {fb.timeAgo}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-700 dark:text-slate-200">
              {fb.comment}
            </p>
          </div>
        ))}
      </div>
    </SectionBox>
  );
}
