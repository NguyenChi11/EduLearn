import SectionBox from "@/components/ui/SectionBox";
import type {
  PublicInstructorProfile,
  SocialLink,
  SocialLinkType,
} from "@/types/instructor-profile-type";

type InstructorProfileLinksSectionProps = {
  profile: PublicInstructorProfile;
  newSocial: SocialLink;
  onNewSocialChange: (next: SocialLink) => void;
  onAddSocialLink: () => void;
  onDeleteSocialLink: (id: string) => void;
};

export default function InstructorProfileLinksSection({
  profile,
  newSocial,
  onNewSocialChange,
  onAddSocialLink,
  onDeleteSocialLink,
}: InstructorProfileLinksSectionProps) {
  return (
    <SectionBox title="Liên hệ & mạng xã hội">
      <div className="space-y-4 text-xs md:text-sm">
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-900/60">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            Thêm kênh liên hệ / mạng xã hội
          </p>
          <div className="mt-2 grid gap-2 md:grid-cols-3">
            <select
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              value={newSocial.type}
              onChange={(e) =>
                onNewSocialChange({
                  ...newSocial,
                  type: e.target.value as SocialLinkType,
                })
              }
            >
              <option value="website">Website cá nhân</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
              <option value="linkedin">LinkedIn</option>
              <option value="other">Khác</option>
            </select>
            <input
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Tên hiển thị (VD: Fanpage Facebook, Kênh YouTube...)"
              value={newSocial.label}
              onChange={(e) =>
                onNewSocialChange({
                  ...newSocial,
                  label: e.target.value,
                })
              }
            />
            <input
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 md:col-span-1"
              placeholder="Link (https://...)"
              value={newSocial.url}
              onChange={(e) =>
                onNewSocialChange({
                  ...newSocial,
                  url: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={onAddSocialLink}
              disabled={!newSocial.label.trim() || !newSocial.url.trim()}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Thêm liên kết
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            Danh sách liên kết hiện có ({profile.socialLinks.length})
          </p>
          {profile.socialLinks.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chưa có liên kết nào. Bạn có thể thêm website cá nhân, fanpage
              hoặc các kênh mạng xã hội liên quan đến việc giảng dạy.
            </p>
          ) : (
            <ul className="space-y-2">
              {profile.socialLinks.map((link) => (
                <li
                  key={link.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-slate-800 dark:text-slate-100">
                      {link.label}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {link.type.toUpperCase()}
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
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteSocialLink(link.id)}
                    className="text-[11px] font-medium text-red-500 hover:text-red-600"
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SectionBox>
  );
}


