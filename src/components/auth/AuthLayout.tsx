import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-8">
          {children}
        </div>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
          © 2025 EduLearn. All rights reserved.
        </p>
      </div>
    </div>
  );
}
