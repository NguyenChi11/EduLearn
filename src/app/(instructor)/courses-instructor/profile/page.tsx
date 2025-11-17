"use client";

import React from "react";
import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";
import { useInstructor } from "@/contexts/InstructorContext";

export default function InstructorProfilePage() {
  const { instructor } = useInstructor();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Hồ sơ giảng viên
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Cập nhật thông tin cá nhân, giới thiệu bản thân và thương hiệu giảng
            dạy của bạn.
          </Typography>
        </header>

        <SectionBox title="Thông tin cơ bản">
          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <p>
              <span className="font-semibold">Tên hiển thị: </span>
              {instructor?.name || instructor?.email || "Giảng viên EduLearn"}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {instructor?.email || "chưa cập nhật"}
            </p>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
