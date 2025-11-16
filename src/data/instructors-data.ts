export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string;
  avatarUrl?: string;
}

export const INSTRUCTORS: Instructor[] = [
  {
    id: "ins-1",
    name: "John Developer",
    role: "Chuyên gia Frontend",
    expertise: "React, TypeScript, UI hiện đại",
    bio: "Hơn 7 năm kinh nghiệm phát triển ứng dụng web với React và hệ sinh thái JavaScript.",
    avatarUrl: "/instructors/john-developer.jpg",
  },
  {
    id: "ins-2",
    name: "Sarah Smith",
    role: "Chuyên gia JavaScript",
    expertise: "JavaScript nâng cao, hiệu năng, kiến trúc",
    bio: "Tập trung vào tối ưu hiệu năng và kiến trúc front-end cho các sản phẩm có hàng triệu người dùng.",
  },
  {
    id: "ins-3",
    name: "Mike Design",
    role: "Chuyên gia UI/UX",
    expertise: "Thiết kế trải nghiệm người dùng, prototype",
    bio: "Thiết kế hàng chục sản phẩm digital với trải nghiệm người dùng trực quan và đẹp mắt.",
    avatarUrl: "/instructors/mike-design.png",
  },
  {
    id: "ins-4",
    name: "Emma Full Stack",
    role: "Full-stack Engineer",
    expertise: "Node.js, React, Cơ sở dữ liệu",
    bio: "Xây dựng hệ thống full-stack từ ý tưởng đến triển khai production.",
  },
  {
    id: "ins-5",
    name: "David Data",
    role: "Data Scientist",
    expertise: "Python, Machine Learning",
    bio: "Phân tích dữ liệu và xây dựng mô hình ML cho các doanh nghiệp vừa và nhỏ.",
  },
  {
    id: "ins-6",
    name: "Lisa Mobile",
    role: "Mobile Developer",
    expertise: "React Native, Ứng dụng đa nền tảng",
    bio: "Phát triển ứng dụng di động đa nền tảng với trải nghiệm gần như native.",
  },
];


