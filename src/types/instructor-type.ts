import type { Instructor } from "@/data/instructors-data";

export type InstructorSortOption = "name-asc" | "name-desc" | "courses-desc";

export interface InstructorWithStats extends Instructor {
  courseCount: number;
}


