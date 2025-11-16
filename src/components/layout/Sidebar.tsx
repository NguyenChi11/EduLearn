"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  BookOpen,
  Grid3X3,
  Search,
  LogOut,
  Menu,
  BarChart3,
  Settings,
} from "lucide-react";
import { clearStoredUser } from "@/utils/auth-utils";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userName?: string;
  onCollapse?: (collapsed: boolean) => void; // thông báo ra layout
}

export default function Sidebar({
  userName = "User",
  onCollapse,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapse?.(newState);
  };

  const navItems = [
    { label: "Tìm kiếm", icon: Search, href: "/courses" },
    { label: "Bảng điều khiển", icon: Grid3X3, href: "/courses/dashboard" },
    { label: "Khóa học của tôi", icon: BookOpen, href: "/courses/my-courses" },
    { label: "Tiến độ học", icon: BarChart3, href: "/courses/progress" },
    { label: "Cài đặt", icon: Settings, href: "/courses/settings" },
  ];

  const handleLogout = () => {
    clearStoredUser();
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-40 bg-slate-950/95 backdrop-blur-md text-slate-50 border-r border-slate-800/80 shadow-xl overflow-hidden transition-[width] duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full p-3 md:p-4">
        {/* Top: toggle */}
        <div className="flex items-center mb-6">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 px-2.5 py-2 text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md py-2.5 text-sm font-medium transition-colors",
                  collapsed ? "justify-center px-0" : "px-3 gap-3",
                  active
                    ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                {!collapsed && (
                  <span className="truncate transition-transform duration-200 group-hover:translate-x-0.5">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User + EduLearn + logout */}
        <div className="border-t border-slate-800 mt-4 pt-4 space-y-3">
          {/* User row */}
          <div
            className={cn(
              "group flex items-center rounded-md bg-slate-900/70 py-2.5 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-800",
              collapsed ? "justify-center px-0" : "px-3 gap-2"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex flex-col transition-transform duration-200 group-hover:translate-x-0.5">
                <p className="text-sm font-semibold truncate">{userName}</p>
                <p className="text-xs text-slate-400">Học viên</p>
              </div>
            )}
          </div>

          {/* EduLearn logo / link back to home */}
          <Link
            href="/"
            className={cn(
              "group flex items-center rounded-lg bg-slate-900/70 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800",
              collapsed ? "justify-center px-0" : "px-3 gap-2"
            )}
          >
            <div className="bg-linear-to-br from-blue-500 to-indigo-500 p-2 rounded-md shadow-sm shrink-0">
              <BookOpen className="w-5 h-5 text-white transition-transform duration-200 group-hover:scale-110" />
            </div>
            {!collapsed && (
              <span className="text-sm font-semibold tracking-tight transition-transform duration-200 group-hover:translate-x-0.5">
                EduLearn
              </span>
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={cn(
              "group flex items-center rounded-lg bg-slate-900/70 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800 w-full",
              collapsed ? "justify-center px-0" : "px-3 gap-2"
            )}
          >
            <div className="bg-red-600/80 hover:bg-red-700/80  p-2 rounded-md shadow-sm shrink-0">
              <LogOut className="w-5 h-5 text-white transition-transform duration-200 group-hover:scale-110" />
            </div>
            {!collapsed && (
              <span className="text-sm font-semibold tracking-tight transition-transform duration-200 group-hover:translate-x-0.5">
                Đăng xuất
              </span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
