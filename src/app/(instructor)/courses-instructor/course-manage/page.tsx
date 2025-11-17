"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useInstructor } from "@/contexts/InstructorContext";
import { getInstructorCourses } from "@/utils/instructor-course-utils";
import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ConfirmPopup from "@/components/ui/ConfirmPopup";
import { Image as ImageIcon } from "lucide-react";
import type { Course } from "@/types/course-type";

type CourseCategory = {
  id: string;
  name: string;
};

type CourseKindMeta = {
  id: string;
  label: string;
  value: string;
};

type CourseLevelMeta = {
  id: string;
  label: string;
  value: string;
};

type MetaTab = "category" | "kind" | "level";
type MainTab = "course" | "category" | "level";

const BASE_KIND_OPTIONS: CourseKindMeta[] = [
  { id: "kind-1", label: "IELTS", value: "IELTS" },
  { id: "kind-2", label: "TOEIC", value: "TOEIC" },
  { id: "kind-3", label: "4 kỹ năng", value: "4SKILLS" },
  { id: "kind-4", label: "VSTEP", value: "VSTEP" },
];

const BASE_LEVEL_OPTIONS: CourseLevelMeta[] = [
  { id: "level-1", label: "Starter (S)", value: "S" },
  { id: "level-2", label: "Pre (Pres)", value: "Pres" },
  { id: "level-3", label: "Trung cấp (TC)", value: "TC" },
  { id: "level-4", label: "Mở rộng (MTC)", value: "MTC" },
];

type CourseFormState = Pick<
  Course,
  "title" | "description" | "kindOfCourse" | "level" | "category" | "thumbnail"
>;

const DEFAULT_FORM: CourseFormState = {
  title: "",
  description: "",
  kindOfCourse: "IELTS",
  level: "S",
  category: "",
  thumbnail: "",
};

