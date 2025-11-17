"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getStoredInstructor } from "@/utils/auth-utils";

export default function InstructorHomePage() {
  const router = useRouter();

  useEffect(() => {
    const instructor = getStoredInstructor();
    if (!instructor) {
      router.replace("/auth?mode=login&role=instructor");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
          Trang chủ giảng viên
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
          Đây là trang Home giảng viên trong group (instructor). Sau khi đăng
          nhập ở tab Giảng viên, hệ thống sẽ chuyển đến trang này.
        </p>
      </div>
    </main>
  );
}
