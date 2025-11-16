// components/home/Banner.tsx
"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { useColors, useDarkMode } from "@/theme/hooks";

interface BannerProps {
  isLoggedIn?: boolean;
}

export default function Banner({ isLoggedIn = false }: BannerProps) {
  const router = useRouter();
  const colors = useColors();
  const isDark = useDarkMode();

  return (
    <div className="relative overflow-hidden rounded-2xl mb-16">
      {/* Gradient Background */}
      <div
        className="relative px-8 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24"
        style={{
          background: isDark
            ? `linear-gradient(135deg, ${colors.primary[900]} 0%, ${colors.primary[700]} 50%, ${colors.secondary[800]} 100%)`
            : `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[500]} 50%, ${colors.secondary[500]} 100%)`,
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white blur-3xl" />
          <div className="absolute top-32 right-32 w-24 h-24 rounded-full bg-white blur-2xl" />
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="p-4 rounded-full"
              style={{
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.2)",
              }}
            >
              <GraduationCap
                className="w-12 h-12 md:w-16 md:h-16 text-white"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Title */}
          <Typography
            variant="h1"
            className="mb-6 text-white drop-shadow-lg"
            as="h2"
          >
            Học tập không giới hạn
          </Typography>

          {/* Description */}
          <Typography
            variant="p"
            className="mb-8 text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md"
          >
            Tham gia cùng hàng nghìn học viên đang phát triển kỹ năng mới mỗi
            ngày. Khám phá các khóa học chất lượng cao được giảng dạy bởi các
            chuyên gia hàng đầu.
          </Typography>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                1000+
              </div>
              <div className="text-sm md:text-base text-white/80">
                Khóa học
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                50K+
              </div>
              <div className="text-sm md:text-base text-white/80">
                Học viên
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                98%
              </div>
              <div className="text-sm md:text-base text-white/80">
                Hài lòng
              </div>
            </div>
          </div>

          {/* CTA Button */}
          {!isLoggedIn && (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/auth?mode=login")}
              className="text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Bắt đầu hành trình học tập
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}

          {isLoggedIn && (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/courses")}
              className="text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Khám phá khóa học
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

