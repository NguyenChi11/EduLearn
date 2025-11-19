import Link from "next/link";
import Image from "next/image";

import Card from "@/components/ui/Card";
import type { InstructorWithStats } from "@/types/instructor-type";

interface InstructorCardProps {
  instructor: InstructorWithStats;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const initial = instructor.name.charAt(0).toUpperCase();

  return (
    <Link
      href={`/Instructor/${instructor.id}`}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
    >
      <Card className="flex h-full flex-col items-center bg-white/80 p-4 md:p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-slate-900/80">
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
}


