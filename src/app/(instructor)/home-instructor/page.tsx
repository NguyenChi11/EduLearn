"use client";

import { useRouter } from "next/navigation";

import { useInstructor } from "@/contexts/InstructorContext";
import InstructorHeader from "@/components/layout/InstructorHeader";
import InstructorMobileHeader from "@/components/layout/InstructorMobileHeader";
import Spinner from "@/components/ui/Spinner";
import InstructorWelcomeSection from "@/components/(instructor)/InstructorWelcomeSection";
import InstructorStatsSection from "@/components/(instructor)/InstructorStatsSection";
import InstructorTeachingInsightsSection from "@/components/(instructor)/InstructorTeachingInsightsSection";
import InstructorRecentCoursesSection from "@/components/(instructor)/InstructorRecentCoursesSection";
import InstructorStudentFeedbackSection from "@/components/(instructor)/InstructorStudentFeedbackSection";

export default function InstructorHomePage() {
  const router = useRouter();
  const { instructor, isHydrated, logoutInstructor } = useInstructor();

  const handleLogout = () => {
    logoutInstructor();
    router.replace("/auth?mode=login&role=instructor");
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!instructor) {
    // Không có giảng viên -> chuyển hướng sang login
    router.replace("/auth?mode=login&role=instructor");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header mobile & desktop giống header học viên nhưng cho giảng viên */}
      <InstructorMobileHeader instructor={instructor} onLogout={handleLogout} />
      <div className="hidden md:block">
        <InstructorHeader instructor={instructor} onLogout={handleLogout} />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <InstructorWelcomeSection
          nameOrEmail={instructor.name || instructor.email || "Giảng viên"}
          onGoToCourses={() => router.push("/courses-instructor")}
          onGoToProfile={() => router.push("/information-instructor")}
        />

        <InstructorStatsSection />

        <InstructorTeachingInsightsSection />

        <InstructorRecentCoursesSection />

        <InstructorStudentFeedbackSection />
      </main>
    </div>
  );
}
