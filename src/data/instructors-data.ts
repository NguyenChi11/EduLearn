import { MOCK_COURSES } from "@/data/mock-data";

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string;
  avatarUrl?: string;
}

// Metadata bổ sung cho từng giảng viên (không trùng lặp với nguồn dữ liệu chính từ khóa học)
// Nếu không khai báo ở đây, role/bio/expertise sẽ được sinh tự động từ danh mục khóa học.
const INSTRUCTOR_META: Partial<
  Record<string, Omit<Instructor, "id" | "name">>
> = {
  "John Developer": {
    role: "Chuyên gia Frontend",
    expertise: "React, TypeScript, UI hiện đại",
    bio: "Hơn 7 năm kinh nghiệm phát triển ứng dụng web với React và hệ sinh thái JavaScript.",
    avatarUrl: "/instructors/john-developer.jpg",
  },
  "Sarah Smith": {
    role: "Chuyên gia JavaScript",
    expertise: "JavaScript nâng cao, hiệu năng, kiến trúc",
    bio: "Tập trung vào tối ưu hiệu năng và kiến trúc front-end cho các sản phẩm có hàng triệu người dùng.",
  },
  "Mike Design": {
    role: "Chuyên gia UI/UX",
    expertise: "Thiết kế trải nghiệm người dùng, prototype",
    bio: "Thiết kế hàng chục sản phẩm digital với trải nghiệm người dùng trực quan và đẹp mắt.",
    avatarUrl: "/instructors/mike-design.png",
  },
  "Emma Full Stack": {
    role: "Full-stack Engineer",
    expertise: "Node.js, React, Cơ sở dữ liệu",
    bio: "Xây dựng hệ thống full-stack từ ý tưởng đến triển khai production.",
  },
  "David Data": {
    role: "Data Scientist",
    expertise: "Python, Machine Learning",
    bio: "Phân tích dữ liệu và xây dựng mô hình ML cho các doanh nghiệp vừa và nhỏ.",
  },
  "Lisa Mobile": {
    role: "Mobile Developer",
    expertise: "React Native, Ứng dụng đa nền tảng",
    bio: "Phát triển ứng dụng di động đa nền tảng với trải nghiệm gần như native.",
  },
};

// Sinh danh sách giảng viên từ dữ liệu khóa học (MOCK_COURSES)
export const INSTRUCTORS: Instructor[] = (() => {
  // Lấy danh sách tên giảng viên duy nhất từ khóa học
  const uniqueInstructorNames = Array.from(
    new Set(MOCK_COURSES.map((course) => course.instructor).filter(Boolean))
  ) as string[];

  return uniqueInstructorNames.map((name, index) => {
    const coursesOfInstructor = MOCK_COURSES.filter(
      (course) => course.instructor === name
    );

    const categories = Array.from(
      new Set(
        coursesOfInstructor
          .map((course) => course.category)
          .filter((c): c is string => !!c)
      )
    );

    const meta = INSTRUCTOR_META[name];

    // Lấy avatar từ metadata nếu có, nếu không thì có thể mở rộng lấy từ course.instructorAvatar
    const avatarUrl =
      meta?.avatarUrl ||
      coursesOfInstructor.find((course) => course.instructorAvatar)
        ?.instructorAvatar;

    const expertise =
      meta?.expertise ||
      (categories.length > 0
        ? categories.join(", ")
        : "Giảng dạy nhiều chủ đề khác nhau");

    const role =
      meta?.role ||
      (categories.length > 0
        ? `Giảng viên ${categories[0]}`
        : "Giảng viên tại EduLearn");

    const bio =
      meta?.bio ||
      `Giảng viên tại EduLearn phụ trách các khóa học về ${expertise.toLowerCase()}.`;

    return {
      id: `ins-${index + 1}`,
      name,
      role,
      bio,
      expertise,
      avatarUrl,
    };
  });
})();
