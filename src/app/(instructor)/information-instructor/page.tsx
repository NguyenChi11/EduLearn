"use client";

import InstructorAreaGuard from "@/components/(instructor)/InstructorAreaGuard";

export default function InformationInstructorPage() {
  return (
    <InstructorAreaGuard>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Information Instructor
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Trang thông tin cá nhân giảng viên (đang là nội dung demo).
          </p>
        </div>
      </main>
    </InstructorAreaGuard>
  );
}
