import Link from "next/link";
import { LineChart, PlayCircle } from "lucide-react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function CoursesProgressEmptyState() {
  return (
    <Card className="mt-4 flex flex-col items-center gap-4 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
        <LineChart className="h-7 w-7" />
      </div>
      <div className="max-w-md space-y-2">
        <Typography variant="h3" as="h2">
          Chưa có dữ liệu tiến độ
        </Typography>
        <Typography variant="p">
          Hãy bắt đầu một khóa học và hoàn thành một vài bài học để xem thống
          kê chi tiết tiến độ của bạn.
        </Typography>
      </div>
      <div className="w-full max-w-xs">
        <Link href="/courses">
          <PrimaryButton className="flex w-full items-center justify-center gap-2">
            <PlayCircle className="h-5 w-5" />
            <span>Bắt đầu học ngay</span>
          </PrimaryButton>
        </Link>
      </div>
    </Card>
  );
}


