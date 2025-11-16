// components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Search,
  Bell,
  Compass,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface HeaderProps {
  user: { id: string; email: string; name: string } | null;
  onLogout: () => void;
}

// Header offset: h-28 (112px) cho mobile với navigation, h-20 (80px) cho desktop
const HEADER_OFFSET_CLASS = "h-28 md:h-20";

export default function Header({ user, onLogout }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/courses");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Nếu scroll xuống và vượt quá 100px, ẩn header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      // Nếu scroll lên, hiện header
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // Nếu ở đầu trang, luôn hiện header
      else if (currentScrollY < 10) {
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
            {/* Phần 1: Logo và EduLearn */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0"
              onClick={() => handleNavigate("/")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleNavigate("/")}
            >
              <div className="p-2 rounded-lg bg-blue-600 dark:bg-blue-500">
                <Icon icon={BookOpen} size="md" className="text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                EduLearn
              </h1>
            </div>

            {/* Phần 2: Tìm kiếm, Khóa học, Explore */}
            <nav className="hidden md:flex items-center gap-4 flex-1 max-w-2xl mx-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </form>

              {/* Navigation Links */}
              <button
                type="button"
                onClick={() => handleNavigate("/courses")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Icon icon={BookOpen} size="sm" />
                <span>Khóa học</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("/courses")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Icon icon={Compass} size="sm" />
                <span>Explore</span>
              </button>
            </nav>

            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => handleNavigate("/courses")}
              className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Search"
            >
              <Icon icon={Search} size="md" />
            </button>

            {/* Phần 3: Đăng ký/Đăng nhập, User, Thông báo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {user ? (
                <>
                  {/* Notification Bell */}
                  <button
                    type="button"
                    className="relative p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Notifications"
                  >
                    <Icon icon={Bell} size="md" />
                    {/* Notification Badge */}
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* User Profile */}
                  <button
                    type="button"
                    onClick={() => handleNavigate("/user")}
                    className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Icon icon={User} size="sm" />
                    <span className="hidden sm:inline truncate max-w-32">
                      {user.name || user.email}
                    </span>
                  </button>

                  {/* Logout Button (Mobile) */}
                  <button
                    type="button"
                    onClick={onLogout}
                    className="md:hidden p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Logout"
                  >
                    <Icon icon={LogOut} size="md" />
                  </button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => handleNavigate("/auth?mode=login")}
                    className="hidden sm:flex items-center gap-2"
                    size="sm"
                  >
                    <Icon icon={LogIn} size="sm" />
                    <span>Đăng nhập</span>
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => handleNavigate("/auth?mode=signup")}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Icon icon={UserPlus} size="sm" />
                    <span className="hidden sm:inline">Đăng ký</span>
                    <span className="sm:hidden">Đăng ký</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleNavigate("/courses")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Icon icon={BookOpen} size="sm" />
              <span>Khóa học</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/courses")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Icon icon={Compass} size="sm" />
              <span>Explore</span>
            </button>
          </div>
        </div>
      </header>
      <div className={HEADER_OFFSET_CLASS} aria-hidden />
    </>
  );
}
