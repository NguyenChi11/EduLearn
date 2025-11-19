"use client";

import React, { useCallback, useMemo, useState } from "react";

import type { Course } from "@/types/course-type";
import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import SectionBox from "@/components/ui/SectionBox";
import SearchFilter, {
  type FilterOptions,
  type SortOption,
} from "@/components/home/SearchFilter";
import InstructorCoursePageHeader from "@/components/(instructor)/courses/InstructorCoursePageHeader";
import InstructorCourseToolbar from "@/components/(instructor)/courses/InstructorCourseToolbar";
import InstructorCourseMetaModal from "@/components/(instructor)/courses/InstructorCourseMetaModal";
import InstructorCourseListSection from "@/components/(instructor)/courses/InstructorCourseListSection";

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
  const handleChangeCourseForm = (
    key: keyof CourseFormState,
    value: string | LevelCode | ""
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
        <InstructorCoursePageHeader />

        {/* Thanh điều hướng chức năng: chỉ thêm/chỉnh sửa khóa học (dành cho giảng viên) */}
        <InstructorCourseToolbar
          isCourseTabActive={activeMetaTab === "course"}
          onAddCourse={handleStartCreateCourse}
        />

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

        <InstructorCourseMetaModal
          activeMetaTab={activeMetaTab}
          show={showMetaPopup}
          onClose={closeMetaPopup}
          courseCategories={courseCategories}
          categoryInput={categoryInput}
          editingCategory={editingCategory}
          onCategoryInputChange={setCategoryInput}
          onSaveCategory={handleSaveCategory}
          onStartEditCategory={handleStartEditCategory}
          onDeleteCategory={handleDeleteCategory}
          levelsMeta={levelsMeta}
          levelInput={levelInput}
          editingLevel={editingLevel}
          onLevelInputChange={setLevelInput}
          onSaveLevel={handleSaveLevel}
          onStartEditLevel={handleStartEditLevel}
          onDeleteLevel={handleDeleteLevel}
          courses={courses}
          courseForm={courseForm}
          editingCourseId={editingCourseId}
          onCourseFormChange={(
            key: "title" | "description" | "category" | "level",
            value: string
          ) => handleChangeCourseForm(key, value)}
          onSaveCourse={handleSaveCourse}
          onStartEditCourse={handleStartEditCourse}
          onDeleteCourse={handleDeleteCourse}
        />

        <InstructorCourseListSection
          filteredCoursesCount={filteredCourses.length}
          paginatedCourses={paginatedCourses}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
