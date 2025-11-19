import { Search, X } from "lucide-react";

import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import type { InstructorSortOption } from "@/types/instructor-type";

interface InstructorsFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: InstructorSortOption;
  onSortChange: (value: InstructorSortOption) => void;
  roles: string[];
  selectedRoles: string[];
  onRoleToggle: (role: string) => void;
}

export default function InstructorsFilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  roles,
  selectedRoles,
  onRoleToggle,
}: InstructorsFilterBarProps) {
  return (
    <Card className="space-y-4 p-3 sm:p-4 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, chuyên môn hoặc vai trò..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-sm text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300"
              aria-label="Xóa tìm kiếm"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort controls */}
        <div className="mt-2 flex items-center gap-2 md:mt-0">
          <span className="text-[11px] sm:text-xs md:text-sm text-slate-600 dark:text-slate-400">
            Sắp xếp
          </span>
          <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-slate-50/60 p-0.5 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/60">
            <button
              type="button"
              onClick={() => onSortChange("name-asc")}
              className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs md:text-sm rounded-full font-medium ${
                sortBy === "name-asc"
                  ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Tên A-Z
            </button>
            <button
              type="button"
              onClick={() => onSortChange("name-desc")}
              className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs md:text-sm rounded-full font-medium ${
                sortBy === "name-desc"
                  ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Tên Z-A
            </button>
            <button
              type="button"
              onClick={() => onSortChange("courses-desc")}
              className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs md:text-sm rounded-full font-medium ${
                sortBy === "courses-desc"
                  ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              Nhiều khóa học
            </button>
          </div>
        </div>
      </div>

      {/* Role filters */}
      {roles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Vai trò:
          </span>
          {roles.map((role) => {
            const active = selectedRoles.includes(role);
            return (
              <button
                key={role}
                type="button"
                onClick={() => onRoleToggle(role)}
                className="focus:outline-none"
              >
                <Tag
                  className={`text-xs md:text-sm ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {role}
                </Tag>
              </button>
            );
          })}
        </div>
      )}
    </Card>
  );
}


