/* Trang “Cài đặt học tập” cho Courses */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BookOpenCheck, RotateCcw, Save } from "lucide-react";

import { getStoredUser } from "@/utils/auth-utils";
import type { User } from "@/types/user-type";
import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SuccessPopup from "@/components/ui/SuccessPopup";
import ConfirmPopup from "@/components/ui/ConfirmPopup";
import Select from "@/components/ui/Select";

type ReminderFrequency = "none" | "daily" | "weekly";
type DefaultSort = "popular" | "rating" | "title-asc";

interface CourseSettings {
  emailNotifications: boolean;
  lessonReminder: ReminderFrequency;
  marketingEmails: boolean;
  autoPlayNextLesson: boolean;
  showSubtitlesByDefault: boolean;
  defaultSort: DefaultSort;
  weeklyLessonsGoal: number;
  weeklyMinutesGoal: number;
}

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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <Typography variant="h2" as="h1">
            Đang tải cài đặt...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Typography variant="h2" as="h1">
              Cài đặt học tập
            </Typography>
            <Typography variant="p" className="max-w-2xl">
              Tuỳ chỉnh trải nghiệm học tập của bạn trên EduLearn: thông báo, tự
              động phát bài, mục tiêu học mỗi tuần và hơn thế nữa.
            </Typography>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <PrimaryButton
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Đang lưu..." : "Lưu cài đặt"}</span>
            </PrimaryButton>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center justify-center gap-1 text-sm text-slate-500"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Khôi phục mặc định</span>
            </Button>
          </div>
        </div>

        {/* Thông báo */}
        <SectionBox
          title="Thông báo"
          extra={
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Bell className="w-4 h-4" />
              <span>Quản lý cách bạn nhận thông báo từ EduLearn</span>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Label className="mb-1">Email thông báo học tập</Label>
                <p className="text-sm text-slate-500">
                  Nhận email khi có bài mới, nhắc nhở hoàn thành bài học hoặc
                  cập nhật quan trọng từ khoá học.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("emailNotifications")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors ${
                  settings.emailNotifications
                    ? "border-blue-600 bg-blue-600"
                    : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-800"
                }`}
                aria-pressed={settings.emailNotifications}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    settings.emailNotifications
                      ? "translate-x-4"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Select
                id="lessonReminder"
                label="Tần suất nhắc nhở học"
                value={settings.lessonReminder}
                onChange={(val) =>
                  setSettings((prev) =>
                    prev
                      ? { ...prev, lessonReminder: val as ReminderFrequency }
                      : prev
                  )
                }
                options={[
                  { value: "none", label: "Không nhắc nhở" },
                  { value: "daily", label: "Hàng ngày" },
                  { value: "weekly", label: "Hàng tuần" },
                ]}
                placeholder="Chọn tần suất"
                hint="Dùng để hiển thị nhắc nhở trong ứng dụng (không gửi email)."
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label className="mb-1">Email giới thiệu khoá học mới</Label>
                  <p className="text-sm text-slate-500">
                    Nhận email khi có khoá học phù hợp với lĩnh vực bạn quan
                    tâm.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("marketingEmails")}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors ${
                    settings.marketingEmails
                      ? "border-blue-600 bg-blue-600"
                      : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-800"
                  }`}
                  aria-pressed={settings.marketingEmails}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      settings.marketingEmails
                        ? "translate-x-4"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </SectionBox>

        {/* Tùy chọn học */}
        <SectionBox
          title="Tùy chọn học"
          extra={
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <BookOpenCheck className="w-4 h-4" />
              <span>Điều chỉnh cách phát bài và hiển thị nội dung</span>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Label className="mb-1">
                  Tự động chuyển sang bài tiếp theo
                </Label>
                <p className="text-sm text-slate-500">
                  Sau khi hoàn thành một bài học, tự động chuyển sang bài kế
                  tiếp trong khoá học.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("autoPlayNextLesson")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors ${
                  settings.autoPlayNextLesson
                    ? "border-blue-600 bg-blue-600"
                    : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-800"
                }`}
                aria-pressed={settings.autoPlayNextLesson}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    settings.autoPlayNextLesson
                      ? "translate-x-4"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <Label className="mb-1">Luôn hiển thị phụ đề (nếu có)</Label>
                <p className="text-sm text-slate-500">
                  Bật sẵn phụ đề để giúp bạn theo dõi nội dung tốt hơn.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("showSubtitlesByDefault")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors ${
                  settings.showSubtitlesByDefault
                    ? "border-blue-600 bg-blue-600"
                    : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-800"
                }`}
                aria-pressed={settings.showSubtitlesByDefault}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    settings.showSubtitlesByDefault
                      ? "translate-x-4"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="max-w-sm">
              <Select
                id="defaultSort"
                label="Cách sắp xếp khoá học mặc định"
                value={settings.defaultSort}
                onChange={(val) =>
                  setSettings((prev) =>
                    prev ? { ...prev, defaultSort: val as DefaultSort } : prev
                  )
                }
                options={[
                  { value: "popular", label: "Phổ biến nhất" },
                  { value: "rating", label: "Đánh giá cao nhất" },
                  { value: "title-asc", label: "Tên khóa (A-Z)" },
                ]}
                placeholder="Chọn cách sắp xếp"
                hint="Áp dụng khi bạn xem danh sách khoá học."
              />
            </div>
          </div>
        </SectionBox>

        {/* Mục tiêu học tập */}
        <SectionBox title="Mục tiêu học tập">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Input
                type="number"
                min={0}
                label="Số bài học mục tiêu mỗi tuần"
                value={settings.weeklyLessonsGoal}
                onChange={handleChange("weeklyLessonsGoal")}
                hint="Giúp EduLearn gợi ý lộ trình phù hợp với tốc độ học của bạn."
              />
            </div>
            <div>
              <Input
                type="number"
                min={0}
                label="Số phút học mục tiêu mỗi tuần"
                value={settings.weeklyMinutesGoal}
                onChange={handleChange("weeklyMinutesGoal")}
                hint="Ví dụ: 150 phút = 2.5 giờ, 300 phút = 5 giờ mỗi tuần."
              />
            </div>
          </div>
        </SectionBox>

        {/* Footer actions (mobile) */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            className="flex items-center gap-1 text-sm text-slate-500"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khôi phục mặc định</span>
          </Button>
          <PrimaryButton
            type="button"
            className="flex items-center justify-center gap-2 px-6"
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
