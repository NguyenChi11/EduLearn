"use client";

import { ThemeExamples } from "@/components/ThemeExamples";
/**
 * Theme Showcase Page
 * Displays all theme elements and design tokens
 */

import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import { useStoredUser } from "@/hooks/useStoredUser";

export default function ThemePage() {
  const router = useRouter();
  const { user, logout } = useStoredUser();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <MobileHeader user={user} onLogout={handleLogout} />
      <div className="hidden md:block">
        <Header user={user} onLogout={handleLogout} />
      </div>
      <main className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 py-6 px-6 md:px-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
              Theme System Showcase
            </h1>
            <Link
              href="/courses"
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Back to Courses
            </Link>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            View all design tokens, colors, typography, and components
          </p>
        </header>

        {/* Content */}
        <div className="p-6 md:p-8">
          <ThemeExamples />
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-6 md:px-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Theme System • Tailwind CSS + Custom Design Tokens
          </p>
        </footer>
      </main>
    </div>
  );
}
