"use client";

import { useRouter } from "next/navigation";

import { useInstructor } from "@/contexts/InstructorContext";
import InstructorHeader from "@/components/layout/InstructorHeader";
import InstructorMobileHeader from "@/components/layout/InstructorMobileHeader";
import InstructorWelcomeSection from "@/components/(instructor)/InstructorWelcomeSection";
import InstructorStatsSection from "@/components/(instructor)/InstructorStatsSection";
import InstructorTeachingInsightsSection from "@/components/(instructor)/InstructorTeachingInsightsSection";
import InstructorRecentCoursesSection from "@/components/(instructor)/InstructorRecentCoursesSection";
import InstructorStudentFeedbackSection from "@/components/(instructor)/InstructorStudentFeedbackSection";
import InstructorAreaGuard from "@/components/(instructor)/InstructorAreaGuard";

export default function InstructorHomePage() {
  const router = useRouter();
  const { instructor, logoutInstructor } = useInstructor();

  const handleLogout = () => {
    logoutInstructor();
    router.replace("/auth?mode=login&role=instructor");
  };

  // Mọi logic kiểm tra đăng nhập / redirect giảng viên được xử lý trong InstructorAreaGuard
  return (
    <InstructorAreaGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header mobile & desktop giống header học viên nhưng cho giảng viên */}
        {instructor && (
          <>
            <InstructorMobileHeader
              instructor={instructor}
              onLogout={handleLogout}
            />
            <div className="hidden md:block">
              <InstructorHeader
                instructor={instructor}
                onLogout={handleLogout}
              />
            </div>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              <InstructorWelcomeSection
                nameOrEmail={
                  instructor.name || instructor.email || "Giảng viên"
                }
                onGoToCourses={() => router.push("/courses-instructor")}
                onGoToProfile={() => router.push("/information-instructor")}
              />

              <InstructorStatsSection />

              <InstructorTeachingInsightsSection />

              <InstructorRecentCoursesSection />

              <InstructorStudentFeedbackSection />
            </main>
          </>
        )}
      </div>
    </InstructorAreaGuard>
  );
}
