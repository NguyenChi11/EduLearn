"use client";

import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";

export default function InstructorStudentManagePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Quản lý học viên
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Theo dõi danh sách học viên, tiến độ và trạng thái tham gia trong
            từng khóa học.
          </Typography>
        </header>

        <SectionBox title="Danh sách học viên (demo)">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Bạn có thể hiển thị danh sách học viên theo từng khóa học với các
            thông tin: tên, email, tiến độ % hoàn thành, ngày tham gia, trạng
            thái (đang học / đã hoàn thành / đã rời khóa), v.v.
          </p>
        </SectionBox>
      </div>
    </div>
  );
}

