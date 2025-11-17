"use client";

import { useState } from "react";

import InstructorAreaGuard from "@/components/(instructor)/InstructorAreaGuard";
import { useInstructor } from "@/contexts/InstructorContext";
import InstructorCoursesSidebar from "@/components/layout/InstructorCoursesSidebar";

export default function InstructorCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { instructor } = useInstructor();

  const instructorName =
    instructor?.name || instructor?.email || "Giảng viên EduLearn";

  return (
    <InstructorAreaGuard>
      <div className="bg-white dark:bg-slate-950 min-h-screen">
        <InstructorCoursesSidebar
          onCollapse={setCollapsed}
          instructorName={instructorName}
        />
        <main
          className={
            "transition-all duration-300 min-h-screen " +
            (collapsed ? "ml-20" : "ml-64")
          }
        >
          {children}
        </main>
      </div>
    </InstructorAreaGuard>
  );
}

