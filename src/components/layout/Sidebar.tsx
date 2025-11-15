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
      className={`
        fixed left-0 top-0 h-screen bg-slate-900 text-white border-r border-slate-800 
        transition-all duration-300 z-50
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className="mb-6 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">EduLearn</h1>
          </Link>
        )}

        {/* Nav */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${
                    active ? "bg-blue-600" : "hover:bg-slate-800 text-slate-300"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-slate-800 pt-4 space-y-3">
          {!collapsed && (
            <div className="px-4 py-3 bg-slate-800 rounded-lg">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-slate-400">Học viên</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && "Đăng xuất"}
          </button>
        </div>
      </div>
    </aside>
  );
}
