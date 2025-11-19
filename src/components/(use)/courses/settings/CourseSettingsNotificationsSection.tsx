import { Bell } from "lucide-react";

import SectionBox from "@/components/ui/SectionBox";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import type {
  CourseSettings,
  ReminderFrequency,
} from "@/types/course-settings-type";

interface CourseSettingsNotificationsSectionProps {
  settings: CourseSettings;
  onToggle: (field: keyof CourseSettings) => void;
  onLessonReminderChange: (val: ReminderFrequency) => void;
}

export default function CourseSettingsNotificationsSection({
  settings,
  onToggle,
  onLessonReminderChange,
}: CourseSettingsNotificationsSectionProps) {
  return (
    <SectionBox
      title="Thông báo"
      extra={
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <Bell className="h-4 w-4" />
          <span>Quản lý cách bạn nhận thông báo từ EduLearn</span>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <Label className="mb-1">Email thông báo học tập</Label>
            <p className="text-xs sm:text-sm text-slate-500">
              Nhận email khi có bài mới, nhắc nhở hoàn thành bài học hoặc cập
              nhật quan trọng từ khoá học.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onToggle("emailNotifications")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors ${
              settings.emailNotifications
                ? "border-blue-600 bg-blue-600"
                : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-800"
            }`}
            aria-pressed={settings.emailNotifications}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                settings.emailNotifications ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select
            id="lessonReminder"
            label="Tần suất nhắc nhở học"
            value={settings.lessonReminder}
            onChange={(val) => onLessonReminderChange(val as ReminderFrequency)}
            options={[
              { value: "none", label: "Không nhắc nhở" },
              { value: "daily", label: "Hàng ngày" },
              { value: "weekly", label: "Hàng tuần" },
            ]}
            placeholder="Chọn tần suất"
            hint="Dùng để hiển thị nhắc nhở trong ứng dụng (không gửi email)."
          />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <Label className="mb-1">Email giới thiệu khoá học mới</Label>
              <p className="text-xs sm:text-sm text-slate-500">
                Nhận email khi có khoá học phù hợp với lĩnh vực bạn quan tâm.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onToggle("marketingEmails")}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors ${
                settings.marketingEmails
                  ? "border-blue-600 bg-blue-600"
                  : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-800"
              }`}
              aria-pressed={settings.marketingEmails}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  settings.marketingEmails ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </SectionBox>
  );
}


