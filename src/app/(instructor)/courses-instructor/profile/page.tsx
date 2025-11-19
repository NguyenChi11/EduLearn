"use client";

import React, { useEffect, useMemo, useState } from "react";

import Typography from "@/components/ui/Typography";
import { useInstructor } from "@/contexts/InstructorContext";
import InstructorProfileTabs from "@/components/(instructor)/profile/InstructorProfileTabs";
import InstructorProfileBasicSection from "@/components/(instructor)/profile/InstructorProfileBasicSection";
import InstructorProfileBioSection from "@/components/(instructor)/profile/InstructorProfileBioSection";
import InstructorProfileLinksSection from "@/components/(instructor)/profile/InstructorProfileLinksSection";
import InstructorProfilePreviewSection from "@/components/(instructor)/profile/InstructorProfilePreviewSection";
import type {
  ProfileTab,
  PublicInstructorProfile,
  SocialLink,
} from "@/types/instructor-profile-type";
import { defaultPublicInstructorProfile } from "@/types/instructor-profile-type";

export default function InstructorProfilePage() {
  const { instructor } = useInstructor();

  const storageKey = useMemo(
    () => (instructor ? `instructor_profile_${instructor.id}` : null),
    [instructor]
  );

  const [activeTab, setActiveTab] = useState<ProfileTab>("basic");
  const [profile, setProfile] = useState<PublicInstructorProfile>(
    defaultPublicInstructorProfile
  );

  const [newSocial, setNewSocial] = useState<SocialLink>({
    id: "",
    type: "website",
    label: "",
    url: "",
  });

  // Load profile từ localStorage (demo) khi vào trang
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as PublicInstructorProfile;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProfile({
          ...defaultPublicInstructorProfile,
          ...parsed,
        });
      } else {
        setProfile((prev) => ({
          ...prev,
          displayName:
            instructor?.name ||
            instructor?.email?.split("@")[0] ||
            prev.displayName,
        }));
      }
    } catch {
      // ignore
    }
  }, [storageKey, instructor]);

  const persistProfile = (next: PublicInstructorProfile) => {
    setProfile(next);
    if (!storageKey || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleChangeField = <K extends keyof PublicInstructorProfile>(
    key: K,
    value: PublicInstructorProfile[K]
  ) => {
    const next = {
      ...profile,
      [key]: value,
    };
    persistProfile(next);
  };

  const handleAddSocialLink = () => {
    if (!newSocial.label.trim() || !newSocial.url.trim()) return;

    const link: SocialLink = {
      ...newSocial,
      id: `social-${Date.now()}`,
      label: newSocial.label.trim(),
      url: newSocial.url.trim(),
    };

    const next: PublicInstructorProfile = {
      ...profile,
      socialLinks: [...profile.socialLinks, link],
    };

    persistProfile(next);
    setNewSocial({
      id: "",
      type: "website",
      label: "",
      url: "",
    });
  };

  const handleDeleteSocialLink = (id: string) => {
    const next: PublicInstructorProfile = {
      ...profile,
      socialLinks: profile.socialLinks.filter((link) => link.id !== id),
    };
    persistProfile(next);
  };

  const handleResetProfile = () => {
    const next: PublicInstructorProfile = {
      ...defaultPublicInstructorProfile,
      displayName:
        instructor?.name ||
        instructor?.email?.split("@")[0] ||
        defaultPublicInstructorProfile.displayName,
    };
    persistProfile(next);
  };

  const handleAvatarFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleChangeField("avatarUrl", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Hồ sơ giảng viên
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Thông tin tại đây sẽ được dùng để hiển thị cho học viên ở trang danh
            sách/chi tiết giảng viên và trang khóa học. Dữ liệu hiện tại chỉ lưu
            tạm trên trình duyệt (demo).
          </Typography>
        </header>

        <InstructorProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onResetProfile={handleResetProfile}
        />

        {/* Tab content */}
        {activeTab === "basic" && (
          <InstructorProfileBasicSection
            profile={profile}
            onDisplayNameChange={(value) =>
              handleChangeField("displayName", value)
            }
            onRoleChange={(value) => handleChangeField("role", value)}
            onAvatarFileChange={handleAvatarFileChange}
          />
        )}

        {activeTab === "bio" && (
          <InstructorProfileBioSection
            profile={profile}
            onExpertiseChange={(value) => handleChangeField("expertise", value)}
            onBioChange={(value) => handleChangeField("bio", value)}
          />
        )}

        {activeTab === "links" && (
          <InstructorProfileLinksSection
            profile={profile}
            newSocial={newSocial}
            onNewSocialChange={(next) => setNewSocial(next)}
            onAddSocialLink={handleAddSocialLink}
            onDeleteSocialLink={handleDeleteSocialLink}
          />
        )}

        {activeTab === "preview" && (
          <InstructorProfilePreviewSection profile={profile} />
        )}
      </div>
    </div>
  );
}
