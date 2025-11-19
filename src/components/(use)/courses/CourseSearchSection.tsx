import React from "react";
import SearchFilter, {
  FilterOptions,
  SortOption,
} from "@/components/home/SearchFilter";

interface CourseSearchSectionProps {
  categories: string[];
  levels: string[];
  onSearch: (q: string) => void;
  onFilter: (f: FilterOptions) => void;
  searchQuery: string;
  filterOptions: FilterOptions;
  coursesFound: number;
  totalCourses: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function CourseSearchSection({
  categories,
  levels,
  onSearch,
  onFilter,
  sortBy,
  onSortChange,
  coursesFound,
  totalCourses,
}: CourseSearchSectionProps) {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">
        Khám phá khóa học
      </h1>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
        Chọn từ {totalCourses} khóa học chất lượng cao
      </p>
      <SearchFilter
        onSearch={onSearch}
        onFilter={onFilter}
        categories={categories}
        levels={levels as readonly ("S" | "Pres" | "TC" | "MTC")[]}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-4 sm:mt-6">
        Tìm thấy {coursesFound} khóa học
      </p>
    </>
  );
}
