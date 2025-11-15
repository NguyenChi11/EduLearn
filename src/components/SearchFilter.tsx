"use client";

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";

export interface FilterOptions {
  category?: string;
  level?: "S" | "Pres" | "TC" | "MTC";
}

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  categories: string[];
  levels: readonly ("S" | "Pres" | "TC" | "MTC")[];
}

export default function SearchFilter({
  onSearch,
  onFilter,
  categories,
  levels,
}: SearchFilterProps) {
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSelectedCategory(value);
      onFilter({
        category: value || undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        level: (selectedLevel as any) || undefined,
      });
    },
    [selectedLevel, onFilter]
  );

  const handleLevelChange = useCallback(
    (value: string) => {
      setSelectedLevel(value);
      onFilter({
        category: selectedCategory || undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        level: (value as any) || undefined,
      });
    },
    [selectedCategory, onFilter]
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setSelectedCategory("");
    setSelectedLevel("");
    onSearch("");
    onFilter({});
  }, [onSearch, onFilter]);

  const hasActiveFilters = !!(query || selectedCategory || selectedLevel);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-3 w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search courses"
          className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 pl-10 pr-3 py-2 text-base text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-sm font-medium"
          aria-expanded={showFilters}
          aria-controls="filter-panel"
        >
          {showFilters ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 h-10 px-3"
          >
            <X className="w-4 h-4 mr-1" aria-hidden="true" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div
          id="filter-panel"
          className="grid md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"
        >
          <div>
            <label
              htmlFor="category-select"
              className="block text-sm font-medium mb-2"
            >
              Danh mục
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-base text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="level-select"
              className="block text-sm font-medium mb-2"
            >
              Mức độ
            </label>
            <select
              id="level-select"
              value={selectedLevel}
              onChange={(e) => handleLevelChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-base text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="">Tất cả mức độ</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
