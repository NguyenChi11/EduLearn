"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LogIn, LogOut, User, Menu, X } from "lucide-react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface InstructorMobileHeaderProps {
  instructor: { id: string; email: string; name: string } | null;
  onLogout: () => void;
}

export default function InstructorMobileHeader({
  instructor,
  onLogout,
}: InstructorMobileHeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-backdrop-filter:backdrop-blur md:hidden">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none shrink-0"
              onClick={() => handleNavigate("/home-instructor")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && handleNavigate("/home-instructor")
              }
            >
              <div className="p-2 rounded-lg bg-blue-600 dark:bg-blue-500">
                <Icon icon={BookOpen} size="md" className="text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                  EduLearn
                </h1>
                <span className="text-[11px] font-medium text-blue-600 dark:text-blue-300">
                  Instructor
                </span>
              </div>
            </div>

            {/* Actions: user/login + menu */}
            <div className="flex items-center gap-2">
              {instructor ? (
                <button
                  type="button"
                  onClick={() => handleNavigate("/information-instructor")}
                  className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Icon icon={User} size="sm" />
                  <span className="truncate max-w-[80px]">
                    {instructor.name || instructor.email}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleNavigate("/auth?mode=login&role=instructor")
                  }
                  className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Icon icon={LogIn} size="sm" />
                  <span>Đăng nhập</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Mở menu điều hướng"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar mobile cho giảng viên */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 md:hidden ${
          isMenuOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-y-0 right-0  w-full bg-slate-950 text-slate-50 shadow-xl border-l border-slate-800/80 transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col p-4 gap-4">
            <nav className="mt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNavigate("/home-instructor")}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <span>Trang chủ</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/courses-instructor")}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <span>Khóa học của tôi</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/information-instructor")}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <span>Thông tin cá nhân</span>
              </button>
            </nav>

            <div className="mt-auto border-t border-slate-800 pt-4">
              {instructor ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md px-3 py-2 transition-colors w-full"
                >
                  <Icon icon={LogOut} size="sm" />
                  <span>Đăng xuất</span>
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleNavigate("/auth?mode=login&role=instructor")
                    }
                    size="sm"
                    className="w-full"
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleNavigate("/auth?mode=signup&role=instructor")
                    }
                    size="sm"
                    className="w-full"
                  >
                    Đăng ký
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Offset cho header cố định trên mobile */}
      <div className="h-16 md:h-0" aria-hidden />
    </>
  );
}


