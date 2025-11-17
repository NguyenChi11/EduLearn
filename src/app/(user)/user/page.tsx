"use client";

import { useState, ChangeEvent } from "react";
import {
  User as UserIcon,
  Image as ImageIcon,
  Shield,
  Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { User } from "@/types/user-type";

import {
  UserAuthGuard,
  UserMobileNavigation,
  UserDesktopSidebar,
  UserContent,
  PublicProfileTab,
  ProfileTab,
  PhotoTab,
  SecurityTab,
} from "@/components/user";
import { useUser } from "@/contexts/UserContext";

type UserTab = "public" | "profile" | "photo" | "security";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState<UserTab>("public");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { user, setUser } = useUser();

  const tabs: { key: UserTab; label: string; icon: LucideIcon }[] = [
    { key: "public", label: "View public profile", icon: Eye },
    { key: "profile", label: "Profile", icon: UserIcon },
    { key: "photo", label: "Photo", icon: ImageIcon },
    { key: "security", label: "Account security", icon: Shield },
  ];

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleProfileUpdate = (updatedData: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
    }
  };

  const handleAvatarUpdate = (avatarUrl: string) => {
    if (user) {
      const newUser = { ...user, avatar: avatarUrl };
      setUser(newUser);
      setAvatarPreview(null); // Clear preview since avatar is now saved
    }
  };

  const handlePasswordChange = () => {
    console.log("Password changed successfully");
  };

  const renderActiveTab = (currentUser: User) => {
    switch (activeTab) {
      case "public":
        return <PublicProfileTab user={currentUser} />;
      case "profile":
        return (
          <ProfileTab
            user={currentUser}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case "photo":
        return (
          <PhotoTab
            avatarPreview={avatarPreview}
            onAvatarChange={handleAvatarChange}
            onAvatarUpdate={handleAvatarUpdate}
            userAvatar={currentUser.avatar}
          />
        );
      case "security":
        return <SecurityTab onPasswordChange={handlePasswordChange} />;
      default:
        return null;
    }
  };

  return (
    <UserAuthGuard>
      <div className="bg-background py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UserMobileNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="grid gap-6 md:grid-cols-[260px_1fr]">
            {user && (
              <UserDesktopSidebar
                user={user}
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            )}

            <UserContent>{user && renderActiveTab(user)}</UserContent>
          </div>
        </div>
      </div>
    </UserAuthGuard>
  );
}
