import type { User } from "@/types/user-type";
import { UserAvatar } from "./UserAvatar";
import ProgressBar from "@/components/ui/ProgressBar";
import {
  Globe,
  Facebook,
  Linkedin,
  Youtube,
  FileText,
  UserIcon,
  Link,
} from "lucide-react";

export default function PublicProfileTab({ user }: { user: User }) {
  // Calculate profile completeness
  const calculateProfileCompleteness = () => {
    const fields = [
      { key: "avatar", value: user.avatar },
      { key: "name", value: user.name },
      { key: "headline", value: user.headline },
      { key: "bio", value: user.bio },
      { key: "website", value: user.website },
      { key: "facebook", value: user.facebook },
      { key: "linkedin", value: user.linkedin },
      { key: "youtube", value: user.youtube },
    ];

    const completedFields = fields.filter(
      (field) => field.value && field.value.trim() !== ""
    ).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const profileCompleteness = calculateProfileCompleteness();

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Public profile
          </h2>
          <p className="text-sm text-muted-foreground">
            Đây là cách người khác nhìn thấy bạn trên EduLearn.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <UserAvatar
            src={user.avatar}
            name={user.name}
            email={user.email}
            size="lg"
          />
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-semibold">
              {user.name || "Người dùng"}
            </h3>
            {user.headline ? (
              <p className="text-muted-foreground">{user.headline}</p>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Chưa có headline
              </p>
            )}
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Profile Completeness */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Độ hoàn thiện hồ sơ</span>
            <span className="text-sm text-muted-foreground">
              {profileCompleteness}%
            </span>
          </div>
          <ProgressBar
            value={profileCompleteness}
            className="h-2"
            bg="bg-primary"
          />
          <p className="text-xs text-muted-foreground">
            Hoàn thiện hồ sơ để tăng độ tin cậy và thu hút học viên
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-border/50" />

      {/* Content Sections */}
      <div className="space-y-6">
        {/* About Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/50">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              About
            </h3>
          </div>
          {user.bio ? (
            <p className="text-sm leading-relaxed text-muted-foreground pl-10">
              {user.bio}
            </p>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center pl-10">
              <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground mb-2">
                Chưa có thông tin giới thiệu
              </p>
              <p className="text-xs text-muted-foreground/70">
                Thêm một đoạn giới thiệu về bản thân để học viên hiểu rõ hơn về
                bạn
              </p>
            </div>
          )}
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-green-50 dark:bg-green-950/50">
              <Link className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
              Links
            </h3>
          </div>
          <div className="pl-10">
            {(() => {
              const links = [
                {
                  key: "website",
                  value: user.website,
                  label: "Website",
                  icon: Globe,
                  prefix: "https://",
                },
                {
                  key: "facebook",
                  value: user.facebook,
                  label: "Facebook",
                  icon: Facebook,
                  prefix: "https://facebook.com/",
                },
                {
                  key: "linkedin",
                  value: user.linkedin,
                  label: "LinkedIn",
                  icon: Linkedin,
                  prefix: "https://linkedin.com/",
                },
                {
                  key: "youtube",
                  value: user.youtube,
                  label: "YouTube",
                  icon: Youtube,
                  prefix: "https://youtube.com/",
                },
              ];

              const hasAnyLinks = links.some((link) => link.value);

              if (hasAnyLinks) {
                return (
                  <div className="space-y-3">
                    {links.map(({ key, value, label, icon: Icon, prefix }) => {
                      if (!value) return null;

                      return (
                        <div key={key} className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm font-medium text-muted-foreground w-16">
                            {label}
                          </span>
                          <a
                            href={
                              value.startsWith("http")
                                ? value
                                : `${prefix}${value}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline truncate"
                          >
                            {value}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              return (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Link className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Chưa có liên kết nào
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Thêm website hoặc các mạng xã hội để học viên có thể liên hệ
                    với bạn
                  </p>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Empty State - Only show if profile is completely empty */}
        {profileCompleteness === 0 && (
          <>
            <div className="border-t border-border/50" />
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-3 rounded-full bg-orange-50 dark:bg-orange-950/50 mb-4">
                <UserIcon className="h-12 w-12 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
                Hồ sơ của bạn đang trống
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Hãy cập nhật thông tin cá nhân, thêm avatar, bio và các liên kết
                để tạo ấn tượng tốt với học viên.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
