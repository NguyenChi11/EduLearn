import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

interface InstructorsHeaderProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function InstructorsHeader({
  hasActiveFilters,
  onClearFilters,
}: InstructorsHeaderProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <Typography
          as="h1"
          variant="h1"
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50"
        >
          Danh sách giảng viên
        </Typography>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Tìm kiếm, lọc và khám phá đội ngũ giảng viên của EduLearn.
        </p>
      </div>

      {hasActiveFilters && (
        <Button
          variant="secondary"
          size="sm"
          type="button"
          onClick={onClearFilters}
        >
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );
}


