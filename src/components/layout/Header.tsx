// components/layout/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  BookOpen,
  LogIn,
  UserPlus,
  LogOut,
  User,
  BookOpen as BookIcon,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface HeaderProps {
  user: { id: string; email: string; name: string } | null;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => handleNavigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavigate("/")}
        >
          <div className="p-2 rounded-lg bg-blue-600 dark:bg-blue-500">
            <Icon icon={BookOpen} size="md" className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            EduLearn
          </h1>
        </div>

        {/* Auth Actions */}
        <nav className="flex gap-3 items-center">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <Icon icon={User} size="sm" />
                <span className="truncate max-w-32">
                  {user.name || user.email}
                </span>
              </div>

              <Button
                variant="primary"
                onClick={() => handleNavigate("/courses")}
                className="hidden sm:flex items-center gap-2"
              >
                <Icon icon={BookIcon} size="sm" />
                Khóa học
              </Button>

              <Button
                variant="secondary"
                onClick={onLogout}
                className="flex items-center gap-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Icon icon={LogOut} size="sm" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => handleNavigate("/auth?mode=login")}
                className="flex items-center gap-2"
              >
                <Icon icon={LogIn} size="sm" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </Button>

              <Button
                variant="primary"
                onClick={() => handleNavigate("/auth?mode=signup")}
                className="flex items-center gap-2"
              >
                <Icon icon={UserPlus} size="sm" />
                <span className="hidden sm:inline">Đăng ký</span>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
