"use client";

import type { ReactNode } from "react";

import { InstructorProvider } from "@/contexts/InstructorContext";

export default function InstructorRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <InstructorProvider>{children}</InstructorProvider>;
}


