import React from "react";
import SearchFilter, { FilterOptions } from "@/components/SearchFilter";

interface CourseSearchSectionProps {
  categories: string[];
  levels: string[];
  onSearch: (q: string) => void;
  onFilter: (f: FilterOptions) => void;
  searchQuery: string;
  filterOptions: FilterOptions;
  coursesFound: number;
  totalCourses: number;
}

export default function CourseSearchSection({
  categories,
  levels,
  onSearch,
  onFilter,
  searchQuery,
  filterOptions,
  coursesFound,
  totalCourses,
}: CourseSearchSectionProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
        Khám phá khóa học
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Chọn từ {totalCourses} khóa học chất lượng cao
      </p>
      <SearchFilter
        onSearch={onSearch}
        onFilter={onFilter}
        categories={categories}
        levels={levels as readonly ("S" | "Pres" | "TC" | "MTC")[]}
      />
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-6">
        Tìm thấy {coursesFound} khóa học
      </p>
    </>
  );
}
