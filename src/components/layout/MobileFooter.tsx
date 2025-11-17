import Link from "next/link";
import { BookOpen, Facebook, Instagram, Github } from "lucide-react";

import Icon from "@/components/ui/Icon";

export default function MobileFooter() {
  return (
    <footer className="md:hidden border-t border-slate-200 bg-white/95 text-slate-900 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">
        {/* Logo + tagline */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-600 dark:bg-blue-500 shadow-sm">
              <Icon icon={BookOpen} size="md" className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight">
                EduLearn
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Học tiếng Anh mọi lúc, mọi nơi.
              </span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Khóa học
            </p>
            <Link
              href="/courses"
              className="block rounded-md bg-slate-100 px-3 py-1.5 text-slate-800 text-xs font-medium transition-colors hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Xem tất cả khóa học
            </Link>
          </div>
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Hỗ trợ
            </p>
            <Link
              href="/faq"
              className="block rounded-md bg-slate-100 px-3 py-1.5 text-slate-800 text-xs font-medium transition-colors hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Câu hỏi thường gặp
            </Link>
          </div>
        </div>

        {/* Social + bottom text */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              aria-label="Facebook"
            >
              <Icon icon={Facebook} size="xs" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              aria-label="Instagram"
            >
              <Icon icon={Instagram} size="xs" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              aria-label="Github"
            >
              <Icon icon={Github} size="xs" />
            </button>
          </div>
          <p className="text-[11px] text-right text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} EduLearn
          </p>
        </div>
      </div>
    </footer>
  );
}
