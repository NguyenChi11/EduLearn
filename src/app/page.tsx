// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import { getStoredUser, clearStoredUser } from "@/utils/auth-utils";
import Spinner from "@/components/ui/Spinner";

export default function Home() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(stored);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header user={user} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Hero isLoggedIn={!!user} />
        <Features />
      </main>
    </div>
  );
}
