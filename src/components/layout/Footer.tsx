import Link from "next/link";
import { BookOpen, Facebook, Instagram, Github, Mail } from "lucide-react";

import Icon from "@/components/ui/Icon";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/95 text-slate-900 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo + mô tả ngắn */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-600 dark:bg-blue-500 shadow-sm">
                <Icon icon={BookOpen} size="md" className="text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                EduLearn
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              Nền tảng học tập hiện đại giúp bạn chinh phục tiếng Anh từ cơ bản
              đến nâng cao với lộ trình rõ ràng, tương tác và cá nhân hóa.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Theo dõi trên Facebook"
              >
                <Icon icon={Facebook} size="sm" />
              </button>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Theo dõi trên Instagram"
              >
                <Icon icon={Instagram} size="sm" />
              </button>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Theo dõi trên Github"
              >
                <Icon icon={Github} size="sm" />
              </button>
            </div>
          </div>

          {/* Cột điều hướng 1 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">
              Khóa học
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href="/courses"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Tất cả khóa học
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?level=S"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Sơ cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?level=TC"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Trung cấp
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?level=MTC"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Nâng cao
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột điều hướng 2 */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">
              Tài nguyên
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href="/Instructor"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Giảng viên
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Học viên nói gì?
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/70 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} EduLearn. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <Icon icon={Mail} size="xs" />
              <span>Liên hệ hỗ trợ</span>
            </button>
            <div className="flex items-center gap-3">
              <Link
                href="/terms"
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                Điều khoản
              </Link>
              <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" />
              <Link
                href="/privacy"
                className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
              >
                Bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


