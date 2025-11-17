// components/layout/InstructorHeader.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LogOut, User } from "lucide-react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface InstructorHeaderProps {
  instructor: { id: string; email: string; name: string } | null;
  onLogout: () => void;
}

// Header offset giống header học viên
const HEADER_OFFSET_CLASS = "h-18 md:h-20";

export default function InstructorHeader({
  instructor,
  onLogout,
}: InstructorHeaderProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY < 10) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-backdrop-filter:backdrop-blur transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo + brand */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none shrink-0"
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
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                  EduLearn
                </h1>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-300">
                  Instructor Portal
                </span>
              </div>
            </div>

            {/* Navigation cho giảng viên */}
            <nav className="flex items-center gap-3 flex-1 justify-center">
              <button
                type="button"
                onClick={() => handleNavigate("/home-instructor")}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Trang chủ
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/courses-instructor")}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Khóa học của tôi
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("/information-instructor")}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Thông tin cá nhân
              </button>
            </nav>

            {/* Khu vực user / logout */}
            <div className="flex items-center gap-2 shrink-0">
              {instructor ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleNavigate("/information-instructor")}
                    className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Icon icon={User} size="sm" />
                    <span className="hidden sm:inline truncate max-w-32">
                      {instructor.name || instructor.email}
                    </span>
                  </button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                  >
                    <Icon icon={LogOut} size="sm" />
                    <span className="hidden sm:inline">Đăng xuất</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleNavigate("/auth?mode=login&role=instructor")
                    }
                    className="hidden sm:flex items-center gap-2"
                    size="sm"
                  >
                    <span>Đăng nhập</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className={HEADER_OFFSET_CLASS} aria-hidden />
    </>
  );
}


