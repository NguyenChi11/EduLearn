import { RotateCcw, Save } from "lucide-react";

import Typography from "@/components/ui/Typography";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Button from "@/components/ui/Button";

interface CourseSettingsHeaderProps {
  isSaving: boolean;
  onSave: () => void;
  onReset: () => void;
}

export default function CourseSettingsHeader({
  isSaving,
  onSave,
  onReset,
}: CourseSettingsHeaderProps) {
  return (
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
          onClick={onSave}
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
          onClick={onReset}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Khôi phục mặc định</span>
        </Button>
      </div>
    </div>
  );
}


