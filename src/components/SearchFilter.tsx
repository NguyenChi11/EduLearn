"use client";

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Card from "@/components/ui/Card";

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
        level: (selectedLevel as FilterOptions["level"]) || undefined,
      });
    },
    [selectedLevel, onFilter]
  );

  const handleLevelChange = useCallback(
    (value: string) => {
      setSelectedLevel(value);
      onFilter({
        category: selectedCategory || undefined,
        level: (value as FilterOptions["level"]) || undefined,
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
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0"
          aria-hidden="true"
        />
        <Input
          placeholder="Tìm kiếm khóa học..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search courses"
          className="pl-10"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          className="h-10 px-4"
          aria-expanded={showFilters}
          aria-controls="filter-panel"
        >
          {showFilters ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="secondary"
            onClick={clearFilters}
            className="h-10 px-3 flex items-center gap-1"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            <span>Xóa bộ lọc</span>
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <Card>
          <div
            id="filter-panel"
            className="grid md:grid-cols-2 gap-4"
          >
            <div>
              <Label htmlFor="category-select">Danh mục</Label>
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
              <Label htmlFor="level-select">Mức độ</Label>
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
        </Card>
      )}
    </div>
  );
}
