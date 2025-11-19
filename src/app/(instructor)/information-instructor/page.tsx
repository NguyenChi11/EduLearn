"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Image as ImageIcon,
  Shield,
  Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import InstructorAreaGuard from "@/components/(instructor)/InstructorAreaGuard";
import InstructorHeader from "@/components/layout/InstructorHeader";
import InstructorMobileHeader from "@/components/layout/InstructorMobileHeader";
import { UserMobileNavigation } from "@/components/(use)/user/UserMobileNavigation";
import { UserDesktopSidebar } from "@/components/(use)/user/UserDesktopSidebar";
import { UserContent } from "@/components/(use)/user/UserContent";
import PublicProfileTab from "@/components/(use)/user/PublicProfileTab";
import ProfileTab from "@/components/(use)/user/ProfileTab";
import PhotoTab from "@/components/(use)/user/PhotoTab";
import SecurityTab from "@/components/(use)/user/SecurityTab";
import { useInstructor } from "@/contexts/InstructorContext";
import type { Instructor } from "@/contexts/InstructorContext";
import React from "react";

type InstructorTab = "public" | "profile" | "photo" | "security";

export default function InformationInstructorPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<InstructorTab>("public");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { instructor, setInstructor, logoutInstructor } = useInstructor();

  const tabs: { key: InstructorTab; label: string; icon: LucideIcon }[] = [
    { key: "public", label: "Xem hồ sơ công khai", icon: Eye },
    { key: "profile", label: "Thông tin hồ sơ", icon: UserIcon },
    { key: "photo", label: "Ảnh đại diện", icon: ImageIcon },
    { key: "security", label: "Bảo mật tài khoản", icon: Shield },
  ];

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleProfileUpdate = (updatedData: Partial<Instructor>) => {
    if (instructor) {
      const newInstructor: Instructor = {
        ...instructor,
        ...updatedData,
      };
      setInstructor(newInstructor);
    }
  };

  const handleAvatarUpdate = (avatarUrl: string) => {
    if (instructor) {
      const newInstructor: Instructor = {
        ...instructor,
        avatar: avatarUrl,
      };
      setInstructor(newInstructor);
      setAvatarPreview(null);
    }
  };

  const handlePasswordChange = () => {
    // Demo: chỉ log ra console
    console.log("Instructor password changed successfully");
  };

  const handleLogout = () => {
    logoutInstructor();
    router.replace("/auth?mode=login&role=instructor");
  };

  const renderActiveTab = (currentInstructor: Instructor) => {
    switch (activeTab) {
      case "public":
        return <PublicProfileTab user={currentInstructor} />;
      case "profile":
        return (
          <ProfileTab
            user={currentInstructor}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case "photo":
        return (
          <PhotoTab
            avatarPreview={avatarPreview}
            onAvatarChange={handleAvatarChange}
            onAvatarUpdate={handleAvatarUpdate}
            userAvatar={currentInstructor.avatar}
          />
        );
      case "security":
        return <SecurityTab onPasswordChange={handlePasswordChange} />;
      default:
        return null;
    }
  };

  return (
    <InstructorAreaGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header mobile & desktop cho giảng viên */}
        {instructor && (
          <>
            <InstructorMobileHeader
              instructor={instructor}
              onLogout={handleLogout}
            />
            <div className="hidden md:block">
              <InstructorHeader
                instructor={instructor}
                onLogout={handleLogout}
              />
            </div>
          </>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <UserMobileNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="grid gap-6 md:grid-cols-[260px_1fr]">
            {instructor && (
              <UserDesktopSidebar
                user={instructor}
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            )}

            <UserContent>
              {instructor && renderActiveTab(instructor)}
            </UserContent>
          </div>
        </main>
      </div>
    </InstructorAreaGuard>
  );
}
