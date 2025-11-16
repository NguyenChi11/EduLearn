import Image from "next/image";

import { INSTRUCTORS } from "@/data/instructors-data";

interface InstructorDetailPageProps {
  params: {
    id: string;
  };
}

export default function InstructorDetailPage({
  params,
}: InstructorDetailPageProps) {
  const instructor = INSTRUCTORS.find((ins) => ins.id === params.id);

  if (!instructor) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Không tìm thấy giảng viên
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Có vẻ như giảng viên bạn tìm không tồn tại hoặc đã bị xoá.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          {instructor.avatarUrl ? (
            <Image
              src={instructor.avatarUrl}
              alt={instructor.name}
              className="h-24 w-24 rounded-full object-cover md:h-28 md:w-28"
              width={100}
              height={100}
              priority
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-3xl font-bold text-white md:h-28 md:w-28">
              {instructor.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              {instructor.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {instructor.role}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Chuyên môn: {instructor.expertise}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Giới thiệu
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            {instructor.bio}
          </p>
        </div>
      </section>
    </main>
  );
}