export default function InstructorCourseManagePage() {
  const { instructor } = useInstructor();
  const router = useRouter();

  const initialCourses = useMemo(
    () => getInstructorCourses(instructor?.id),
    [instructor]
  );

  // Quản lý state cục bộ cho danh sách khóa học (demo, chưa connect API)
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const initialCategories = useMemo<CourseCategory[]>(() => {
    const set = new Set<string>();
    initialCourses.forEach((course) => {
      if (course.category) {
        set.add(course.category);
      }
    });
    return Array.from(set).map((name, index) => ({
      id: `cat-${index + 1}`,
      name,
    }));
  }, [initialCourses]);
  const [categories, setCategories] =
    useState<CourseCategory[]>(initialCategories);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [activeMetaTab, setActiveMetaTab] = useState<MetaTab>("category");
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("course");
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [kindOptions, setKindOptions] =
    useState<CourseKindMeta[]>(BASE_KIND_OPTIONS);
  const [levelOptions, setLevelOptions] =
    useState<CourseLevelMeta[]>(BASE_LEVEL_OPTIONS);
  const [kindLabel, setKindLabel] = useState("");
  const [editingKindId, setEditingKindId] = useState<string | null>(null);
  const [levelLabel, setLevelLabel] = useState("");
  const [editingLevelId, setEditingLevelId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterKind, setFilterKind] = useState<string>("");
  const [filterLevel, setFilterLevel] = useState<string>("");

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        if (filterCategory && course.category !== filterCategory) return false;
        if (filterKind && course.kindOfCourse !== filterKind) return false;
        if (filterLevel && course.level !== filterLevel) return false;
        return true;
      }),
    [courses, filterCategory, filterKind, filterLevel]
  );
  const [isCreating, setIsCreating] = useState(false); // mở/đóng popup tạo/chỉnh sửa
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<CourseFormState>(DEFAULT_FORM);
  const [showConfirm, setShowConfirm] = useState(false);

  const isEditing = Boolean(editingCourseId);

  // Khóa cuộn trang khi popup đang mở
  useEffect(() => {
    if (typeof document === "undefined") return;

    const originalOverflow = document.body.style.overflow;

    if (isCreating || showCategoryPopup || showConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }

    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isCreating, showCategoryPopup, showConfirm]);

  const handleStartCreate = () => {
    setFormValues(DEFAULT_FORM);
    setEditingCourseId(null);
    setIsCreating(true);
  };

  const handleStartEdit = (course: Course) => {
    setFormValues({
      title: course.title,
      description: course.description,
      kindOfCourse: course.kindOfCourse,
      level: course.level,
      category: course.category ?? "",
      thumbnail: course.thumbnail ?? "",
    });
    setEditingCourseId(course.id);
    setIsCreating(true);
  };

  const handleCancelForm = () => {
    setIsCreating(false);
    setEditingCourseId(null);
    setFormValues(DEFAULT_FORM);
    setShowConfirm(false);
  };

  const handleChangeField = <K extends keyof CourseFormState>(
    key: K,
    value: CourseFormState[K]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      handleChangeField("thumbnail", "");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        handleChangeField("thumbnail", result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCategory = () => {
    const trimmed = categoryName.trim();
    if (!trimmed) return;

    setCategories((prev) => {
      // Nếu đang chỉnh sửa
      if (editingCategoryId) {
        return prev.map((cat) =>
          cat.id === editingCategoryId ? { ...cat, name: trimmed } : cat
        );
      }

      // Nếu thêm mới, tránh trùng tên (không phân biệt hoa thường)
      const exists = prev.some(
        (cat) => cat.name.toLowerCase() === trimmed.toLowerCase()
      );
      if (exists) return prev;

      return [
        ...prev,
        {
          id: `cat-${Date.now()}`,
          name: trimmed,
        },
      ];
    });

    setCategoryName("");
    setEditingCategoryId(null);
  };

  const handleStartEditCategory = (category: CourseCategory) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    if (editingCategoryId === categoryId) {
      setEditingCategoryId(null);
      setCategoryName("");
    }
  };

  const handleCancelEditCategory = () => {
    setEditingCategoryId(null);
    setCategoryName("");
  };

  const handleSaveKind = () => {
    const trimmed = kindLabel.trim();
    if (!trimmed) return;

    setKindOptions((prev) => {
      if (editingKindId) {
        return prev.map((kind) =>
          kind.id === editingKindId ? { ...kind, label: trimmed } : kind
        );
      }

      const exists = prev.some(
        (kind) => kind.label.toLowerCase() === trimmed.toLowerCase()
      );
      if (exists) return prev;

      const safeValueBase = trimmed
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .toUpperCase();

      return [
        ...prev,
        {
          id: `kind-${Date.now()}`,
          label: trimmed,
          value: safeValueBase,
        },
      ];
    });

    setKindLabel("");
    setEditingKindId(null);
  };

  const handleStartEditKind = (kind: CourseKindMeta) => {
    setEditingKindId(kind.id);
    setKindLabel(kind.label);
  };

  const handleDeleteKind = (kindId: string) => {
    setKindOptions((prev) => prev.filter((kind) => kind.id !== kindId));
    if (editingKindId === kindId) {
      setEditingKindId(null);
      setKindLabel("");
    }
  };

  const handleCancelEditKind = () => {
    setEditingKindId(null);
    setKindLabel("");
  };

  const handleSaveLevel = () => {
    const trimmed = levelLabel.trim();
    if (!trimmed) return;

    setLevelOptions((prev) => {
      if (editingLevelId) {
        return prev.map((level) =>
          level.id === editingLevelId ? { ...level, label: trimmed } : level
        );
      }

      const exists = prev.some(
        (level) => level.label.toLowerCase() === trimmed.toLowerCase()
      );
      if (exists) return prev;

      const safeValueBase = trimmed
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .toUpperCase();

      return [
        ...prev,
        {
          id: `level-${Date.now()}`,
          label: trimmed,
          value: safeValueBase,
        },
      ];
    });

    setLevelLabel("");
    setEditingLevelId(null);
  };

  const handleStartEditLevel = (level: CourseLevelMeta) => {
    setEditingLevelId(level.id);
    setLevelLabel(level.label);
  };

  const handleDeleteLevel = (levelId: string) => {
    setLevelOptions((prev) => prev.filter((level) => level.id !== levelId));
    if (editingLevelId === levelId) {
      setEditingLevelId(null);
      setLevelLabel("");
    }
  };

  const handleCancelEditLevel = () => {
    setEditingLevelId(null);
    setLevelLabel("");
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.title.trim()) return;

    // Mở popup xác nhận trước khi thực hiện tạo/cập nhật
    setShowConfirm(true);
  };

  const applyCourseChanges = () => {
    if (!formValues.title.trim()) return;

    if (isEditing && editingCourseId) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editingCourseId
            ? {
                ...course,
                ...formValues,
              }
            : course
        )
      );
    } else {
      const newCourse: Course = {
        id: `temp-${Date.now()}`,
        title: formValues.title.trim(),
        description: formValues.description.trim(),
        thumbnail: formValues.thumbnail.trim(),
        level: formValues.level,
        kindOfCourse: formValues.kindOfCourse,
        totalLessons: 0,
        progress: 0,
        status: "not-started",
        lessons: [],
        fullDescription: formValues.description.trim(),
        coverImage: "",
        rating: 0,
        instructor: instructor?.name ?? instructor?.email ?? "Bạn",
        enrolledCount: 0,
        category: formValues.category || undefined,
      };

      setCourses((prev) => [newCourse, ...prev]);
    }

    setIsCreating(false);
    setEditingCourseId(null);
    setFormValues(DEFAULT_FORM);
    setShowConfirm(false);
  };

  const toggleCourseStatus = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;

        const current = course.status ?? "not-started";
        const next: Course["status"] =
          current === "completed" ? "not-started" : "completed";

        return {
          ...course,
          status: next,
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="space-y-2">
          <Typography variant="h2" as="h1">
            Quản lý khóa học
          </Typography>
          <Typography variant="p" className="max-w-2xl">
            Từ đây bạn có thể tạo mới, cập nhật thông tin và bật/tắt trạng thái
            cho từng khóa học.
          </Typography>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setActiveMainTab("category")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activeMainTab === "category"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Danh mục
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab("course")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activeMainTab === "course"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Khóa học
              </button>
              <button
                type="button"
                onClick={() => setActiveMainTab("level")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activeMainTab === "level"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                Cấp độ
              </button>
            </div>

            {activeMainTab === "course" && (
              <div className="flex items-center gap-2">
                <p className="hidden text-xs text-slate-600 dark:text-slate-300 md:block">
                  Tạo mới hoặc chỉnh sửa thông tin cơ bản của các khóa học bạn
                  phụ trách.
                </p>
                <Button size="sm" onClick={handleStartCreate}>
                  + Tạo khóa học mới
                </Button>
              </div>
            )}

            {activeMainTab === "category" && (
              <div className="flex items-center gap-2">
                <p className="hidden text-xs text-slate-600 dark:text-slate-300 md:block">
                  Quản lý danh mục để nhóm các khóa học theo chủ đề.
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setActiveMetaTab("category");
                    setShowCategoryPopup(true);
                  }}
                >
                  Mở quản lý danh mục
                </Button>
              </div>
            )}

            {activeMainTab === "level" && (
              <div className="flex items-center gap-2">
                <p className="hidden text-xs text-slate-600 dark:text-slate-300 md:block">
                  Quản lý cấp độ (Starter, Trung cấp, ...) cho hệ thống khóa
                  học.
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setActiveMetaTab("level");
                    setShowCategoryPopup(true);
                  }}
                >
                  Mở quản lý cấp độ
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Popup quản lý danh mục / loại / cấp độ */}
        {showCategoryPopup && (
          <div className="fixed inset-0 z-50 m-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="space-y-1">
                  <Typography variant="h3" as="h2">
                    Quản lý danh mục khóa học
                  </Typography>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Thêm, chỉnh sửa hoặc xóa danh mục; đồng thời cấu hình các
                    loại khóa học và cấp độ để dùng lại trong toàn bộ khóa học.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryPopup(false);
                    handleCancelEditCategory();
                  }}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Đóng
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 md:px-6 md:py-5">
                <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setActiveMetaTab("category")}
                    className={`rounded-md px-3 py-1 font-medium transition ${
                      activeMetaTab === "category"
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    Danh mục
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMetaTab("kind")}
                    className={`rounded-md px-3 py-1 font-medium transition ${
                      activeMetaTab === "kind"
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    Loại khóa học
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMetaTab("level")}
                    className={`rounded-md px-3 py-1 font-medium transition ${
                      activeMetaTab === "level"
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    Cấp độ
                  </button>
                </div>

                {activeMetaTab === "category" && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/40 md:flex-row md:items-end">
                      <div className="flex-1">
                        <Input
                          label={
                            editingCategoryId
                              ? "Chỉnh sửa danh mục"
                              : "Thêm danh mục mới"
                          }
                          placeholder="VD: Luyện thi, Giao tiếp, Nền tảng"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSaveCategory}
                        >
                          {editingCategoryId ? "Lưu danh mục" : "Thêm danh mục"}
                        </Button>
                        {editingCategoryId && (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={handleCancelEditCategory}
                          >
                            Hủy
                          </Button>
                        )}
                      </div>
                    </div>

                    {categories.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Chưa có danh mục nào. Hãy thêm danh mục để gán cho các
                        khóa học.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/40">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900"
                          >
                            <span className="font-medium text-slate-700 dark:text-slate-100">
                              {category.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditCategory(category)}
                              className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(category.id)}
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

                {activeMetaTab === "kind" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/40 md:flex-row md:items-end">
                      <div className="flex-1">
                        <Input
                          label={
                            editingKindId
                              ? "Chỉnh sửa loại khóa học"
                              : "Thêm loại khóa học mới"
                          }
                          placeholder="VD: IELTS, TOEIC, 4 kỹ năng..."
                          value={kindLabel}
                          onChange={(e) => setKindLabel(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSaveKind}
                        >
                          {editingKindId ? "Lưu loại" : "Thêm loại"}
                        </Button>
                        {editingKindId && (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={handleCancelEditKind}
                          >
                            Hủy
                          </Button>
                        )}
                      </div>
                    </div>

                    {kindOptions.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Chưa có loại khóa học nào. Hãy thêm ít nhất một loại để
                        gán cho khóa học.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/40">
                        {kindOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900"
                          >
                            <span className="font-medium text-slate-700 dark:text-slate-100">
                              {option.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditKind(option)}
                              className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteKind(option.id)}
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

                {activeMetaTab === "level" && (
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/40 md:flex-row md:items-end">
                      <div className="flex-1">
                        <Input
                          label={
                            editingLevelId
                              ? "Chỉnh sửa cấp độ"
                              : "Thêm cấp độ mới"
                          }
                          placeholder="VD: Starter, Trung cấp..."
                          value={levelLabel}
                          onChange={(e) => setLevelLabel(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSaveLevel}
                        >
                          {editingLevelId ? "Lưu cấp độ" : "Thêm cấp độ"}
                        </Button>
                        {editingLevelId && (
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={handleCancelEditLevel}
                          >
                            Hủy
                          </Button>
                        )}
                      </div>
                    </div>

                    {levelOptions.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Chưa có cấp độ nào. Hãy thêm ít nhất một cấp độ để gán
                        cho khóa học.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/40">
                        {levelOptions.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900"
                          >
                            <span className="font-medium text-slate-700 dark:text-slate-100">
                              {option.label}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditLevel(option)}
                              className="text-[11px] text-blue-600 hover:underline dark:text-blue-400"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLevel(option.id)}
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

        {/* Popup xác nhận tạo/cập nhật khóa học */}
        <ConfirmPopup
          open={showConfirm}
          title={
            isEditing
              ? "Xác nhận cập nhật khóa học"
              : "Xác nhận tạo khóa học mới"
          }
          description={
            isEditing
              ? "Bạn có chắc chắn muốn lưu các thay đổi cho khóa học này?"
              : "Bạn có chắc chắn muốn tạo khóa học mới với các thông tin đã nhập?"
          }
          onCancel={() => setShowConfirm(false)}
          onConfirm={applyCourseChanges}
          confirmText={isEditing ? "Lưu" : "Tạo khóa học"}
          cancelText="Quay lại chỉnh sửa"
        />

        {/* Popup tạo/chỉnh sửa khóa học */}
        {isCreating && (
          <div className="fixed inset-0 z-50 m-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-slate-800">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="space-y-1">
                  <Typography variant="h3" as="h2">
                    {isEditing ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
                  </Typography>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Nhập các thông tin cơ bản cho khóa học. Bạn có thể cấu hình
                    nội dung chi tiết sau trong mục quản lý nội dung học.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Đóng
                </button>
              </div>

              <form
                onSubmit={handleSubmitForm}
                className="flex-1 space-y-6 overflow-y-auto bg-white px-5 py-5 md:px-6 md:py-6 dark:bg-slate-950"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Tên khóa học"
                    value={formValues.title}
                    onChange={(e) => handleChangeField("title", e.target.value)}
                    placeholder="VD: Luyện thi IELTS 7.0+"
                    required
                  />

                  <Select
                    label="Loại khóa học"
                    value={formValues.kindOfCourse}
                    onChange={(value) =>
                      handleChangeField(
                        "kindOfCourse",
                        value as CourseFormState["kindOfCourse"]
                      )
                    }
                    options={kindOptions.map((kind) => ({
                      label: kind.label,
                      value: kind.value,
                    }))}
                  />

                  <Select
                    label="Cấp độ"
                    value={formValues.level}
                    onChange={(value) =>
                      handleChangeField(
                        "level",
                        value as CourseFormState["level"]
                      )
                    }
                    options={levelOptions.map((level) => ({
                      label: level.label,
                      value: level.value,
                    }))}
                  />

                  <Select
                    label="Danh mục / Nhóm khóa học"
                    value={formValues.category}
                    onChange={(value) => {
                      if (value === "__NEW_CATEGORY__") {
                        setActiveMetaTab("category");
                        setShowCategoryPopup(true);
                        return;
                      }
                      handleChangeField(
                        "category",
                        value as CourseFormState["category"]
                      );
                    }}
                    options={[
                      { label: "+ Danh mục mới…", value: "__NEW_CATEGORY__" },
                      ...categories.map((category) => ({
                        label: category.name,
                        value: category.name,
                      })),
                    ]}
                    placeholder="Chọn danh mục cho khóa học"
                    hint="Chọn danh mục hoặc nhấn '+ Danh mục mới…' để thêm danh mục."
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,3fr)] md:items-start">
                  <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-900/40">
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Ảnh minh họa khóa học
                    </label>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      className="group flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-xs text-slate-500 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-900"
                    >
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-100">
                        Nhấn để chọn ảnh hoặc kéo thả vào đây
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        Hỗ trợ các định dạng phổ biến như JPG, PNG, WEBP.
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="sr-only"
                      />
                    </div>
                    {formValues.thumbnail && (
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-20 w-20 overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={formValues.thumbnail}
                            alt="Xem trước ảnh minh họa khóa học"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Ảnh này sẽ xuất hiện trong danh sách khóa học của bạn.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/40">
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Mô tả ngắn
                    </label>
                    <textarea
                      className="min-h-[120px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      value={formValues.description}
                      onChange={(e) =>
                        handleChangeField("description", e.target.value)
                      }
                      placeholder="Mô tả ngắn gọn về khóa học, mục tiêu, đối tượng học viên,..."
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Mô tả này giúp học viên nhanh chóng hiểu được nội dung và
                      mục tiêu của khóa học.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleCancelForm}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" size="sm">
                    {isEditing ? "Lưu thay đổi" : "Tạo khóa học"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <SectionBox title="Danh sách khóa học đang phụ trách">
          {courses.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Bạn chưa có khóa học nào. Hãy tạo khóa học mới ở phần trên.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Select
                  label="Lọc theo danh mục"
                  value={filterCategory}
                  onChange={(value) => setFilterCategory(value)}
                  options={[
                    { label: "Tất cả danh mục", value: "" },
                    ...categories.map((category) => ({
                      label: category.name,
                      value: category.name,
                    })),
                  ]}
                  placeholder="Tất cả danh mục"
                />
                <Select
                  label="Lọc theo loại khóa học"
                  value={filterKind}
                  onChange={(value) => setFilterKind(value)}
                  options={[
                    { label: "Tất cả loại", value: "" },
                    ...kindOptions.map((kind) => ({
                      label: kind.label,
                      value: kind.value,
                    })),
                  ]}
                  placeholder="Tất cả loại khóa học"
                />
                <Select
                  label="Lọc theo cấp độ"
                  value={filterLevel}
                  onChange={(value) => setFilterLevel(value)}
                  options={[
                    { label: "Tất cả cấp độ", value: "" },
                    ...levelOptions.map((level) => ({
                      label: level.label,
                      value: level.value,
                    })),
                  ]}
                  placeholder="Tất cả cấp độ"
                />
              </div>

              {filteredCourses.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Không có khóa học nào phù hợp với bộ lọc hiện tại.
                </p>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 py-4"
                    >
                      <div className="flex w-full flex-1 items-start gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                          {course.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={course.thumbnail}
                              alt={`Ảnh minh họa khóa học ${course.title}`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-slate-400 dark:text-slate-500">
                              Không có ảnh
                            </div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {course.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {course.category ?? "Chưa có danh mục"} · Cấp độ{" "}
                            {levelOptions.find(
                              (level) => level.value === course.level
                            )?.label ?? course.level}{" "}
                            · Loại{" "}
                            {kindOptions.find(
                              (kind) => kind.value === course.kindOfCourse
                            )?.label ?? course.kindOfCourse}
                          </p>
                          <p className="text-xs text-slate-500">
                            Trạng thái:{" "}
                            <span
                              className={
                                course.status === "completed"
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-amber-600 dark:text-amber-400"
                              }
                            >
                              {course.status === "completed"
                                ? "Đang mở tuyển sinh"
                                : "Đang tắt / chuẩn bị"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(course)}
                          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                        >
                          Chỉnh sửa thông tin
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/courses-instructor/content-manage?courseId=${course.id}`
                            )
                          }
                          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                        >
                          Quản lý nội dung học
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/courses-instructor/student-manage?courseId=${course.id}`
                            )
                          }
                          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                        >
                          Xem học viên
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCourseStatus(course.id)}
                          className={`rounded-md px-3 py-1.5 text-xs font-medium shadow-sm transition ${
                            course.status === "completed"
                              ? "border border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-500/80 dark:bg-amber-950/40 dark:text-amber-300"
                              : "border border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/80 dark:bg-emerald-950/40 dark:text-emerald-300"
                          }`}
                        >
                          {course.status === "completed"
                            ? "Tắt khóa học"
                            : "Bật khóa học"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </SectionBox>
      </div>
    </div>
  );
}
