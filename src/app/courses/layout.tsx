"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Sidebar cố định */}
      <Sidebar onCollapse={setCollapsed} />
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
  );
}
