import Typography from "@/components/ui/Typography";

export default function IntroSection() {
  return (
    <section className="mb-16">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.2fr)] items-center">
        <div>
          <Typography
            variant="h2"
            as="h2"
            className="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-50"
          >
            Giới thiệu về EduLearn
          </Typography>
          <p className="mb-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            EduLearn là nền tảng học tập trực tuyến được thiết kế cho người học
            hiện đại. Chúng tôi giúp bạn tiếp cận kiến thức một cách hệ thống,
            trực quan và linh hoạt, phù hợp với lịch trình bận rộn.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Với hệ thống bài học được xây dựng bởi các chuyên gia, lộ trình rõ
            ràng theo từng mục tiêu, EduLearn đồng hành cùng bạn trên hành
            trình chinh phục các chứng chỉ tiếng Anh và kỹ năng quan trọng.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Theo dõi tiến độ, ghi chú bài học, và luyện tập đều đặn mỗi ngày để
            bạn luôn nhìn thấy sự tiến bộ của bản thân.
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Lộ trình cá nhân
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">
                3
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                mục tiêu bạn có thể chọn (IELTS, TOEIC, 4 kỹ năng)
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Bài luyện tập
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">
                180+
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                bài học, quiz và bài tập thực hành
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-sm dark:from-slate-800 dark:to-slate-800">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Tại sao chọn EduLearn?
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              Giao diện đơn giản, tập trung vào trải nghiệm học tập, kèm các
              công cụ hỗ trợ ghi chú, đánh dấu và xem lại bài đã học.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


