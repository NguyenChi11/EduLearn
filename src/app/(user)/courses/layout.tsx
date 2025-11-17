"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import StudentAreaGuard from "@/components/auth/StudentAreaGuard";
import { useUser } from "@/contexts/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();

  const userName = user?.name || user?.email || "User";

  return (
    <StudentAreaGuard>
      <div className="bg-white dark:bg-slate-950 min-h-screen">
        {/* Sidebar cố định */}
        <Sidebar onCollapse={setCollapsed} userName={userName} />
        {/* Nội dung tự co giãn theo sidebar */}
        <main
          className={
            `transition-all duration-300 min-h-screen ` +
            (collapsed ? "ml-20" : "ml-64")
          }
        >
          {children}
        </main>
      </div>
    </StudentAreaGuard>
  );
}
