import React from "react";
import Typography from "@/components/ui/Typography";

export default function InstructorCoursePageHeader() {
  return (
    <header className="space-y-2">
      <Typography variant="h2" as="h1">
        Khóa học của bạn
      </Typography>
      <Typography variant="p" className="max-w-2xl">
        Tìm kiếm và lọc các khóa học mà bạn đang phụ trách. Bạn có thể vào từng
        khóa để quản lý nội dung, bài tập và học viên.
      </Typography>
    </header>
  );
}


