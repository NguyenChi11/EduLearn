"use client";

import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";

export default function InstructorQnaPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Hỏi và đáp
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Quản lý các câu hỏi, thảo luận và phản hồi từ học viên cho từng bài
            học, từng khóa học.
          </Typography>
        </header>

        <SectionBox title="Khu vực hỏi & đáp (demo)">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Bạn có thể thiết kế danh sách câu hỏi dạng diễn đàn hoặc luồng chat
            theo khóa học / bài học, cho phép trả lời, ghim câu hỏi hay, đánh
            dấu đã giải quyết, v.v.
          </p>
        </SectionBox>
      </div>
    </div>
  );
}

