"use client";

import { useEffect, useState } from "react";
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
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

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
      return;
    }

    setIsAllowed(true);
    setIsChecking(false);
  }, [instructor, isHydrated, loadInstructor, router]);

  if (!isHydrated || isChecking || !isAllowed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}

