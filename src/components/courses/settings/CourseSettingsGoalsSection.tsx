import SectionBox from "@/components/ui/SectionBox";
import Input from "@/components/ui/Input";
import type { CourseSettings } from "@/types/course-settings-type";

interface CourseSettingsGoalsSectionProps {
  settings: CourseSettings;
  onChange: (
    field: keyof CourseSettings
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function CourseSettingsGoalsSection({
  settings,
  onChange,
}: CourseSettingsGoalsSectionProps) {
  return (
    <SectionBox title="Mục tiêu học tập">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Input
            type="number"
            min={0}
            label="Số bài học mục tiêu mỗi tuần"
            value={settings.weeklyLessonsGoal}
            onChange={onChange("weeklyLessonsGoal")}
            hint="Giúp EduLearn gợi ý lộ trình phù hợp với tốc độ học của bạn."
          />
        </div>
        <div>
          <Input
            type="number"
            min={0}
            label="Số phút học mục tiêu mỗi tuần"
            value={settings.weeklyMinutesGoal}
            onChange={onChange("weeklyMinutesGoal")}
            hint="Ví dụ: 150 phút = 2.5 giờ, 300 phút = 5 giờ mỗi tuần."
          />
        </div>
      </div>
    </SectionBox>
  );
}
