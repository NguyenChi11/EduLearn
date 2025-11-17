import { BarChart3, BookOpen, DollarSign, Users } from "lucide-react";

import SectionBox from "@/components/ui/SectionBox";

export default function InstructorStatsSection() {
  const stats = [
    {
      icon: BookOpen,
      label: "Khóa học đang mở",
      value: "5",
      sub: "bao gồm cả khóa học miễn phí và trả phí",
    },
    {
      icon: Users,
      label: "Học viên đang theo học",
      value: "124",
      sub: "trên tất cả các khóa học của bạn",
    },
    {
      icon: BarChart3,
      label: "Tỉ lệ hoàn thành",
      value: "82%",
      sub: "trung bình trên các khóa học",
    },
    {
      icon: DollarSign,
      label: "Doanh thu tháng này",
      value: "12.3M",
      sub: "VNĐ (số liệu demo)",
    },
  ];

  return (
    <SectionBox title="Tổng quan giảng dạy">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/50 px-4 py-4"
          >
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <item.icon className="h-4 w-4 text-blue-500" />
              <span>{item.label}</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {item.value}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </SectionBox>
  );
}
