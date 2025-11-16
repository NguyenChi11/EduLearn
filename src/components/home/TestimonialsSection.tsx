import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    role: "Học viên IELTS 7.0",
    content:
      "EduLearn giúp mình xây dựng lộ trình học rõ ràng. Giao diện dễ dùng, mỗi ngày học một chút nhưng tiến bộ rất rõ.",
  },
  {
    name: "Trần Đức Huy",
    role: "Nhân viên văn phòng",
    content:
      "Mình tranh thủ học TOEIC sau giờ làm. Hệ thống bài luyện tập ngắn, có thể học trên điện thoại nên rất tiện.",
  },
  {
    name: "Lê Thu Trang",
    role: "Sinh viên năm 3",
    content:
      "Điểm mình thích nhất là phần theo dõi tiến độ và bài đã hoàn thành. Nhìn thấy % tăng lên rất có động lực.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="mb-16">
      <div className="mb-6 text-center">
        <Typography
          variant="h2"
          as="h2"
          className="mb-2 text-2xl font-semibold text-slate-900 dark:text-slate-50"
        >
          Học viên nói gì về EduLearn
        </Typography>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Một vài chia sẻ từ những người đã và đang học trên nền tảng.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <Card
            key={item.name}
            className="flex h-full flex-col justify-between bg-white/70 p-5 shadow-sm dark:bg-slate-900/80"
          >
            <p className="mb-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              “{item.content}”
            </p>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {item.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.role}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}


