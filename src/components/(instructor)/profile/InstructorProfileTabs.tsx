import SectionBox from "@/components/ui/SectionBox";
import type { ProfileTab } from "@/types/instructor-profile-type";

type InstructorProfileTabsProps = {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  onResetProfile: () => void;
};

export default function InstructorProfileTabs({
  activeTab,
  onTabChange,
  onResetProfile,
}: InstructorProfileTabsProps) {
  return (
    <SectionBox>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => onTabChange("basic")}
            className={`rounded-full px-4 py-1.5 font-semibold transition ${
              activeTab === "basic"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            Thông tin cơ bản
          </button>
          <button
            type="button"
            onClick={() => onTabChange("bio")}
            className={`rounded-full px-4 py-1.5 font-semibold transition ${
              activeTab === "bio"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            Giới thiệu & chuyên môn
          </button>
          <button
            type="button"
            onClick={() => onTabChange("links")}
            className={`rounded-full px-4 py-1.5 font-semibold transition ${
              activeTab === "links"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            Liên hệ & mạng xã hội
          </button>
          <button
            type="button"
            onClick={() => onTabChange("preview")}
            className={`rounded-full px-4 py-1.5 font-semibold transition ${
              activeTab === "preview"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            Xem trước như học viên
          </button>
        </div>

        <button
          type="button"
          onClick={onResetProfile}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Đặt lại về mặc định
        </button>
      </div>
    </SectionBox>
  );
}


