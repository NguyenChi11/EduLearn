"use client";

import { UserAuthGuard } from "@/components/(use)/user";
import UserPageLayout from "@/components/(use)/user/UserPageLayout";

export default function UserPage() {
  return (
    <UserAuthGuard>
      <UserPageLayout />
    </UserAuthGuard>
  );
}
