import type { Course } from "@/types/course-type";

export type CourseAnalyticsRow = {
  courseId: string;
  totalStudents: number;
  completedPercent: number;
  inProgressPercent: number;
  notStartedPercent: number;
  averageRating: number;
};

// Dữ liệu demo: bạn có thể chỉnh lại số liệu hoặc thêm/bớt dòng tùy ý.
// Nếu khóa học không có trong bảng này, trang analytics sẽ tự sinh số liệu tạm.
export const MOCK_COURSE_ANALYTICS: CourseAnalyticsRow[] = [
  {
    courseId: "1",
    totalStudents: 250,
    completedPercent: 65,
    inProgressPercent: 25,
    notStartedPercent: 10,
    averageRating: 4.7,
  },
  {
    courseId: "2",
    totalStudents: 180,
    completedPercent: 55,
    inProgressPercent: 30,
    notStartedPercent: 15,
    averageRating: 4.6,
  },
  {
    courseId: "3",
    totalStudents: 140,
    completedPercent: 48,
    inProgressPercent: 32,
    notStartedPercent: 20,
    averageRating: 4.5,
  },
  {
    courseId: "4",
    totalStudents: 210,
    completedPercent: 60,
    inProgressPercent: 28,
    notStartedPercent: 12,
    averageRating: 4.8,
  },
  {
    courseId: "5",
    totalStudents: 160,
    completedPercent: 52,
    inProgressPercent: 30,
    notStartedPercent: 18,
    averageRating: 4.4,
  },
  {
    courseId: "6",
    totalStudents: 120,
    completedPercent: 40,
    inProgressPercent: 35,
    notStartedPercent: 25,
    averageRating: 4.3,
  },
  {
    courseId: "7",
    totalStudents: 130,
    completedPercent: 58,
    inProgressPercent: 27,
    notStartedPercent: 15,
    averageRating: 4.6,
  },
  {
    courseId: "8",
    totalStudents: 90,
    completedPercent: 45,
    inProgressPercent: 33,
    notStartedPercent: 22,
    averageRating: 4.2,
  },
  {
    courseId: "9",
    totalStudents: 170,
    completedPercent: 62,
    inProgressPercent: 26,
    notStartedPercent: 12,
    averageRating: 4.9,
  },
  {
    courseId: "10",
    totalStudents: 200,
    completedPercent: 68,
    inProgressPercent: 22,
    notStartedPercent: 10,
    averageRating: 4.8,
  },
];

export function getAnalyticsForCourse(course: Course) {
  return MOCK_COURSE_ANALYTICS.find((row) => row.courseId === course.id);
}


