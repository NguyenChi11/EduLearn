"use client";

import { useEffect, useState } from "react";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { useColors, useDarkMode } from "@/theme/hooks";

interface BannerCarouselProps {
  isLoggedIn?: boolean;
}

const slides = [
  {
    title: "Học tập không giới hạn",
    description:
      "Khám phá kho khóa học chất lượng cao, cập nhật liên tục dành cho mọi cấp độ.",
    highlight: "1000+ khóa học",
  },
  {
    title: "Lộ trình rõ ràng, theo sát tiến độ",
    description:
      "Theo dõi tiến trình học, đánh dấu bài đã hoàn thành và tiếp tục đúng nơi bạn dừng lại.",
    highlight: "Tiến độ trực quan",
  },
  {
    title: "Giảng viên là chuyên gia thực chiến",
    description:
      "Học từ những người đang làm việc trong ngành, với ví dụ và dự án thực tế.",
    highlight: "Chuyên gia hàng đầu",
  },
];

export default function BannerCarousel({ isLoggedIn = false }: BannerCarouselProps) {
  const router = useRouter();
  const colors = useColors();
  const isDark = useDarkMode();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-label="EduLearn highlights" className="mb-16">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="relative px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${colors.primary[900]} 0%, ${colors.primary[700]} 50%, ${colors.secondary[800]} 100%)`
              : `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[500]} 50%, ${colors.secondary[500]} 100%)`,
          }}
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
            <div className="absolute right-16 top-16 h-28 w-28 rounded-full bg-white blur-2xl" />
            <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-white blur-2xl" />
          </div>

          {/* Slider content */}
          <div className="relative z-10 grid items-center gap-10 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
            {/* Text + CTA */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                <span>EduLearn - Nền tảng học tập hiện đại</span>
              </div>

              <div className="relative h-32 md:h-28 lg:h-24 overflow-hidden">
                <div
                  className="flex h-full w-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {slides.map((slide) => (
                    <div
                      key={slide.title}
                      className="min-w-full pr-4"
                    >
                      <Typography
                        variant="h1"
                        as="h1"
                        className="mb-3 text-balance text-2xl font-bold text-white md:text-3xl lg:text-4xl"
                      >
                        {slide.title}
                      </Typography>
                      <Typography
                        variant="p"
                        className="max-w-xl text-sm text-white/90 md:text-base"
                      >
                        {slide.description}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {!isLoggedIn ? (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push("/auth?mode=login")}
                    className="text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Bắt đầu học ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => router.push("/courses")}
                    className="text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Tiếp tục khóa học của bạn
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}

                <span className="inline-flex items-center rounded-full bg-black/15 px-3 py-1 text-xs font-medium text-white/90 dark:bg-white/10">
                  {slides[activeIndex].highlight}
                </span>
              </div>
            </div>

            {/* Side illustration */}
            <div className="relative hidden md:block">
              <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-3xl bg-white/10 p-4 shadow-2xl backdrop-blur lg:h-60 lg:w-60">
                <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-white/95 p-4 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div className="text-xs">
                        <p className="font-semibold">Tiến độ hôm nay</p>
                        <p className="text-[11px] text-slate-500">
                          3 bài học đã hoàn thành
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      +45 phút
                    </span>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between text-[11px]">
                      <span className="font-medium">Lộ trình IELTS</span>
                      <span className="text-slate-500">60%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <p className="text-[10px] text-slate-500">Khóa học</p>
                      <p className="text-sm font-semibold">24</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <p className="text-[10px] text-slate-500">Bài học</p>
                      <p className="text-sm font-semibold">180+</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800">
                      <p className="text-[10px] text-slate-500">Giảng viên</p>
                      <p className="text-sm font-semibold">40+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full border border-white/60 transition-all ${
                  index === activeIndex
                    ? "w-4 bg-white"
                    : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Chuyển đến banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


