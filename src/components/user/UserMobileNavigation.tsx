import type { LucideIcon } from "lucide-react";

type UserTab = "public" | "profile" | "photo" | "security";

interface UserMobileNavigationProps {
  tabs: { key: UserTab; label: string; icon: LucideIcon }[];
  activeTab: UserTab;
  onTabChange: (tab: UserTab) => void;
}

export function UserMobileNavigation({
  tabs,
  activeTab,
  onTabChange
}: UserMobileNavigationProps) {
  return (
    <div className="md:hidden mb-6">
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="px-4 py-4 border-b">
          <p className="text-sm font-semibold">Bảng điều hướng</p>
          <p className="text-xs text-muted-foreground">
            Chọn tab để chỉnh sửa hồ sơ
          </p>
        </div>
        <nav className="flex flex-col">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
