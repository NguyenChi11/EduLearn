import Link from "next/link";
import { BookOpen, PlayCircle } from "lucide-react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function MyCoursesEmptyState() {
  return (
    <Card className="flex flex-col items-center gap-4 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
        <BookOpen className="h-7 w-7" />
      </div>
      <div className="max-w-md space-y-2">
        <Typography variant="h3" as="h2">
          Bạn chưa bắt đầu khóa học nào
        </Typography>
        <Typography variant="p">
          Hãy bắt đầu với một khóa học phù hợp để xây dựng lộ trình học tập cho
          riêng bạn.
        </Typography>
      </div>
      <div className="w-full max-w-xs">
        <Link href="/courses">
          <PrimaryButton className="flex w-full items-center justify-center gap-2">
            <PlayCircle className="h-5 w-5" />
            <span>Bắt đầu ngay</span>
          </PrimaryButton>
        </Link>
      </div>
    </Card>
  );
}


