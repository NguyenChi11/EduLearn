"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";

interface BannerCarouselProps {
  isLoggedIn?: boolean;
}

type Slide = {
  title: string;
  description: string;
  highlight: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: "Học tập không giới hạn",
    description:
      "Khám phá kho khóa học chất lượng cao, cập nhật liên tục dành cho mọi cấp độ.",
    highlight: "1000+ khóa học",
    image: "/banner_1.avif",
  },
  {
    title: "Lộ trình rõ ràng, theo sát tiến độ",
    description:
      "Theo dõi tiến trình học, đánh dấu bài đã hoàn thành và tiếp tục đúng nơi bạn dừng lại.",
    highlight: "Tiến độ trực quan",
    image: "/banner_2.webp",
  },
  {
    title: "Giảng viên là chuyên gia thực chiến",
    description:
      "Học từ những người đang làm việc trong ngành, với ví dụ và dự án thực tế.",
    highlight: "Chuyên gia hàng đầu",
    image: "/banner_3.avif",
  },
];

export default function BannerCarousel({
  isLoggedIn = false,
}: BannerCarouselProps) {
  const router = useRouter();
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
        {/* Background image slider (trượt theo activeIndex) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.title}
                className="relative h-full w-full shrink-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-slate-950/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Nội dung overlay */}
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 opacity-15">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
            <div className="absolute right-16 top-16 h-28 w-28 rounded-full bg-white blur-2xl" />
            <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-white blur-2xl" />
          </div>

          <div className="relative z-10 w-full">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span>EduLearn - Nền tảng học tập hiện đại</span>
            </div>

            {/* Text slider (trượt cùng ảnh, chiếm toàn bộ chiều cao nội dung để không bị vỡ chữ) */}
            <div className="relative overflow-hidden">
              <div
                className="flex h-full w-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.title} className="min-w-full pr-4">
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

            {/* CTA cố định, không trượt */}
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

              <span className="inline-flex items-center rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white/90">
                {slides[activeIndex].highlight}
              </span>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
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
