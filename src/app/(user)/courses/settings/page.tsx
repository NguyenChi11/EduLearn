/* Trang “Cài đặt học tập” cho Courses */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Save } from "lucide-react";

import { getStoredUser } from "@/utils/auth-utils";
import type { User } from "@/types/user-type";
import type {
  CourseSettings,
  ReminderFrequency,
  DefaultSort,
} from "@/types/course-settings-type";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SuccessPopup from "@/components/ui/SuccessPopup";
import ConfirmPopup from "@/components/ui/ConfirmPopup";
import CourseSettingsHeader from "@/components/(use)/courses/settings/CourseSettingsHeader";
import CourseSettingsNotificationsSection from "@/components/(use)/courses/settings/CourseSettingsNotificationsSection";
import CourseSettingsLearningOptionsSection from "@/components/(use)/courses/settings/CourseSettingsLearningOptionsSection";
import CourseSettingsGoalsSection from "@/components/(use)/courses/settings/CourseSettingsGoalsSection";

const getSettingsKey = (userId: string) => `course_settings_user_${userId}`;

const DEFAULT_SETTINGS: CourseSettings = {
  emailNotifications: true,
  lessonReminder: "daily",
  marketingEmails: false,
  autoPlayNextLesson: true,
  showSubtitlesByDefault: true,
  defaultSort: "popular",
  weeklyLessonsGoal: 5,
  weeklyMinutesGoal: 300,
};

export default function CourseSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<CourseSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.replace("/auth");
      return;
    }
    setUser(storedUser);

    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(getSettingsKey(storedUser.id));
        if (raw) {
          const parsed = JSON.parse(raw) as CourseSettings;
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        } else {
          setSettings(DEFAULT_SETTINGS);
        }
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }
  }, [router]);

  const handleToggle = (field: keyof CourseSettings) => {
    setSettings((prev) =>
      prev ? { ...prev, [field]: !prev[field] as never } : prev
    );
  };

  const handleChange =
    (field: keyof CourseSettings) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "number"
          ? Number(e.target.value || 0)
          : e.target.value;
      setSettings((prev) =>
        prev ? { ...prev, [field]: value as never } : prev
      );
    };

  const handleLessonReminderChange = (val: ReminderFrequency) => {
    setSettings((prev) => (prev ? { ...prev, lessonReminder: val } : prev));
  };

  const handleDefaultSortChange = (val: DefaultSort) => {
    setSettings((prev) => (prev ? { ...prev, defaultSort: val } : prev));
  };

  const handleSave = () => {
    if (!user || !settings || typeof window === "undefined") return;
    setIsSaving(true);
    try {
      localStorage.setItem(getSettingsKey(user.id), JSON.stringify(settings));
      setShowSuccess(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    if (!user) {
      setShowResetConfirm(false);
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem(getSettingsKey(user.id));
    }
    setSettings(DEFAULT_SETTINGS);
    setShowResetConfirm(false);
    setShowSuccess(true);
  };

  if (!user || !settings) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-4 md:py-6 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <Typography variant="h2" as="h1" className="text-xl md:text-2xl">
            Đang tải cài đặt...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-4 md:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-6 md:space-y-8">
        {/* Header */}
        <CourseSettingsHeader
          isSaving={isSaving}
          onSave={handleSave}
          onReset={handleReset}
        />

        {/* Thông báo */}
        <CourseSettingsNotificationsSection
          settings={settings}
          onToggle={handleToggle}
          onLessonReminderChange={handleLessonReminderChange}
        />

        {/* Tùy chọn học */}
        <CourseSettingsLearningOptionsSection
          settings={settings}
          onToggle={handleToggle}
          onDefaultSortChange={handleDefaultSortChange}
        />

        {/* Mục tiêu học tập */}
        <CourseSettingsGoalsSection
          settings={settings}
          onChange={handleChange}
        />

        {/* Footer actions (mobile) */}
        <div className="flex flex-col-reverse gap-2 pt-2 sm:hidden">
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            className="flex items-center justify-center gap-1 text-xs text-slate-500"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khôi phục mặc định</span>
          </Button>
          <PrimaryButton
            type="button"
            className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Đang lưu..." : "Lưu cài đặt"}</span>
          </PrimaryButton>
        </div>
      </div>

      {/* Popups */}
      <SuccessPopup
        open={showSuccess}
        title="Đã lưu cài đặt"
        description="Cài đặt học tập của bạn đã được cập nhật thành công."
        onClose={() => setShowSuccess(false)}
      />

      <ConfirmPopup
        open={showResetConfirm}
        title="Khôi phục cài đặt mặc định?"
        description="Tất cả cài đặt học tập sẽ quay về giá trị mặc định. Bạn có chắc chắn muốn tiếp tục?"
        onCancel={() => setShowResetConfirm(false)}
        onConfirm={confirmReset}
        confirmText="Khôi phục"
        cancelText="Hủy"
      />
    </div>
  );
}
