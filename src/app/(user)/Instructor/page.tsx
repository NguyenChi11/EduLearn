"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

import { INSTRUCTORS } from "@/data/instructors-data";
import { MOCK_COURSES } from "@/data/mock-data";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

type SortOption = "name-asc" | "name-desc" | "courses-desc";

interface InstructorWithStats {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string;
  avatarUrl?: string;
  courseCount: number;
}

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");

  const roles = useMemo(
    () => Array.from(new Set(INSTRUCTORS.map((ins) => ins.role))).sort(),
    []
  );

  const instructorsWithStats: InstructorWithStats[] = useMemo(
    () =>
      INSTRUCTORS.map((ins) => ({
        ...ins,
        courseCount: MOCK_COURSES.filter(
          (course) => course.instructor === ins.name
        ).length,
      })),
    []
  );

  const handleRoleToggle = useCallback((role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedRoles([]);
    setSortBy("name-asc");
  }, []);

  const filteredInstructors = useMemo(() => {
    let list = [...instructorsWithStats];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (ins) =>
          ins.name.toLowerCase().includes(q) ||
          ins.role.toLowerCase().includes(q) ||
          ins.expertise.toLowerCase().includes(q)
      );
    }

    if (selectedRoles.length > 0) {
      list = list.filter((ins) => selectedRoles.includes(ins.role));
    }

    list.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "courses-desc") {
        return b.courseCount - a.courseCount;
      }
      return 0;
    });

    return list;
  }, [instructorsWithStats, searchQuery, selectedRoles, sortBy]);

  const hasActiveFilters =
    !!searchQuery || selectedRoles.length > 0 || sortBy !== "name-asc";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <Typography
              as="h1"
              variant="h1"
              className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50"
            >
              Danh sách giảng viên
            </Typography>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Tìm kiếm, lọc và khám phá đội ngũ giảng viên của EduLearn.
            </p>
          </div>

          {hasActiveFilters && (
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={clearFilters}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {/* Thanh tìm kiếm + sắp xếp + lọc vai trò */}
        <Card className="p-4 md:p-5 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, chuyên môn hoặc vai trò..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-sm text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300"
                  aria-label="Xóa tìm kiếm"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort controls */}
            <div className="mt-2 flex items-center gap-2 md:mt-0">
              <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Sắp xếp
              </span>
              <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-slate-50/60 p-0.5 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/60">
                <button
                  type="button"
                  onClick={() => setSortBy("name-asc")}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full font-medium ${
                    sortBy === "name-asc"
                      ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  Tên A-Z
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("name-desc")}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full font-medium ${
                    sortBy === "name-desc"
                      ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  Tên Z-A
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy("courses-desc")}
                  className={`px-3 py-1.5 text-xs md:text-sm rounded-full font-medium ${
                    sortBy === "courses-desc"
                      ? "bg-linear-to-r from-blue-600 to-indigo-500 text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  Nhiều khóa học
                </button>
              </div>
            </div>
          </div>

          {/* Role filters */}
          {roles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Vai trò:
              </span>
              {roles.map((role) => {
                const active = selectedRoles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleToggle(role)}
                    className="focus:outline-none"
                  >
                    <Tag
                      className={`text-xs md:text-sm ${
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {role}
                    </Tag>
                  </button>
                );
              })}
            </div>
          )}
        </Card>

        {/* Kết quả */}
        <div className="space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Đang hiển thị{" "}
            <span className="font-semibold">{filteredInstructors.length}</span>{" "}
            giảng viên
          </p>

          {filteredInstructors.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Không tìm thấy giảng viên phù hợp với bộ lọc hiện tại.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInstructors.map((instructor) => {
                const initial = instructor.name.charAt(0).toUpperCase();
                return (
                  <Link
                    key={instructor.id}
                    href={`/Instructor/${instructor.id}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                  >
                    <Card className="flex h-full flex-col items-center bg-white/80 p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-slate-900/80">
                      {instructor.avatarUrl ? (
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
                          <Image
                            src={instructor.avatarUrl}
                            alt={instructor.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-xl font-bold text-white">
                          {initial}
                        </div>
                      )}

                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        {instructor.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {instructor.role}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Chuyên môn: {instructor.expertise}
                      </p>
                      <p className="mt-2 line-clamp-3 text-xs text-slate-600 dark:text-slate-300">
                        {instructor.bio}
                      </p>

                      <div className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {instructor.courseCount > 0
                          ? `${instructor.courseCount} khóa học`
                          : "Chưa có khóa học"}
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
