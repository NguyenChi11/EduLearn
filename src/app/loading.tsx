// app/loading.tsx
"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import Spinner from "@/components/ui/Spinner";
import Typography from "@/components/ui/Typography";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-8 py-10">
        {/* Top loader */}
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <div className="flex flex-col items-center gap-1">
            <Typography variant="h2">Đang tải nội dung</Typography>
            <Typography variant="p">
              Vui lòng chờ trong giây lát, chúng tôi đang chuẩn bị trải nghiệm
              học tập cho bạn...
            </Typography>
          </div>
        </div>

        {/* Skeleton card */}
        <Card className="max-w-xl mx-auto w-full">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/2" />

            <div className="space-y-3 pt-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />

              <div className="flex justify-between gap-3 pt-2">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AuthLayout>
  );
}
