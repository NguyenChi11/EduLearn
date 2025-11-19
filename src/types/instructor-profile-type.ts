export type ProfileTab = "basic" | "bio" | "links" | "preview";

export type SocialLinkType =
  | "website"
  | "facebook"
  | "youtube"
  | "linkedin"
  | "other";

export type SocialLink = {
  id: string;
  type: SocialLinkType;
  label: string;
  url: string;
};

export type PublicInstructorProfile = {
  displayName: string;
  role: string;
  expertise: string;
  bio: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
};

export const defaultPublicInstructorProfile: PublicInstructorProfile = {
  displayName: "Giảng viên EduLearn",
  role: "Giảng viên tại EduLearn",
  expertise: "Luyện thi, giao tiếp và kỹ năng tiếng Anh thực hành",
  bio: "Hãy giới thiệu ngắn gọn về bản thân, kinh nghiệm giảng dạy, phong cách giảng dạy và điểm mạnh của bạn để học viên hiểu hơn trước khi đăng ký khóa học.",
  avatarUrl: "",
  socialLinks: [],
};


