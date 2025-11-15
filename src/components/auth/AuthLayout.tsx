import { ReactNode } from "react";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="p-8 shadow-lg">
          {children}
        </Card>
        <Typography
          variant="small"
          className="text-center text-slate-600 dark:text-slate-400"
        >
          © 2025 EduLearn. All rights reserved.
        </Typography>
      </div>
    </div>
  );
}
