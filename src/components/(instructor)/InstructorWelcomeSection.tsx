import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";

interface InstructorWelcomeSectionProps {
  nameOrEmail: string;
  onGoToCourses: () => void;
  onGoToProfile: () => void;
}

export default function InstructorWelcomeSection({
  nameOrEmail,
  onGoToCourses,
  onGoToProfile,
}: InstructorWelcomeSectionProps) {
  return (
    <SectionBox className="mb-8">
      <div className="space-y-3">
        <Typography
          variant="h2"
          as="h1"
          className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
        >
          Xin chào, {nameOrEmail}
        </Typography>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Chào mừng bạn đến với bảng điều khiển giảng viên EduLearn. Tại đây bạn
          có thể theo dõi hoạt động giảng dạy, quản lý khóa học và cập nhật hồ
          sơ cá nhân của mình.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={onGoToCourses}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 px-4 py-5 text-left hover:border-blue-500 hover:bg-blue-50/60 dark:hover:border-blue-400 dark:hover:bg-blue-900/20 transition-colors"
        >
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
            Quản lý khóa học
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Xem danh sách khóa học bạn đang giảng dạy, chỉnh sửa nội dung và cập
            nhật tài liệu, bài tập cho học viên.
          </p>
        </button>

        <button
          type="button"
          onClick={onGoToProfile}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 px-4 py-5 text-left hover:border-blue-500 hover:bg-blue-50/60 dark:hover:border-blue-400 dark:hover:bg-blue-900/20 transition-colors"
        >
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
            Hồ sơ giảng viên
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Cập nhật thông tin cá nhân, mô tả chuyên môn, hình ảnh đại diện và
            các thông tin hiển thị với học viên.
          </p>
        </button>
      </div>
    </SectionBox>
  );
}
