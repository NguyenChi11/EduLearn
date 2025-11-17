"use client";

import { BarChart3, Users } from "lucide-react";

import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";

export default function InstructorAnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Thống kê khóa học
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Nắm bắt nhanh tình hình tham gia, tỷ lệ hoàn thành và mức độ tương
            tác của học viên trong các khóa học.
          </Typography>
        </header>

        <SectionBox title="Tổng quan (demo)">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Tổng số học viên
                </p>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                1.248
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Số học viên trên tất cả các khóa (dữ liệu demo)
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Tỷ lệ hoàn thành trung bình
                </p>
                <BarChart3 className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                62%
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Tỷ lệ hoàn thành trung bình của các học viên (dữ liệu demo)
              </p>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
