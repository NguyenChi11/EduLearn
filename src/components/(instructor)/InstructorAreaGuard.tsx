"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getStoredInstructor, getStoredUser } from "@/utils/auth-utils";
import Spinner from "@/components/ui/Spinner";

interface InstructorAreaGuardProps {
  children: React.ReactNode;
}

export default function InstructorAreaGuard({
  children,
}: InstructorAreaGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const instructor = getStoredInstructor();

    if (!instructor) {
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAllowed(true);
    setIsChecking(false);
  }, [router]);

  if (isChecking || !isAllowed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}


