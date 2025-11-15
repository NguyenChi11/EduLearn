// components/home/Hero.tsx
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { useRouter } from "next/navigation";

interface HeroProps {
  isLoggedIn: boolean;
}

export default function Hero({ isLoggedIn }: HeroProps) {
  const router = useRouter();

  return (
    <div className="text-center mb-16">
      <Typography variant="h1" className="mb-4">
        Nền tảng học tập hiện đại
      </Typography>
      <Typography variant="p" className="mb-8 text-xl">
        Khám phá hàng trăm khóa học, theo dõi tiến độ học của bạn và phát triển
        kỹ năng mới
      </Typography>

      {!isLoggedIn && (
        <Button
          variant="primary"
          onClick={() => router.push("/auth?mode=login")}
          className="text-lg font-medium"
        >
          Bắt đầu học ngay
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
}
