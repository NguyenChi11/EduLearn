"use client";

import { UserAuthGuard } from "@/components/user";
import UserPageLayout from "@/components/user/UserPageLayout";

export default function UserPage() {
  return (
    <UserAuthGuard>
      <UserPageLayout />
    </UserAuthGuard>
  );
}
