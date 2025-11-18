"use client";

import Typography from "@/components/ui/Typography";
import Card from "@/components/ui/Card";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:py-8 md:px-8">
      <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">
        <Typography
          as="h1"
          variant="h1"
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50"
        >
          Câu hỏi thường gặp (FAQ)
        </Typography>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Một số câu hỏi phổ biến về nền tảng EduLearn. Bạn có thể tùy chỉnh nội
          dung trang này sau.
        </p>

        <div className="space-y-3 sm:space-y-4">
          <Card className="p-3 sm:p-4 md:p-5">
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50">
              EduLearn là gì?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              EduLearn là nền tảng học tập trực tuyến, giúp bạn học với các
              giảng viên có kinh nghiệm và theo dõi tiến độ học tập dễ dàng.
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-5">
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50">
              Tôi có cần tài khoản để học không?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Bạn cần đăng ký tài khoản để lưu tiến độ, tham gia khóa học và xem
              các nội dung dành riêng cho học viên.
            </p>
          </Card>

          <Card className="p-3 sm:p-4 md:p-5">
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50">
              Làm sao để liên hệ hỗ trợ?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Bạn có thể liên hệ đội ngũ EduLearn qua email hỗ trợ hoặc mục Hỗ
              trợ trong phần tài khoản (sẽ được bổ sung sau).
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
