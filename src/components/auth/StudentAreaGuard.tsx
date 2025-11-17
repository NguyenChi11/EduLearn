"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getStoredInstructor, getStoredUser } from "@/utils/auth-utils";
import Spinner from "@/components/ui/Spinner";

interface StudentAreaGuardProps {
  children: React.ReactNode;
}

export default function StudentAreaGuard({ children }: StudentAreaGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const instructor = getStoredInstructor();
    if (instructor) {
      // Nếu đang đăng nhập giảng viên thì không cho vào trang học viên
      router.replace("/home-instructor");
      return;
    }

    const user = getStoredUser();
    if (!user) {
      // Nếu chưa đăng nhập học viên, chuyển tới màn đăng nhập role học viên
      router.replace("/auth?mode=login&role=student");
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


