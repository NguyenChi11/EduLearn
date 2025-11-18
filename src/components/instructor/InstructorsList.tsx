import Card from "@/components/ui/Card";
import type { InstructorWithStats } from "@/types/instructor-type";
import InstructorCard from "@/components/instructor/InstructorCard";

interface InstructorsListProps {
  instructors: InstructorWithStats[];
}

export default function InstructorsList({ instructors }: InstructorsListProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-600 dark:text-slate-400">
        Đang hiển thị{" "}
        <span className="font-semibold">{instructors.length}</span> giảng viên
      </p>

      {instructors.length === 0 ? (
        <Card className="p-5 sm:p-6 md:p-8 text-center">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Không tìm thấy giảng viên phù hợp với bộ lọc hiện tại.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      )}
    </div>
  );
}


