"use client";

import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
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
      <Header user={user} onLogout={handleLogout} />
      {children}
    </div>
  );
}
