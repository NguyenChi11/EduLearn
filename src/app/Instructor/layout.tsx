"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import { useStoredUser } from "@/hooks/useStoredUser";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useStoredUser();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <MobileHeader user={user} onLogout={handleLogout} />
      <div className="hidden md:block">
        <Header user={user} onLogout={handleLogout} />
      </div>
      {children}
    </div>
  );
}
