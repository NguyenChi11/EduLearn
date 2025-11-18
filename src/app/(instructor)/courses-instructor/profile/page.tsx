"use client";

import React, { useEffect, useMemo, useState } from "react";

import Typography from "@/components/ui/Typography";
import SectionBox from "@/components/ui/SectionBox";
import Card from "@/components/ui/Card";
import { useInstructor } from "@/contexts/InstructorContext";

type ProfileTab = "basic" | "bio" | "links" | "preview";

type SocialLinkType = "website" | "facebook" | "youtube" | "linkedin" | "other";

type SocialLink = {
  id: string;
  type: SocialLinkType;
  label: string;
  url: string;
};

type PublicInstructorProfile = {
  displayName: string;
  role: string;
  expertise: string;
  bio: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
};

const defaultProfile: PublicInstructorProfile = {
  displayName: "Giảng viên EduLearn",
  role: "Giảng viên tại EduLearn",
  expertise: "Luyện thi, giao tiếp và kỹ năng tiếng Anh thực hành",
  bio: "Hãy giới thiệu ngắn gọn về bản thân, kinh nghiệm giảng dạy, phong cách giảng dạy và điểm mạnh của bạn để học viên hiểu hơn trước khi đăng ký khóa học.",
  avatarUrl: "",
  socialLinks: [],
};

