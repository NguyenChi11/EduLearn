import Link from "next/link";
import { PlayCircle } from "lucide-react";

import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function CoursesProgressHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        <Typography variant="h2" as="h1" className="text-2xl md:text-3xl">
          Tiến độ học tập
        </Typography>
        <Typography variant="p" className="max-w-2xl text-sm sm:text-base">
          Xem tổng quan quá trình học của bạn: số khóa đã ghi danh, bài học đã
          hoàn thành và thời lượng đã học trên EduLearn.
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


