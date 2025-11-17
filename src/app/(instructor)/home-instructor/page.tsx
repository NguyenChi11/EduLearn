"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { clearStoredInstructor, getStoredInstructor } from "@/utils/auth-utils";
import InstructorHeader from "@/components/layout/InstructorHeader";
import InstructorMobileHeader from "@/components/layout/InstructorMobileHeader";
import Spinner from "@/components/ui/Spinner";
import InstructorWelcomeSection from "@/components/(instructor)/InstructorWelcomeSection";
import InstructorStatsSection from "@/components/(instructor)/InstructorStatsSection";
import InstructorTeachingInsightsSection from "@/components/(instructor)/InstructorTeachingInsightsSection";
import InstructorRecentCoursesSection from "@/components/(instructor)/InstructorRecentCoursesSection";
import InstructorStudentFeedbackSection from "@/components/(instructor)/InstructorStudentFeedbackSection";

interface InstructorUser {
  id: string;
  email: string;
  name: string;
}

export default function InstructorHomePage() {
  const router = useRouter();
  const [instructor, setInstructor] = useState<InstructorUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredInstructor();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInstructor(stored);
      setIsLoading(false);
    } else {
      router.replace("/auth?mode=login&role=instructor");
    }
  }, [router]);

  const handleLogout = () => {
    clearStoredInstructor();
    setInstructor(null);
    router.replace("/auth?mode=login&role=instructor");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
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
          nameOrEmail={instructor?.name || instructor?.email || "Giảng viên"}
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
