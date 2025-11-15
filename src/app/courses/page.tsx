"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { MOCK_COURSES } from "@/data/mock-data";
import { getStoredUser } from "@/utils/auth-utils";

import type { Course } from "@/types/course-type";
import type { User } from "@/types/user-type";
import CourseSearchSection from "@/components/courses/CourseSearchSection";
import CourseGridView from "@/components/courses/CourseGridView";
import Pagination from "@/components/ui/Pagination";
import { FilterOptions } from "@/components/SearchFilter";

const ITEMS_PER_PAGE = 9;

export default function CoursesPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [filteredCourses, setFilteredCourses] =
    useState<Course[]>(MOCK_COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.replace("/auth");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(storedUser);
  }, [router]);

  const categories = useMemo(
    () => [...new Set(MOCK_COURSES.map((c) => c.kindOfCourse).filter(Boolean))],
    []
  );

  const levels = useMemo(() => ["S", "Pres", "TC", "MTC"] as const, []);

  useEffect(() => {
    let results = MOCK_COURSES;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.kindOfCourse?.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      results = results.filter((c) => c.kindOfCourse === filters.category);
    }

    if (filters.level) {
      results = results.filter((c) => c.level === filters.level);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredCourses(results);
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const changePage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <CourseSearchSection
        categories={categories}
        levels={[...levels]}
        onSearch={setSearchQuery}
        onFilter={setFilters}
        searchQuery={searchQuery}
        filterOptions={filters}
        coursesFound={filteredCourses.length}
        totalCourses={MOCK_COURSES.length}
      />
      <CourseGridView courses={paginatedCourses} userId={user.id} />
      <Pagination
        page={currentPage}
        pageCount={totalPages}
        onPageChange={changePage}
      />
    </div>
  );
}
