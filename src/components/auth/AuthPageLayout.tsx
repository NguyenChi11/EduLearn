import { ReactNode } from "react";
import Card from "@/components/ui/Card";

interface AuthPageLayoutProps {
  children: ReactNode;
}

// Layout riêng cho trang đăng nhập / đăng ký, không có footer
export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg">{children}</Card>
      </div>
    </div>
  );
}
