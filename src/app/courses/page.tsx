// app/courses/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/utils/auth-utils";

export default function CoursesPage() {
  const router = useRouter();

  useEffect(() => {
    if (!getStoredUser()) {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Khóa học của bạn</h1>
      <p>Chào mừng! Bạn đã đăng nhập thành công.</p>
      {/* Danh sách khóa học ở đây */}
    </div>
  );
}
