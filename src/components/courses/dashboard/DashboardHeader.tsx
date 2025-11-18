import Link from "next/link";
import { PlayCircle } from "lucide-react";

import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";
import type { User } from "@/types/user-type";

interface DashboardHeaderProps {
  user: User;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        <Typography variant="h2" as="h1" className="text-2xl md:text-3xl">
          Bảng điều khiển học tập
        </Typography>
        <Typography variant="p" className="max-w-2xl text-sm sm:text-base">
          Xin chào,{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {user.name || user.email}
          </span>
          . Theo dõi tiến độ học tập và tiếp tục các khóa học của bạn tại đây.
        </Typography>
      </div>

      <div className="w-full sm:w-auto sm:min-w-[220px]">
        <Link href="/courses/my-courses">
          <PrimaryButton className="flex w-full items-center justify-center gap-2">
            <PlayCircle className="h-5 w-5" />
            <span>Tiếp tục học</span>
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
