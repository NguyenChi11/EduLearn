"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Footer from "@/components/layout/Footer";
import MobileFooter from "@/components/layout/MobileFooter";

interface AppFooterShellProps {
  children: ReactNode;
}

export default function AppFooterShell({ children }: AppFooterShellProps) {
  const pathname = usePathname();
  const isCoursesRoute = pathname?.startsWith("/courses");

  return (
    <>
      {children}

      {!isCoursesRoute && (
        <>
          <MobileFooter />
          <div className="hidden md:block">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}


