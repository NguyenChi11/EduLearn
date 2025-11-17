"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesInstructorIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/courses-instructor/course-list");
  }, [router]);

  return null;
}
