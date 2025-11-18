"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getCourseById } from "@/utils/instructor-course-utils";
import type { LessonResource } from "@/types/course-type";
import BackButton from "@/components/ui/BackButton";
import SectionBox from "@/components/ui/SectionBox";
import Typography from "@/components/ui/Typography";

export default function InstructorLessonDetailPage() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.id as string;
  const lessonId = params.lession as string;

  const course = getCourseById(courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId) ?? null;

  const [videoUrl, setVideoUrl] = useState<string>(
    lesson?.videoUrl ?? lesson?.url ?? ""
  );
  const [attachments, setAttachments] = useState<LessonResource[]>(
    lesson?.attachments ?? []
  );
  const [newAttachment, setNewAttachment] = useState<{
    title: string;
    url: string;
    type: LessonResource["type"];
  }>({
    title: "",
    url: "",
    type: "pdf",
  });

  const hasChanges = useMemo(() => {
    return (
      videoUrl !== (lesson?.videoUrl ?? lesson?.url ?? "") ||
      JSON.stringify(attachments) !== JSON.stringify(lesson?.attachments ?? [])
    );
  }, [videoUrl, attachments, lesson]);

  const handleAddAttachment = () => {
    if (!newAttachment.title || !newAttachment.url) return;
    setAttachments((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        title: newAttachment.title,
        url: newAttachment.url,
        type: newAttachment.type,
      },
    ]);
    setNewAttachment({
      title: "",
      url: "",
      type: "pdf",
    });
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  if (!lesson) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-slate-600 dark:text-slate-400">
          Không tìm thấy bài học
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8 space-y-6">
      <BackButton
        onClick={() =>
          router.push(`/courses-instructor/course-list/${courseId}`)
        }
      />

      <SectionBox>
        <Typography variant="h2" as="h1" className="mb-2">
          {lesson.title}
        </Typography>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
          Trang thiết lập nội dung cho bài học. Tại đây bạn có thể cấu hình{" "}
          <b>video bài học</b> và <b>tài liệu đính kèm</b>.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          (Demo UI, dữ liệu chỉ được lưu trong bộ nhớ tạm thời trên trình duyệt
          — chưa kết nối backend.)
        </p>
      </SectionBox>

      <SectionBox title="Video bài học">
        <div className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Nhập URL video (YouTube, Vimeo hoặc link video trực tiếp). Nếu bỏ
            trống, học viên sẽ không thấy video ở bài học này.
          </p>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Ví dụ: https://www.youtube.com/watch?v=..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          {videoUrl && (
            <div className="mt-2 space-y-2">
              <p className="text-xs font-medium text-slate-500">
                Xem trước (preview)
              </p>
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-black/80">
                {/* Demo: chỉ hiển thị thẻ video đơn giản hoặc iframe URL */}
                <iframe
                  src={videoUrl}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </SectionBox>

      <SectionBox title="Tài liệu đính kèm">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Thêm các tài liệu hỗ trợ cho bài học như PDF, slide, đường dẫn bài
            đọc thêm, v.v.
          </p>

          <div className="space-y-2 rounded-lg border border-dashed border-slate-300 p-3 text-xs dark:border-slate-700">
            <p className="font-medium text-slate-700 dark:text-slate-200">
              Thêm tài liệu mới
            </p>
            <div className="grid gap-2 md:grid-cols-3">
              <input
                className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:col-span-1"
                placeholder="Tên tài liệu (Ví dụ: Slide bài 1)"
                value={newAttachment.title}
                onChange={(e) =>
                  setNewAttachment((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <input
                className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:col-span-1"
                placeholder="Link tải/xem tài liệu"
                value={newAttachment.url}
                onChange={(e) =>
                  setNewAttachment((prev) => ({
                    ...prev,
                    url: e.target.value,
                  }))
                }
              />
              <select
                className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                value={newAttachment.type ?? "pdf"}
                onChange={(e) =>
                  setNewAttachment((prev) => ({
                    ...prev,
                    type: e.target.value as LessonResource["type"],
                  }))
                }
              >
                <option value="pdf">PDF</option>
                <option value="ppt">Slide</option>
                <option value="doc">Tài liệu Word</option>
                <option value="link">Đường dẫn tham khảo</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={handleAddAttachment}
                className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                disabled={!newAttachment.title || !newAttachment.url}
              >
                Thêm tài liệu
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500">
              Danh sách tài liệu hiện có ({attachments.length})
            </p>
            {attachments.length === 0 ? (
              <p className="text-xs text-slate-500">
                Chưa có tài liệu nào được thêm.
              </p>
            ) : (
              <ul className="space-y-2">
                {attachments.map((att) => (
                  <li
                    key={att.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="space-y-0.5">
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {att.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate max-w-xs md:max-w-sm">
                        {att.url}
                      </p>
                      {att.type && (
                        <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          {att.type.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(att.id)}
                      className="text-[11px] font-medium text-red-500 hover:text-red-600"
                    >
                      Xóa
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SectionBox>

      <SectionBox className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
            Lưu cấu hình nội dung
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Chức năng lưu này hiện chỉ mang tính minh họa (mock), chưa ghi vào
            cơ sở dữ liệu thật.
          </p>
        </div>
        <button
          type="button"
          disabled={!hasChanges}
          className="rounded-md bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {hasChanges ? "Lưu cấu hình" : "Đã lưu"}
        </button>
      </SectionBox>
    </main>
  );
}


