import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import { INSTRUCTORS } from "@/data/instructors-data";

const ITEMS_PER_PAGE = 3;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function InstructorsSection() {
  const [activePage, setActivePage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const pages = useMemo(() => chunkArray(INSTRUCTORS, ITEMS_PER_PAGE), []);

  useEffect(() => {
    if (pages.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setActivePage((prev) => (prev + 1) % pages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [pages.length, isHovered]);

  return (
    <section
      className="mb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-6 text-center">
        <Typography
          variant="h2"
          as="h2"
          className="mb-2 text-2xl font-semibold text-slate-900 dark:text-slate-50"
        >
          Đội ngũ giảng viên
        </Typography>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Học cùng những giảng viên giàu kinh nghiệm, đang làm việc trong lĩnh
          vực.
        </p>
      </div>

      {/* Carousel: hiển thị 3 thẻ giảng viên mỗi lần, auto scroll 3s (dừng khi hover) */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activePage * 100}%)` }}
          >
            {pages.map((page, pageIndex) => (
              <div key={pageIndex} className="flex min-w-full gap-4">
                {page.map((instructor) => {
                  const initial = instructor.name.charAt(0).toUpperCase();

                  return (
                    <button
                      key={instructor.id}
                      type="button"
                      onClick={() =>
                        router.push(`/Instructor/${instructor.id}`)
                      }
                      className="flex-1 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                    >
                      <Card className="flex h-full flex-col items-center bg-white/80 p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-slate-900/80">
                        {/* Avatar: ưu tiên ảnh, nếu không có thì hiển thị chữ cái đầu */}
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
                      </Card>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Dots điều hướng */}
        {pages.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActivePage(index)}
                className={`h-2 w-2 rounded-full border border-slate-400 transition-all ${
                  index === activePage
                    ? "w-4 bg-slate-600"
                    : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-700"
                }`}
                aria-label={`Chuyển đến nhóm giảng viên ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
