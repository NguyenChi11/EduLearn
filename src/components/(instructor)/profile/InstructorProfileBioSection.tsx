import SectionBox from "@/components/ui/SectionBox";
import type { PublicInstructorProfile } from "@/types/instructor-profile-type";

type InstructorProfileBioSectionProps = {
  profile: PublicInstructorProfile;
  onExpertiseChange: (value: string) => void;
  onBioChange: (value: string) => void;
};

export default function InstructorProfileBioSection({
  profile,
  onExpertiseChange,
  onBioChange,
}: InstructorProfileBioSectionProps) {
  return (
    <SectionBox title="Giới thiệu & chuyên môn">
      <div className="grid gap-4 text-xs md:grid-cols-2 md:text-sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Chuyên môn chính
            </label>
            <input
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="VD: React, TypeScript, UI/UX, IELTS 7.0+, Machine Learning..."
              value={profile.expertise}
              onChange={(e) => onExpertiseChange(e.target.value)}
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Học viên sẽ thấy dòng này để hiểu bạn giỏi về lĩnh vực nào.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Đoạn giới thiệu (bio)
            </label>
            <textarea
              className="min-h-[140px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Ví dụ: Tôi có hơn 5 năm kinh nghiệm giảng dạy..., từng giúp X học viên đạt mục tiêu..., phong cách dạy tập trung vào..."
              value={profile.bio}
              onChange={(e) => onBioChange(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              Gợi ý nội dung giới thiệu
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              <li>Số năm kinh nghiệm giảng dạy.</li>
              <li>Những chứng chỉ, thành tích nổi bật (nếu có).</li>
              <li>Phong cách giảng dạy và điều học viên sẽ nhận được.</li>
              <li>Đối tượng học viên phù hợp với bạn.</li>
            </ul>
            <p className="mt-2 text-[11px]">
              Đoạn giới thiệu rõ ràng, chân thực sẽ giúp tăng tỷ lệ học viên
              đăng ký khóa học của bạn.
            </p>
          </div>
        </div>
      </div>
    </SectionBox>
  );
}


