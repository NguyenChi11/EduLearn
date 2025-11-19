import Card from "@/components/ui/Card";
import SectionBox from "@/components/ui/SectionBox";
import type { PublicInstructorProfile } from "@/types/instructor-profile-type";

type InstructorProfilePreviewSectionProps = {
  profile: PublicInstructorProfile;
};

export default function InstructorProfilePreviewSection({
  profile,
}: InstructorProfilePreviewSectionProps) {
  const studentPreviewName = profile.displayName;
  const studentPreviewRole = profile.role;
  const studentPreviewExpertise = profile.expertise;
  const studentPreviewBio = profile.bio;

  return (
    <SectionBox title="Xem trước hồ sơ như học viên">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col items-center gap-6 bg-white/90 p-5 md:flex-row md:items-start md:p-6 dark:bg-slate-900/90">
          <div className="shrink-0">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt={studentPreviewName}
                className="h-24 w-24 rounded-full border border-slate-200 object-cover md:h-28 md:w-28 dark:border-slate-700"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-2xl font-bold text-white md:h-28 md:w-28">
                {studentPreviewName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2 text-center text-sm md:text-left">
            <p className="text-lg font-semibold text-slate-900 md:text-xl dark:text-slate-50">
              {studentPreviewName}
            </p>
            <p className="text-xs font-medium text-sky-600 dark:text-sky-400">
              {studentPreviewRole}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Chuyên môn:{" "}
              <span className="font-medium">{studentPreviewExpertise}</span>
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {studentPreviewBio}
            </p>

            {profile.socialLinks.length > 0 && (
              <div className="mt-3 space-y-2 border-t border-slate-100 pt-2 dark:border-slate-800">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                  Liên hệ / theo dõi giảng viên
                </p>
                <ul className="space-y-1">
                  {profile.socialLinks.map((link) => (
                    <li
                      key={link.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-[11px] font-medium text-slate-800 dark:text-slate-100">
                          {link.label}
                        </span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {link.url}
                        </a>
                      </div>
                      <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {link.type.toUpperCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-3 text-xs text-slate-600 md:text-sm dark:text-slate-300">
          <p className="font-semibold text-slate-800 dark:text-slate-100">
            Ghi chú
          </p>
          <p>
            Đây là bản xem trước theo phong cách trang chi tiết giảng viên mà
            học viên sẽ thấy (ví dụ ở route `/Instructor/[id]`). Khi kết nối
            backend, dữ liệu từ trang này có thể được dùng để hiển thị bên phía
            học viên.
          </p>
          <p>
            Hiện tại thông tin chỉ lưu trong trình duyệt của bạn nên sẽ không
            ảnh hưởng đến dữ liệu demo mặc định khác.
          </p>
        </div>
      </div>
    </SectionBox>
  );
}


