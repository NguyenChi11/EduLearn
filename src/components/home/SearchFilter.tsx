"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, Check, Filter } from "lucide-react";

import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Card from "@/components/ui/Card";

export interface FilterOptions {
  categories?: string[];
  levels?: ("S" | "Pres" | "TC" | "MTC")[];
}

export type SortOption = "popular" | "rating" | "title-asc";

const sortLabels: Record<SortOption, string> = {
  popular: "Phổ biến nhất",
  rating: "Được đánh giá cao",
  "title-asc": "Tên A-Z",
};

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  categories: string[];
  levels: readonly ("S" | "Pres" | "TC" | "MTC")[];
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SearchFilter({
  onSearch,
  onFilter,
  categories,
  levels,
  sortBy,
  onSortChange,
}: SearchFilterProps) {
  const [query, setQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<
    ("S" | "Pres" | "TC" | "MTC")[]
  >([]);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleCategoryToggle = useCallback(
    (category: string) => {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      setSelectedCategories(newCategories);
      onFilter({
        categories: newCategories.length > 0 ? newCategories : undefined,
        levels: selectedLevels.length > 0 ? selectedLevels : undefined,
      });
    },
    [selectedCategories, selectedLevels, onFilter]
  );

  const handleLevelToggle = useCallback(
    (level: "S" | "Pres" | "TC" | "MTC") => {
      const newLevels = selectedLevels.includes(level)
        ? selectedLevels.filter((l) => l !== level)
        : [...selectedLevels, level];
      setSelectedLevels(newLevels);
      onFilter({
        categories:
          selectedCategories.length > 0 ? selectedCategories : undefined,
        levels: newLevels.length > 0 ? newLevels : undefined,
      });
    },
    [selectedCategories, selectedLevels, onFilter]
  );

  const clearFilters = useCallback(() => {
    setQuery("");
    setSelectedCategories([]);
    setSelectedLevels([]);
    onSearch("");
    onFilter({});
  }, [onSearch, onFilter]);

  const hasActiveFilters = !!(
    selectedCategories.length > 0 || selectedLevels.length > 0
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const levelLabels: Record<string, string> = {
    S: "Sơ cấp",
    Pres: "Tiền trung cấp",
    TC: "Trung cấp",
    MTC: "Trung cao cấp",
  };

  return (
    <div className="space-y-3">
      {/* Search + Sort + Filter */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, giảng viên, hoặc chủ đề..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search courses"
            className="flex h-10 w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-10 py-2 text-sm text-slate-950 dark:text-slate-50 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-slate-300 focus:ring-offset-2"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort & Filter controls */}
        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end md:ml-4">
          {/* Sort segmented control (no native select) */}
          <div className="flex items-center gap-2">
            <div
              className="inline-flex items-center rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-900/60 p-0.5 shadow-sm backdrop-blur-sm"
              role="listbox"
              aria-label="Sắp xếp khóa học"
            >
              {Object.entries(sortLabels).map(([value, label]) => {
                const isActive = sortBy === (value as SortOption);
                const baseClass =
                  "relative px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900";
                const activeClass =
                  "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-sm";
                const inactiveClass =
                  "text-slate-600 dark:text-slate-300 hover:bg-slate-100/90 dark:hover:bg-slate-800/90";
                return (
                  <button
                    key={value}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => onSortChange(value as SortOption)}
                    className={`${baseClass} ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter dropdown trigger */}
          <div className="relative" ref={filterDropdownRef}>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setOpenFilterDropdown((prev) => !prev)}
              className="h-10 px-3 flex items-center justify-center gap-2 w-full sm:w-auto"
              aria-expanded={openFilterDropdown}
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm">Bộ lọc</span>
              {hasActiveFilters && (
                <span className="ml-1 inline-flex items-center rounded-full bg-blue-600 dark:bg-blue-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {selectedCategories.length + selectedLevels.length}
                </span>
              )}
            </Button>

            {openFilterDropdown && (
              <Card className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,360px)] p-4 shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    Bộ lọc nâng cao
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Xóa tất cả
                    </button>
                  )}
                </div>

                <div className="grid gap-4">
                  {/* Categories */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Danh mục
                    </Label>
                    <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
                      {categories.map((cat) => {
                        const isChecked = selectedCategories.includes(cat);
                        return (
                          <label
                            key={cat}
                            className="flex cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCategoryToggle(cat)}
                                className="h-4 w-4 rounded border border-slate-300 dark:border-slate-600 text-blue-600 ring-offset-white dark:ring-offset-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2 checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500"
                              />
                              {isChecked && (
                                <Check className="pointer-events-none absolute h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className="flex-1 text-slate-800 dark:text-slate-100">
                              {cat}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Levels */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Mức độ
                    </Label>
                    <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
                      {levels.map((level) => {
                        const isChecked = selectedLevels.includes(level);
                        return (
                          <label
                            key={level}
                            className="flex cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleLevelToggle(level)}
                                className="h-4 w-4 rounded border border-slate-300 dark:border-slate-600 text-blue-600 ring-offset-white dark:ring-offset-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 dark:focus-visible:ring-slate-300 focus-visible:ring-offset-2 checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500"
                              />
                              {isChecked && (
                                <Check className="pointer-events-none absolute h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className="flex-1 text-slate-800 dark:text-slate-100">
                              {levelLabels[level] || level}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                              {level}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
