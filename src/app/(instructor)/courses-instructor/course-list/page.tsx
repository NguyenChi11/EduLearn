"use client";

import React, { useCallback, useMemo, useState } from "react";

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

export default function InstructorCourseListPage() {
  const { instructor } = useInstructor();

  const allCourses = useMemo(
    () => getInstructorCourses(instructor?.id),
    [instructor]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>(DEFAULT_SORT);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          allCourses
            .map((c) => c.kindOfCourse)
            .filter(
              (
                value
              ): value is NonNullable<
                (typeof allCourses)[number]["kindOfCourse"]
              > => Boolean(value)
            )
        )
      ),
    [allCourses]
  );

  const levels = useMemo(() => ["S", "Pres", "TC", "MTC"] as const, []);

  const filteredCourses = useMemo(() => {
    let results = [...allCourses];

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
        filters.categories!.includes(c.kindOfCourse)
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
  }, [allCourses, searchQuery, filters, sortBy]);

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
                    detailHref={`/courses-instructor/${course.id}`}
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
