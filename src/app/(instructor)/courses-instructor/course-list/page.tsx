"use client";

import React, { useCallback, useMemo, useState } from "react";

import type { Course } from "@/types/course-type";
import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import CourseCard from "@/components/courses/CourseCard";
import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";
import SearchFilter, {
  type FilterOptions,
  type SortOption,
} from "@/components/home/SearchFilter";
import Pagination from "@/components/ui/Pagination";

const DEFAULT_SORT: SortOption = "popular";
const ITEMS_PER_PAGE = 9;

type MetaTab = "category" | "course" | "level";
type LevelCode = "S" | "Pres" | "TC" | "MTC";

export default function InstructorCourseListPage() {
  const { instructor } = useInstructor();

  const initialCourses = useMemo(
    () => getInstructorCourses(instructor?.id),
    [instructor]
  );

  const [courses, setCourses] = useState(initialCourses);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>(DEFAULT_SORT);
  const [currentPage, setCurrentPage] = useState(1);

  // Meta quản lý danh mục & mức độ (demo)
  const [courseCategories, setCourseCategories] = useState<string[]>(() => {
    const set = new Set<string>();
    initialCourses.forEach((course) => {
      if (course.category) {
        set.add(course.category);
      }
    });
    return Array.from(set);
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const [levelsMeta, setLevelsMeta] = useState<LevelCode[]>(() => {
    const set = new Set<LevelCode>();
    initialCourses.forEach((course) => {
      if (course.level) {
        set.add(course.level);
      }
    });
    if (set.size === 0) {
      return ["S", "Pres", "TC", "MTC"];
    }
    return Array.from(set);
  });
  const [levelInput, setLevelInput] = useState("");
  const [editingLevel, setEditingLevel] = useState<string | null>(null);

  type CourseFormState = {
    title: string;
    description: string;
    category: string;
    level: LevelCode | "";
  };

  const [courseForm, setCourseForm] = useState<CourseFormState>({
    title: "",
    description: "",
    category: "",
    level: levelsMeta[0] ?? "S",
  });
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const [activeMetaTab, setActiveMetaTab] = useState<MetaTab | null>(null);
  const [showMetaPopup, setShowMetaPopup] = useState(false);

  const openMetaPopup = (tab: MetaTab) => {
    setActiveMetaTab(tab);
    setShowMetaPopup(true);
  };

  const closeMetaPopup = () => {
    setShowMetaPopup(false);
    setActiveMetaTab(null);
    setEditingCategory(null);
    setCategoryInput("");
    setEditingLevel(null);
    setLevelInput("");
    setEditingCourseId(null);
    setCourseForm((prev) => ({
      ...prev,
      title: "",
      description: "",
      category: "",
      level: levelsMeta[0] ?? "S",
    }));
  };

  // Danh sách category & level dùng cho bộ lọc (đồng bộ với CRUD meta)
  const categories = courseCategories;
  const levels = levelsMeta;

  // CRUD danh mục khóa học
  const handleSaveCategory = () => {
    const trimmed = categoryInput.trim();
    if (!trimmed) return;

    if (editingCategory) {
      setCourseCategories((prev) =>
        prev.map((cat) => (cat === editingCategory ? trimmed : cat))
      );
      setCourses((prev) =>
        prev.map((course) =>
          course.category === editingCategory
            ? { ...course, category: trimmed }
            : course
        )
      );
    } else {
      setCourseCategories((prev) =>
        prev.includes(trimmed) ? prev : [...prev, trimmed]
      );
    }

    setEditingCategory(null);
    setCategoryInput("");
  };

  const handleStartEditCategory = (name: string) => {
    setEditingCategory(name);
    setCategoryInput(name);
  };

  const handleDeleteCategory = (name: string) => {
    setCourseCategories((prev) => prev.filter((cat) => cat !== name));
    setCourses((prev) =>
      prev.map((course) =>
        course.category === name ? { ...course, category: undefined } : course
      )
    );
    if (editingCategory === name) {
      setEditingCategory(null);
      setCategoryInput("");
    }
  };

  // CRUD mức độ khóa học
  const handleSaveLevel = () => {
    const trimmed = levelInput.trim() as LevelCode;
    if (!trimmed) return;

    if (editingLevel) {
      setLevelsMeta((prev) =>
        prev.map((level) => (level === editingLevel ? trimmed : level))
      );
      setCourses((prev) =>
        prev.map((course) =>
          course.level === editingLevel ? { ...course, level: trimmed } : course
        )
      );
    } else {
      setLevelsMeta((prev) =>
        prev.includes(trimmed) ? prev : [...prev, trimmed]
      );
    }

    setEditingLevel(null);
    setLevelInput("");
  };

  const handleStartEditLevel = (name: string) => {
    setEditingLevel(name);
    setLevelInput(name);
  };

  const handleDeleteLevel = (name: string) => {
    setLevelsMeta((prev) => prev.filter((level) => level !== name));
    if (editingLevel === name) {
      setEditingLevel(null);
      setLevelInput("");
    }
  };

  // CRUD khóa học
  const handleChangeCourseForm = <K extends keyof CourseFormState>(
    key: K,
    value: CourseFormState[K]
  ) => {
    setCourseForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStartCreateCourse = () => {
    setEditingCourseId(null);
    setCourseForm({
      title: "",
      description: "",
      category: "",
      level: levelsMeta[0] ?? "S",
    });
    openMetaPopup("course");
  };

  const handleStartEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category ?? "",
      level: course.level,
    });
    openMetaPopup("course");
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
    if (editingCourseId === courseId) {
      setEditingCourseId(null);
      setCourseForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        category: "",
        level: levelsMeta[0] ?? "S",
      }));
    }
  };

  const handleSaveCourse = () => {
    if (!courseForm.title.trim()) return;

    if (editingCourseId) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editingCourseId
            ? {
                ...course,
                title: courseForm.title.trim(),
                description: courseForm.description.trim(),
                category: courseForm.category || undefined,
                level: courseForm.level || course.level,
              }
            : course
        )
      );
    } else {
      const newCourse: Course = {
        id: `temp-${Date.now()}`,
        title: courseForm.title.trim(),
        description: courseForm.description.trim(),
        thumbnail: "",
        level: (courseForm.level || "S") as LevelCode,
        kindOfCourse: initialCourses[0]?.kindOfCourse ?? "IELTS",
        totalLessons: 0,
        progress: 0,
        status: "not-started",
        lessons: [],
        fullDescription: courseForm.description.trim(),
        coverImage: "",
        rating: 0,
        instructor:
          initialCourses[0]?.instructor ??
          instructor?.name ??
          instructor?.email ??
          "Giảng viên",
        enrolledCount: 0,
        category: courseForm.category || undefined,
      };

      setCourses((prev) => [newCourse, ...prev]);
    }

    // Cập nhật danh sách danh mục nếu cần
    if (
      courseForm.category &&
      !courseCategories.includes(courseForm.category)
    ) {
      setCourseCategories((prev) => [...prev, courseForm.category]);
    }

    closeMetaPopup();
  };

  const filteredCourses = useMemo(() => {
    let results = [...courses];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.kindOfCourse?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q)
      );
    }

    if (filters.categories && filters.categories.length > 0) {
      results = results.filter((c) =>
        filters.categories!.includes(c.category ?? "")
      );
    }

    if (filters.levels && filters.levels.length > 0) {
      results = results.filter((c) => filters.levels!.includes(c.level));
    }

    if (sortBy === "popular") {
      results.sort((a, b) => (b.enrolledCount ?? 0) - (a.enrolledCount ?? 0));
    } else if (sortBy === "rating") {
      results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === "title-asc") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [courses, searchQuery, filters, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE) || 1;

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Khóa học của bạn
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Tìm kiếm và lọc các khóa học mà bạn đang phụ trách. Bạn có thể vào
            từng khóa để quản lý nội dung, bài tập và học viên.
          </Typography>
        </header>

        {/* Thanh điều hướng quản lý meta: danh mục, khóa học, mức độ */}
        <SectionBox>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => openMetaPopup("category")}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  activeMetaTab === "category"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Danh mục khóa học
              </button>
              <button
                type="button"
                onClick={() => handleStartCreateCourse()}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  activeMetaTab === "course"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Khóa học
              </button>
              <button
                type="button"
                onClick={() => openMetaPopup("level")}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  activeMetaTab === "level"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Mức độ khóa học
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-md">
              Các chức năng trên chỉ là demo UI, dữ liệu được lưu tạm thời trên
              trình duyệt. Bạn có thể thêm, sửa, xóa danh mục, khóa học và mức
              độ khóa học tại đây.
            </p>
          </div>
        </SectionBox>

        <SectionBox>
          <SearchFilter
            onSearch={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            onFilter={(f) => {
              setFilters(f);
              setCurrentPage(1);
            }}
            categories={categories}
            levels={levels}
            sortBy={sortBy}
            onSortChange={(sort) => {
              setSortBy(sort);
              setCurrentPage(1);
            }}
          />
        </SectionBox>

        {/* Popup meta: danh mục / khóa học / mức độ */}
        {showMetaPopup && activeMetaTab && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm m-0">
            <div className="m-0 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="space-y-1">
                  <Typography variant="h3" as="h2">
                    {activeMetaTab === "category"
                      ? "Danh mục khóa học"
                      : activeMetaTab === "course"
                      ? editingCourseId
                        ? "Chỉnh sửa khóa học"
                        : "Thêm khóa học mới"
                      : "Mức độ khóa học"}
                  </Typography>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeMetaTab === "category" &&
                      "Thêm, sửa hoặc xóa danh mục khóa học. Mỗi danh mục có thể chứa nhiều khóa học."}
                    {activeMetaTab === "course" &&
                      "Thêm khóa học mới hoặc chỉnh sửa / xóa các khóa học hiện có. Mỗi khóa học gắn với một danh mục và mức độ."}
                    {activeMetaTab === "level" &&
                      "Quản lý các mức độ (S, Pres, TC, MTC, ...) dùng để phân loại độ khó khóa học."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeMetaPopup}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Đóng
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 md:px-6 md:py-5 text-xs">
                {activeMetaTab === "category" && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/40 md:flex-row md:items-end">
                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {editingCategory
                            ? "Chỉnh sửa danh mục"
                            : "Thêm danh mục mới"}
                        </label>
                        <input
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          placeholder="VD: Luyện thi, Giao tiếp, Nền tảng..."
                          value={categoryInput}
                          onChange={(e) => setCategoryInput(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSaveCategory}
                          className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                        >
                          {editingCategory ? "Lưu danh mục" : "Thêm danh mục"}
                        </button>
                        {editingCategory && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCategory(null);
                              setCategoryInput("");
                            }}
                            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </div>

                    {courseCategories.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Chưa có danh mục nào. Hãy thêm danh mục để gán cho các
                        khóa học.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/40">
                        {courseCategories.map((cat) => (
                          <div
                            key={cat}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900"
                          >
                            <span className="font-medium text-slate-700 dark:text-slate-100">
                              {cat}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditCategory(cat)}
                              className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat)}
                              className="text-[11px] text-red-600 hover:underline dark:text-red-400"
                            >
                              Xóa
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeMetaTab === "course" && (
                  <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          Tên khóa học
                        </label>
                        <input
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          placeholder="VD: Luyện thi IELTS 7.0+"
                          value={courseForm.title}
                          onChange={(e) =>
                            handleChangeCourseForm("title", e.target.value)
                          }
                        />
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          Mô tả ngắn
                        </label>
                        <textarea
                          className="min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          placeholder="Mô tả ngắn gọn nội dung khóa học..."
                          value={courseForm.description}
                          onChange={(e) =>
                            handleChangeCourseForm(
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                            Danh mục khóa học
                          </label>
                          <select
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            value={courseForm.category}
                            onChange={(e) =>
                              handleChangeCourseForm("category", e.target.value)
                            }
                          >
                            <option value="">Chưa chọn danh mục</option>
                            {courseCategories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                            Mức độ khóa học
                          </label>
                          <select
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            value={courseForm.level || "S"}
                            onChange={(e) =>
                              handleChangeCourseForm(
                                "level",
                                e.target.value as CourseFormState["level"]
                              )
                            }
                          >
                            {levelsMeta.map((level) => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="pt-2 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={handleSaveCourse}
                            disabled={!courseForm.title.trim()}
                            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                          >
                            {editingCourseId
                              ? "Lưu thay đổi khóa học"
                              : "Thêm khóa học"}
                          </button>
                          <button
                            type="button"
                            onClick={closeMetaPopup}
                            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-slate-200 pt-3 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Danh sách khóa học hiện có
                      </p>
                      {courses.length === 0 ? (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Chưa có khóa học nào. Hãy thêm khóa học đầu tiên của
                          bạn.
                        </p>
                      ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                          {courses.map((course) => (
                            <div
                              key={course.id}
                              className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900"
                            >
                              <div className="space-y-0.5">
                                <p className="font-medium text-slate-800 dark:text-slate-100">
                                  {course.title}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  Danh mục:{" "}
                                  {course.category ?? "Chưa có danh mục"} · Mức
                                  độ: {course.level}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleStartEditCourse(course)}
                                  className="text-[11px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="text-[11px] font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeMetaTab === "level" && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/40 md:flex-row md:items-end">
                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {editingLevel
                            ? "Chỉnh sửa mức độ"
                            : "Thêm mức độ mới"}
                        </label>
                        <input
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                          placeholder="VD: S, Pres, TC, MTC..."
                          value={levelInput}
                          onChange={(e) => setLevelInput(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleSaveLevel}
                          className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                        >
                          {editingLevel ? "Lưu mức độ" : "Thêm mức độ"}
                        </button>
                        {editingLevel && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingLevel(null);
                              setLevelInput("");
                            }}
                            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </div>

                    {levelsMeta.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Chưa có mức độ nào. Hãy thêm ít nhất một mức độ để gán
                        cho khóa học.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/40">
                        {levelsMeta.map((level) => (
                          <div
                            key={level}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900"
                          >
                            <span className="font-medium text-slate-700 dark:text-slate-100">
                              {level}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditLevel(level)}
                              className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLevel(level)}
                              className="text-[11px] text-red-600 hover:underline dark:text-red-400"
                            >
                              Xóa
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <SectionBox title="Danh sách khóa học">
          {filteredCourses.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Không tìm thấy khóa học nào phù hợp với bộ lọc hiện tại. Hãy thử
              thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    // Trong chế độ giảng viên, chúng ta không dùng progress của học viên
                    progress={0}
                    showInstructor={false}
                    detailHref={`/courses-instructor/course-list/${course.id}`}
                  />
                ))}
              </div>
              <Pagination
                page={currentPage}
                pageCount={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </SectionBox>
      </div>
    </div>
  );
}
