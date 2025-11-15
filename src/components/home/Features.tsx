// components/home/Features.tsx
import { BookOpen } from "lucide-react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Typography from "@/components/ui/Typography";
import { useColors, useDarkMode } from "@/theme/hooks";

const features = [
  {
    icon: BookOpen,
    title: "Khóa học đa dạng",
    desc: "Hàng trăm khóa học chất lượng cao",
  },
  {
    icon: BookOpen,
    title: "Theo dõi tiến độ",
    desc: "Xem thống kê học tập chi tiết",
  },
  {
    icon: BookOpen,
    title: "Chứng chỉ hoàn thành",
    desc: "Nhận chứng chỉ khi hoàn thành",
  },
];

export default function Features() {
  const colors = useColors();
  const isDark = useDarkMode();
  const iconColor = isDark ? colors.primary[400] : colors.primary[600];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <Card
          key={i}
          className="p-6 hover:shadow-md dark:hover:shadow-xl transition-shadow"
        >
          <Typography variant="h3" className="mb-2 flex items-center gap-2">
            <Icon
              icon={f.icon}
              size="md"
              className=""
              style={{ color: iconColor }}
            />
            {f.title}
          </Typography>
          <Typography variant="p">{f.desc}</Typography>
        </Card>
      ))}
    </div>
  );
}
