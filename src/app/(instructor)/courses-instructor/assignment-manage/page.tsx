"use client";

import React from "react";
import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";

export default function InstructorAssignmentManagePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Quản lý bài tập
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Tổ chức bài tập, đề, bài kiểm tra và phần chấm điểm cho từng khóa
            học.
          </Typography>
        </header>

        <SectionBox title="Bài tập (demo)">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Bạn có thể xây dựng danh sách bài tập theo khóa học tại đây (ví dụ:
            bảng gồm tên bài tập, thuộc khóa học nào, hạn nộp, trạng thái, số
            lượng học viên đã nộp, v.v).
          </p>
        </SectionBox>
      </div>
    </div>
  );
}
