import { BookOpenCheck } from "lucide-react";

import SectionBox from "@/components/ui/SectionBox";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import type { CourseSettings, DefaultSort } from "@/types/course-settings-type";

interface CourseSettingsLearningOptionsSectionProps {
  settings: CourseSettings;
  onToggle: (field: keyof CourseSettings) => void;
  onDefaultSortChange: (val: DefaultSort) => void;
}

export default function CourseSettingsLearningOptionsSection({
  settings,
  onToggle,
  onDefaultSortChange,
}: CourseSettingsLearningOptionsSectionProps) {
  return (
    <SectionBox
      title="Tùy chọn học"
      extra={
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <BookOpenCheck className="h-4 w-4" />
          <span>Điều chỉnh cách phát bài và hiển thị nội dung</span>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <Label className="mb-1">Tự động chuyển sang bài tiếp theo</Label>
            <p className="text-xs sm:text-sm text-slate-500">
              Sau khi hoàn thành một bài học, tự động chuyển sang bài kế tiếp
              trong khoá học.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onToggle("autoPlayNextLesson")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors ${
              settings.autoPlayNextLesson
                ? "border-blue-600 bg-blue-600"
                : "border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-800"
            }`}
            aria-pressed={settings.autoPlayNextLesson}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                settings.autoPlayNextLesson ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <Label className="mb-1">Luôn hiển thị phụ đề (nếu có)</Label>
            <p className="text-xs sm:text-sm text-slate-500">
              Bật sẵn phụ đề để giúp bạn theo dõi nội dung tốt hơn.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onToggle("showSubtitlesByDefault")}
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
            onChange={(val) => onDefaultSortChange(val as DefaultSort)}
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
  );
}
