"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useUser } from "@/contexts/UserContext";

interface UserAuthGuardProps {
  children: React.ReactNode;
}

export function UserAuthGuard({ children }: UserAuthGuardProps) {
  const router = useRouter();
  const { user, isHydrated } = useUser();

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.replace("/auth?mode=login");
    }
  }, [isHydrated, user, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center px-4 py-10">
          <div className="max-w-md w-full rounded-lg border bg-card p-6 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">Bạn chưa đăng nhập</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Hãy đăng nhập để xem và chỉnh sửa hồ sơ cá nhân của bạn.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <Button variant="secondary" onClick={() => router.push("/")}>
                Về trang chủ
              </Button>
              <Button onClick={() => router.push("/auth?mode=login")}>
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
