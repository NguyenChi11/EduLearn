import SectionBox from "@/components/ui/SectionBox";
import type { PublicInstructorProfile } from "@/types/instructor-profile-type";

type InstructorProfileBasicSectionProps = {
  profile: PublicInstructorProfile;
  onDisplayNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onAvatarFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InstructorProfileBasicSection({
  profile,
  onDisplayNameChange,
  onRoleChange,
  onAvatarFileChange,
}: InstructorProfileBasicSectionProps) {
  return (
    <SectionBox title="Thông tin cơ bản (hiển thị cho học viên)">
      <div className="grid gap-4 text-xs md:grid-cols-2 md:text-sm">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Tên hiển thị
            </label>
            <input
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="VD: Thầy John Developer, Cô Sarah Smith..."
              value={profile.displayName}
              onChange={(e) => onDisplayNameChange(e.target.value)}
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Tên này sẽ hiển thị ở mọi nơi mà học viên nhìn thấy bạn.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Vai trò / tiêu đề
            </label>
            <input
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="VD: Chuyên gia Frontend, Giảng viên IELTS, Data Scientist..."
              value={profile.role}
              onChange={(e) => onRoleChange(e.target.value)}
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Xuất hiện dưới tên giảng viên (ví dụ: &quot;Chuyên gia Frontend&quot;).
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Ảnh đại diện
            </label>
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.displayName}
                    className="h-14 w-14 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-base font-bold text-white">
                    {profile.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onAvatarFileChange}
                  className="block w-full text-[11px] text-slate-700 file:mr-2 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-slate-800 dark:text-slate-200 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-200"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ảnh được tải lên chỉ được lưu cục bộ cho mục đích demo. Với bản
              production, nên dùng tính năng upload lên máy chủ.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              Gợi ý hiển thị cho học viên
            </p>
            <p className="mt-1">
              Học viên sẽ thấy tên hiển thị, vai trò và ảnh đại diện của bạn ở:
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              <li>Trang chi tiết giảng viên (user side - `/Instructor`)</li>
              <li>Trang chi tiết khóa học mà bạn phụ trách</li>
            </ul>
            <p className="mt-1 text-[11px]">
              Hiện tại hệ thống đang dùng dữ liệu demo; khi kết nối backend
              thật, phần này sẽ là nơi cập nhật dữ liệu cho học viên.
            </p>
          </div>
        </div>
      </div>
    </SectionBox>
  );
}


