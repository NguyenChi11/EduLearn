import Link from "next/link";
import { BookOpen, PlayCircle } from "lucide-react";

import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function MyCoursesHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-lg bg-blue-600 p-2 dark:bg-blue-500">
          <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="space-y-2">
          <Typography variant="h2" as="h1" className="text-2xl md:text-3xl">
            Khóa học của tôi
          </Typography>
          <Typography variant="p" className="max-w-2xl text-sm sm:text-base">
            Đây là nơi bạn theo dõi và tiếp tục các khóa học đã ghi danh. Tiến
            độ của từng bài học sẽ được lưu lại tự động.
          </Typography>
        </div>
      </div>

      <div className="w-full sm:w-auto sm:min-w-[220px]">
        <Link href="/courses">
          <PrimaryButton className="flex w-full items-center justify-center gap-2">
            <PlayCircle className="h-5 w-5" />
            <span>Khám phá thêm khóa học</span>
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
}