export default function InstructorProfilePage() {
  const { instructor } = useInstructor();

  const storageKey = useMemo(
    () => (instructor ? `instructor_profile_${instructor.id}` : null),
    [instructor]
  );

  const [activeTab, setActiveTab] = useState<ProfileTab>("basic");
  const [profile, setProfile] =
    useState<PublicInstructorProfile>(defaultProfile);

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
          ...defaultProfile,
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
      ...defaultProfile,
      displayName:
        instructor?.name ||
        instructor?.email?.split("@")[0] ||
        defaultProfile.displayName,
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

  const studentPreviewName = profile.displayName;
  const studentPreviewRole = profile.role;
  const studentPreviewExpertise = profile.expertise;
  const studentPreviewBio = profile.bio;

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

        {/* Tabs */}
        <SectionBox>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setActiveTab("basic")}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  activeTab === "basic"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Thông tin cơ bản
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bio")}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  activeTab === "bio"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Giới thiệu & chuyên môn
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("links")}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  activeTab === "links"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Liên hệ & mạng xã hội
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  activeTab === "preview"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Xem trước như học viên
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetProfile}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Đặt lại về mặc định
            </button>
          </div>
        </SectionBox>

        {/* Tab content */}
        {activeTab === "basic" && (
          <SectionBox title="Thông tin cơ bản (hiển thị cho học viên)">
            <div className="grid gap-4 md:grid-cols-2 text-xs md:text-sm">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Tên hiển thị
                  </label>
                  <input
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="VD: Thầy John Developer, Cô Sarah Smith..."
                    value={profile.displayName}
                    onChange={(e) =>
                      handleChangeField("displayName", e.target.value)
                    }
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tên này sẽ hiển thị ở mọi nơi mà học viên nhìn thấy bạn.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Vai trò / tiêu đề
                  </label>
                  <input
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="VD: Chuyên gia Frontend, Giảng viên IELTS, Data Scientist..."
                    value={profile.role}
                    onChange={(e) => handleChangeField("role", e.target.value)}
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Xuất hiện dưới tên giảng viên (ví dụ: &quot;Chuyên gia
                    Frontend&quot;).
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Ảnh đại diện
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      {profile.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={profile.avatarUrl}
                          alt={profile.displayName}
                          className="h-14 w-14 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-base font-bold text-white">
                          {profile.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                        className="block w-full text-[11px] text-slate-700 file:mr-2 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-slate-800 dark:text-slate-200 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-200"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Ảnh được tải lên chỉ được lưu cục bộ cho mục đích demo. Với
                    bản production, nên dùng tính năng upload lên máy chủ.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    Gợi ý hiển thị cho học viên
                  </p>
                  <p className="mt-1">
                    Học viên sẽ thấy tên hiển thị, vai trò và ảnh đại diện của
                    bạn ở:
                  </p>
                  <ul className="mt-1 list-disc pl-4 space-y-1">
                    <li>
                      Trang chi tiết giảng viên (user side - `/Instructor`)
                    </li>
                    <li>Trang chi tiết khóa học mà bạn phụ trách</li>
                  </ul>
                  <p className="mt-1 text-[11px]">
                    Hiện tại hệ thống đang dùng dữ liệu demo; khi kết nối
                    backend thật, phần này sẽ là nơi cập nhật dữ liệu cho học
                    viên.
                  </p>
                </div>
              </div>
            </div>
          </SectionBox>
        )}

        {activeTab === "bio" && (
          <SectionBox title="Giới thiệu & chuyên môn">
            <div className="grid gap-4 md:grid-cols-2 text-xs md:text-sm">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Chuyên môn chính
                  </label>
                  <input
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="VD: React, TypeScript, UI/UX, IELTS 7.0+, Machine Learning..."
                    value={profile.expertise}
                    onChange={(e) =>
                      handleChangeField("expertise", e.target.value)
                    }
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Học viên sẽ thấy dòng này để hiểu bạn giỏi về lĩnh vực nào.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Đoạn giới thiệu (bio)
                  </label>
                  <textarea
                    className="min-h-[140px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="Ví dụ: Tôi có hơn 5 năm kinh nghiệm giảng dạy..., từng giúp X học viên đạt mục tiêu..., phong cách dạy tập trung vào..."
                    value={profile.bio}
                    onChange={(e) => handleChangeField("bio", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    Gợi ý nội dung giới thiệu
                  </p>
                  <ul className="mt-1 list-disc pl-4 space-y-1">
                    <li>Số năm kinh nghiệm giảng dạy.</li>
                    <li>Những chứng chỉ, thành tích nổi bật (nếu có).</li>
                    <li>Phong cách giảng dạy và điều học viên sẽ nhận được.</li>
                    <li>Đối tượng học viên phù hợp với bạn.</li>
                  </ul>
                  <p className="mt-2 text-[11px]">
                    Đoạn giới thiệu rõ ràng, chân thực sẽ giúp tăng tỷ lệ học
                    viên đăng ký khóa học của bạn.
                  </p>
                </div>
              </div>
            </div>
          </SectionBox>
        )}

        {activeTab === "links" && (
          <SectionBox title="Liên hệ & mạng xã hội">
            <div className="space-y-4 text-xs md:text-sm">
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Thêm kênh liên hệ / mạng xã hội
                </p>
                <div className="mt-2 grid gap-2 md:grid-cols-3">
                  <select
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    value={newSocial.type}
                    onChange={(e) =>
                      setNewSocial((prev) => ({
                        ...prev,
                        type: e.target.value as SocialLinkType,
                      }))
                    }
                  >
                    <option value="website">Website cá nhân</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other">Khác</option>
                  </select>
                  <input
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="Tên hiển thị (VD: Fanpage Facebook, Kênh YouTube...)"
                    value={newSocial.label}
                    onChange={(e) =>
                      setNewSocial((prev) => ({
                        ...prev,
                        label: e.target.value,
                      }))
                    }
                  />
                  <input
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 md:col-span-1"
                    placeholder="Link (https://...)"
                    value={newSocial.url}
                    onChange={(e) =>
                      setNewSocial((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddSocialLink}
                    disabled={!newSocial.label.trim() || !newSocial.url.trim()}
                    className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Thêm liên kết
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Danh sách liên kết hiện có ({profile.socialLinks.length})
                </p>
                {profile.socialLinks.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Chưa có liên kết nào. Bạn có thể thêm website cá nhân,
                    fanpage hoặc các kênh mạng xã hội liên quan đến việc giảng
                    dạy.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {profile.socialLinks.map((link) => (
                      <li
                        key={link.id}
                        className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-900"
                      >
                        <div className="space-y-1">
                          <p className="font-medium text-slate-800 dark:text-slate-100">
                            {link.label}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                              {link.type.toUpperCase()}
                            </span>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                            >
                              {link.url}
                            </a>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteSocialLink(link.id)}
                          className="text-[11px] font-medium text-red-500 hover:text-red-600"
                        >
                          Xóa
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </SectionBox>
        )}

        {activeTab === "preview" && (
          <SectionBox title="Xem trước hồ sơ như học viên">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="flex flex-col md:flex-row gap-6 p-5 md:p-6 items-center md:items-start bg-white/90 dark:bg-slate-900/90">
                <div className="shrink-0">
                  {profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatarUrl}
                      alt={studentPreviewName}
                      className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-2xl font-bold text-white">
                      {studentPreviewName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center md:text-left text-sm">
                  <p className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {studentPreviewName}
                  </p>
                  <p className="text-xs font-medium text-sky-600 dark:text-sky-400">
                    {studentPreviewRole}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Chuyên môn:{" "}
                    <span className="font-medium">
                      {studentPreviewExpertise}
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {studentPreviewBio}
                  </p>

                  {profile.socialLinks.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-3 space-y-2">
                      <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                        Liên hệ / theo dõi giảng viên
                      </p>
                      <ul className="space-y-1">
                        {profile.socialLinks.map((link) => (
                          <li
                            key={link.id}
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="flex flex-col items-start gap-0.5">
                              <span className="text-[11px] font-medium text-slate-800 dark:text-slate-100">
                                {link.label}
                              </span>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                              >
                                {link.url}
                              </a>
                            </div>
                            <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                              {link.type.toUpperCase()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>

              <div className="space-y-3 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Ghi chú
                </p>
                <p>
                  Đây là bản xem trước theo phong cách trang chi tiết giảng viên
                  mà học viên sẽ thấy (ví dụ ở route `/Instructor/[id]`). Khi
                  kết nối backend, dữ liệu từ trang này có thể được dùng để hiển
                  thị bên phía học viên.
                </p>
                <p>
                  Hiện tại thông tin chỉ lưu trong trình duyệt của bạn nên sẽ
                  không ảnh hưởng đến dữ liệu demo mặc định khác.
                </p>
              </div>
            </div>
          </SectionBox>
        )}
      </div>
    </div>
  );
}
