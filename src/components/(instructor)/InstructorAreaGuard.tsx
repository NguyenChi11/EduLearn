"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getStoredUser } from "@/utils/auth-utils";
import { useInstructor } from "@/contexts/InstructorContext";
import Spinner from "@/components/ui/Spinner";

interface InstructorAreaGuardProps {
  children: React.ReactNode;
}

export default function InstructorAreaGuard({
  children,
}: InstructorAreaGuardProps) {
  const router = useRouter();
  const { instructor, isHydrated, loadInstructor } = useInstructor();

  useEffect(() => {
    if (!isHydrated) return;

    // Đảm bảo đã sync instructor mới nhất từ localStorage nếu cần
    const currentInstructor = instructor ?? loadInstructor();

    if (!currentInstructor) {
      const student = getStoredUser();

      if (student) {
        // Nếu đang đăng nhập học viên mà cố vào trang giảng viên
        router.replace("/courses");
      } else {
        // Chưa đăng nhập giảng viên -> yêu cầu đăng nhập role giảng viên
        router.replace("/auth?mode=login&role=instructor");
      }
    }
  }, [instructor, isHydrated, loadInstructor, router]);

  // Đang đồng bộ dữ liệu từ localStorage
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
  }

  // Đã hydrate nhưng không có instructor -> hiệu ứng sẽ điều hướng; hiển thị loading trong lúc chờ
  if (!instructor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}

