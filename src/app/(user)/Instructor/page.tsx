"use client";

import { useMemo, useState, useCallback } from "react";

import { INSTRUCTORS } from "@/data/instructors-data";
import { MOCK_COURSES } from "@/data/mock-data";
import InstructorsHeader from "@/components/instructor/InstructorsHeader";
import InstructorsFilterBar from "@/components/instructor/InstructorsFilterBar";
import InstructorsList from "@/components/instructor/InstructorsList";
import type {
  InstructorSortOption,
  InstructorWithStats,
} from "@/types/instructor-type";

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<InstructorSortOption>("name-asc");

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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-4 md:py-8 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <InstructorsHeader
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />

        {/* Thanh tìm kiếm + sắp xếp + lọc vai trò */}
        <InstructorsFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          roles={roles}
          selectedRoles={selectedRoles}
          onRoleToggle={handleRoleToggle}
        />

        {/* Kết quả */}
        <InstructorsList instructors={filteredInstructors} />
      </div>
    </main>
  );
}
