import type { User } from "@/types/user-type";
import type { LucideIcon } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import SidebarTab from "./SidebarTab";

type UserTab = "public" | "profile" | "photo" | "security";

interface UserDesktopSidebarProps {
  user: User;
  tabs: { key: UserTab; label: string; icon: LucideIcon }[];
  activeTab: UserTab;
  onTabChange: (tab: UserTab) => void;
}

export function UserDesktopSidebar({
  user,
  tabs,
  activeTab,
  onTabChange
}: UserDesktopSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col rounded-lg border bg-card shadow-sm md:sticky md:top-24 h-fit">
      <div className="px-6 py-5 border-b text-left">
        <p className="text-sm font-semibold">Bảng điều khiển</p>
        <p className="text-xs text-muted-foreground">
          Chọn tab để cập nhật hồ sơ của bạn
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 border-b px-6 py-8 text-center">
        <UserAvatar
          src={user.avatar}
          name={user.name}
          email={user.email}
          size="md"
        />
        <div>
          <p className="text-sm font-semibold">
            {user.name || "Người dùng"}
          </p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {tabs.map((tab) => (
          <SidebarTab
            key={tab.key}
            icon={tab.icon}
            label={tab.label}
            active={activeTab === tab.key}
            onClick={() => onTabChange(tab.key)}
          />
        ))}
      </nav>
    </aside>
  );
}
